import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Box, Typography, Paper, IconButton,
  InputAdornment, FormControl, InputLabel, Select, MenuItem, Grid,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import IMaskInputWrapper from '../components/IMaskInputWrapper';
import {
  createFuncionario,
  updateFuncionario,
  getFuncionarioById,
  verificarCpfExistente
} from '../services/funcionarioService';

const FuncionarioForm = () => {
  const { id, opr } = useParams();
  const navigate = useNavigate();
  const isReadOnly = opr === 'view';
  const [showPassword, setShowPassword] = useState(false);
  const [alterarSenha, setAlterarSenha] = useState(false);

  const [cpfDuplicadoInfo, setCpfDuplicadoInfo] = useState(null);

  const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  let title = "Cadastro de Funcionário";
  if (opr === 'view') title = `Visualizar Funcionário: ${id}`;
  else if (id) title = `Editar Funcionário: ${id}`;

  useEffect(() => {
    if (id) {
      const fetchFuncionario = async () => {
        const data = await getFuncionarioById(id);
        reset(data);
        setAlterarSenha(false);
      };
      fetchFuncionario();
    }
  }, [id, reset]);

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

      if (id && !alterarSenha) {
        delete dadosTratados.senha;
      }

      let retorno;
      if (id) {
        retorno = await updateFuncionario(id, dadosTratados);
      } else {
        retorno = await createFuncionario(dadosTratados);
      }

      if (!retorno || !retorno.id) {
        throw new Error(retorno.erro || "Erro ao salvar funcionário.");
      }

      toast.success(`Funcionário salvo com sucesso. ID: ${retorno.id}`, { position: "top-center" });
      navigate('/funcionarios');
    } catch (error) {
      toast.error(`Erro ao salvar funcionário: \n${error.message}`, { position: "top-center" });
    }
  };

  const verificarDuplicidadeCpf = async (cpfDigitado) => {
    try {
      const resultadoArray = await verificarCpfExistente(cpfDigitado);
      const resultado = resultadoArray?.[0];

      if (resultado?.id_funcionario && resultado.id_funcionario.toString() !== id?.toString()) {
        toast.warning('Este CPF já está cadastrado para outro funcionário.', {
          position: 'top-center',
          autoClose: 5000
        });
        setCpfDuplicadoInfo(resultado);
        setValue('cpf', '');
      } else {
        setCpfDuplicadoInfo(null);
      }
    } catch (error) {
      console.error('Erro ao verificar CPF:', error);
      toast.error('Erro ao verificar CPF. Tente novamente.', { position: 'top-center' });
    }
  };

  const handleCancelar = () => setCpfDuplicadoInfo(null);
  const handleVisualizar = () => {
    if (cpfDuplicadoInfo?.id_funcionario) {
      navigate(`/funcionarios/view/${cpfDuplicadoInfo.id_funcionario}`);
    }
    setCpfDuplicadoInfo(null);
  };
  const handleEditar = () => {
    if (cpfDuplicadoInfo?.id_funcionario) {
      navigate(`/funcionarios/edit/${cpfDuplicadoInfo.id_funcionario}`);
    }
    setCpfDuplicadoInfo(null);
  };

  return (
    <Box
      sx={{
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 480,
          width: '100%',
          borderRadius: 3,
          backgroundColor: '#f0f4f8',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          color="primary"
          align="center"
          gutterBottom
          sx={{ mb: 3 }}
        >
          {title}
        </Typography>

        {isReadOnly && (
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Todos os campos estão em modo somente leitura.
          </Typography>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="matricula"
                control={control}
                defaultValue=""
                rules={{ required: "Matrícula é obrigatória" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Matrícula"
                    fullWidth
                    error={!!errors.matricula}
                    helperText={errors.matricula?.message}
                    size="medium"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="nome"
                control={control}
                defaultValue=""
                rules={{ required: "Nome é obrigatório" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={isReadOnly}
                    label="Nome"
                    fullWidth
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
                    disabled={isReadOnly}
                    label="Telefone"
                    fullWidth
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

            <Grid item xs={12}>
              <Controller
                name="grupo"
                control={control}
                defaultValue=""
                rules={{ required: "Grupo é obrigatório" }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.grupo}>
                    <InputLabel id="grupo-label">Grupo</InputLabel>
                    <Select
                      {...field}
                      disabled={isReadOnly}
                      labelId="grupo-label"
                      label="Grupo"
                    >
                      <MenuItem value="1">Admin</MenuItem>
                      <MenuItem value="2">Atendimento Balcão</MenuItem>
                      <MenuItem value="3">Atendimento Caixa</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            {id && !isReadOnly && (
              <Grid item xs={12}>
                <FormControl>
                  <label>
                    <input
                      type="checkbox"
                      checked={alterarSenha}
                      onChange={(e) => setAlterarSenha(e.target.checked)}
                    />
                    &nbsp; Alterar senha
                  </label>
                </FormControl>
              </Grid>
            )}

            {(!id || alterarSenha) && (
              <Grid item xs={12}>
                <Controller
                  name="senha"
                  control={control}
                  defaultValue=""
                  rules={
                    !isReadOnly && alterarSenha
                      ? {
                          required: "Senha obrigatória",
                          minLength: { value: 6, message: "Pelo menos 6 caracteres" },
                        }
                      : {}
                  }
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={isReadOnly}
                      label="Senha"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      error={!!errors.senha}
                      helperText={errors.senha?.message}
                      size="medium"
                      InputProps={{
                        endAdornment: !isReadOnly && (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={() => navigate('/funcionarios')} variant="outlined" color="primary">
                Cancelar
              </Button>
              {!isReadOnly && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!!cpfDuplicadoInfo}
                  sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                >
                  {id ? "Atualizar" : "Cadastrar"}
                </Button>
              )}
            </Grid>
          </Grid>
        </form>

        <Dialog
          open={!!cpfDuplicadoInfo}
          onClose={handleCancelar}
          aria-labelledby="cpf-duplicado-dialog-title"
          disableEscapeKeyDown
          disableBackdropClick
        >
          <DialogTitle id="cpf-duplicado-dialog-title">CPF Já Cadastrado</DialogTitle>
          <DialogContent>
            <DialogContentText>
              O CPF informado já está cadastrado para o funcionário abaixo:
            </DialogContentText>
            <Box sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>
              Matrícula: {cpfDuplicadoInfo?.matricula || 'N/D'}<br />
              Nome: {cpfDuplicadoInfo?.nome || 'N/D'}
            </Box>
            <DialogContentText>
              Por favor, escolha uma das opções para continuar:
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelar} color="primary">Cancelar</Button>
            <Button onClick={handleVisualizar} color="info" variant="outlined">Visualizar</Button>
            <Button onClick={handleEditar} color="primary" variant="contained">Editar</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default FuncionarioForm;