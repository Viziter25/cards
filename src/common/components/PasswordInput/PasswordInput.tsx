import React, {FC} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import {FieldInputProps} from 'formik/dist/types';



type PasswordInputProps = {
  name: string
  dataFormik: FieldInputProps<string>
}
export const PasswordInput: FC<PasswordInputProps> = ({name,dataFormik}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (

    <FormControl sx={{ marginY: '16px'}}  variant="standard">
      <InputLabel htmlFor="standard-adornment-password">{name}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton sx={{color: 'black'}}
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
          </InputAdornment>
        }
        {...dataFormik}
      />
    </FormControl>
  );
};
