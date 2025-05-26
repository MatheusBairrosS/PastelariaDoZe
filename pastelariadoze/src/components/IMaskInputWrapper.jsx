import React from 'react';
import { IMaskInput } from 'react-imask';

const IMaskInputWrapper = React.forwardRef(function IMaskInputWrapper(props, ref) {
  const { mask, definitions, unmask, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={definitions}
      unmask={unmask}
      inputRef={ref}
    />
  );
});

export default IMaskInputWrapper;
