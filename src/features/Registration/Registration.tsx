import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import s from './Registration.module.css'
import {PATH} from '../../common/constants/path';
import {Navigate, NavLink} from 'react-router-dom';
import {registerTC} from './registration-reducer';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {PasswordInput} from '../../common/components/password-input/PasswordInput';
import * as Yup from 'yup';



export const Registration = () => {
  const dispatch = useAppDispatch()
  const isRegistrationIn = useAppSelector<boolean>(state => state.register.isRegistrationIn)
  const error = useAppSelector<string>(state => state.register.error)


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(7, 'Password must be more than 7 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password and confirm password do not match')
    }),

    onSubmit: values => {
      // alert(JSON.stringify(values));
      dispatch(registerTC(values))
      formik.resetForm();
    },
  })

  if (isRegistrationIn) {
    return <Navigate to={'/login'}/>
  }

  return <Grid container justifyContent={'center'}>
    <div className={s.registrationBlock}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={s.muiFormControl}>
              <h2>Sing Up</h2>
            {error ? <h2>{error}</h2>: ''}
            <FormGroup className={s.textFieldBlock}>
              <TextField variant="standard"
                         label="Email"
                         margin="normal"
                         {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ?
                <div style={{color: 'red', textAlign: 'start'}}>{formik.errors.email}</div> : null}

              <PasswordInput name={'Password'} dataFormik={{...formik.getFieldProps('password')}}/>
              {formik.touched.password && formik.errors.password ?
                <div style={{color: 'red', textAlign: 'start'}}>{formik.errors.password}</div> : null}


              <PasswordInput name={'Confirm password'} dataFormik={{...formik.getFieldProps('confirmPassword')}}/>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                <div style={{color: 'red', textAlign: 'start'}}>{formik.errors.confirmPassword}</div> : null}

              <Button sx={{ marginTop: '60px', borderRadius: '30px'}} type={'submit'} variant={'contained'} color={'primary'}>
                Sing Up
              </Button>

            </FormGroup>
            <div className={s.backLoginBlock}>
              <p className={s.text}>Already have an account?</p>
              <NavLink className={s.backLink} to={PATH.LOGIN}>Sing in</NavLink>
            </div>
          </FormControl>
        </form>
      </Grid>
    </div>
  </Grid>

}