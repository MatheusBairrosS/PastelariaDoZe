import React, { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Grid, Paper, TextField, Typography
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import {
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  verificarCpfExistente
} from '../services/clienteService';

const IMaskInputWrapper = React.forwardRef(function IMaskInputWrapper(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const ClienteForm = () => {
  const { id, opr } = useParams();
  const navigate = useNavigate();
  const isReadOnly = opr === 'view';
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [cpfDuplicadoInfo, setCpfDuplicadoInfo] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const title = opr === 'view'
    ? `Visualizar Cliente: ${id}`
    : opr === 'edit'
      ? `Editar Cliente: ${id}`
      : 'Cadastro de Cliente';

  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        try {
          const cliente = await getClienteById(id);
          reset({
            ...cliente,
            cpf: cliente.cpf || "",
            telefone: cliente.telefone || ""
          });
        } catch (error) {
          toast.error('Erro ao carregar cliente');
        }
      };
      fetchCliente();
    } else {
      reset({ nome: '', cpf: '', telefone: '' });
    }
  }, [id, reset]);

  const verificarDuplicidadeCpf = async (cpfDigitado) => {
    try {
      const resultadoArray = await verificarCpfExistente(cpfDigitado);
      const resultado = resultadoArray?.[0];

      if (resultado?.id_cliente && resultado.id_cliente.toString() !== id?.toString()) {
        setCpfDuplicadoInfo(resultado);
        toast.warning('Este CPF já está cadastrado para outro cliente.', { position: 'top-center', autoClose: 5000 });
      } else {
        setCpfDuplicadoInfo(null);
      }
    } catch (error) {
      console.error('Erro ao verificar CPF:', error);
      toast.error('Erro ao verificar CPF. Tente novamente.', { position: 'top-center' });
    }
  };

  const onSubmit = async (data) => {
    if (cpfDuplicadoInfo) {
      toast.error('CPF duplicado. Corrija ou escolha uma opção no modal.', { position: 'top-center' });
      return;
    }

    try {
      const cpfSemMascara = data.cpf.replace(/\D/g, '');
      const telefoneSemMascara = data.telefone?.replace(/\D/g, '');

      const dadosTratados = {
        ...data,
        cpf: cpfSemMascara,
        telefone: telefoneSemMascara,
      };

      let retorno;
      if (id) {
        retorno = await updateCliente(id, dadosTratados);
      } else {
        retorno = await createCliente(dadosTratados);
      }

      if (!retorno || !retorno.id) {
        throw new Error(retorno?.erro || "Erro ao salvar cliente.");
      }

      toast.success(`Cliente salvo com sucesso. ID: ${retorno.id}`, { position: "top-center" });
      navigate('/clientes');
    } catch (error) {
      toast.error(`Erro ao salvar cliente: \n${error.message}`, { position: "top-center" });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCliente(id);
      toast.success('Cliente excluído com sucesso!');
      navigate('/clientes');
    } catch (err) {
      toast.error('Erro ao excluir cliente');
    } finally {
      setOpenConfirmDelete(false);
    }
  };

  const handleCancelar = () => setCpfDuplicadoInfo(null);
  const handleVisualizar = () => {
    if (cpfDuplicadoInfo?.id_cliente) {
      navigate(`/clientes/view/${cpfDuplicadoInfo.id_cliente}`);
    }
    setCpfDuplicadoInfo(null);
  };
  const handleEditar = () => {
    if (cpfDuplicadoInfo?.id_cliente) {
      navigate(`/clientes/edit/${cpfDuplicadoInfo.id_cliente}`);
    }
    setCpfDuplicadoInfo(null);
  };

  return (
    <Box sx={{
      minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E3F2FD', p: 2,
    }}>
      <Paper elevation={6} sx={{ p: 4, maxWidth: 480, width: '100%', borderRadius: 3, backgroundColor: '#f0f4f8', boxSizing: 'border-box' }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary" align="center" gutterBottom>
          {title}
        </Typography>

        {isReadOnly && (
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Todos os campos estão em modo somente leitura.
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="nome"
                control={control}
                defaultValue=""
                rules={{ required: "Nome é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome"
                    fullWidth
                    disabled={isReadOnly}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                    size="medium"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="cpf"
                control={control}
                defaultValue=""
                rules={{ required: "CPF é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="CPF"
                    fullWidth
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                    size="medium"
                    onBlur={async (e) => {
                      field.onBlur();
                      if (!isReadOnly && e.target.value) {
                        const cpfSemMascara = e.target.value.replace(/\D/g, '');
                        await verificarDuplicidadeCpf(cpfSemMascara);
                      }
                    }}
                    InputProps={{
                      inputComponent: IMaskInputWrapper,
                      inputProps: {
                        mask: "000.000.000-00",
                        definitions: { "0": /\d/ },
                        unmask: true,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="telefone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Telefone"
                    fullWidth
                    disabled={isReadOnly}
                    error={!!errors.telefone}
                    helperText={errors.telefone?.message}
                    size="medium"
                    InputProps={{
                      inputComponent: IMaskInputWrapper,
                      inputProps: {
                        mask: "(00) 00000-0000",
                        definitions: { "0": /\d/ },
                        unmask: true,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between" gap={2}>
              <Button onClick={() => navigate('/clientes')} variant="outlined" color="primary">
                Voltar
              </Button>

              {!isReadOnly && (
                <Button type="submit" variant="contained" color="primary">
                  Salvar
                </Button>
              )}

              {id && !isReadOnly && (
                <Button variant="outlined" color="error" onClick={() => setOpenConfirmDelete(true)}>
                  Excluir
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Modal de exclusão */}
      <Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza que deseja excluir este cliente?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)} color="primary">Cancelar</Button>
          <Button onClick={handleDelete} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de CPF duplicado */}
      <Dialog open={!!cpfDuplicadoInfo} onClose={handleCancelar}>
        <DialogTitle>CPF Duplicado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            O CPF informado já está cadastrado para outro cliente.
            {cpfDuplicadoInfo?.nome && (
              <>
                <br /><strong>Nome:</strong> {cpfDuplicadoInfo.nome}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelar} color="primary">Cancelar</Button>
          <Button onClick={handleVisualizar} color="info">Visualizar</Button>
          <Button onClick={handleEditar} color="secondary">Editar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClienteForm;
