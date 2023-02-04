import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import s from './Registration.module.css'
import {PATH} from '../../common/constants/path';
import {NavLink} from 'react-router-dom';


type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}


export const Registration = () => {
  // const dispatch = useAppDispatch()
  // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length <= 3) {
        errors.password = 'Password must be more than 3 characters'
      }
      return errors
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
      // dispatch(loginTC(values))
      // formik.resetForm();
    },
  })

  // if (isLoggedIn) {
  //   return <Navigate to={'/'}/>
  // }

  return <Grid container justifyContent={'center'}>
    <div className={s.registrationBlock}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={s.muiFormControl}>
            <FormLabel>
              <h2>Sing Up</h2>
            </FormLabel>
            <FormGroup className={s.textFieldBlock}>
              <TextField variant="standard"
                         label="Email"
                         margin="normal"
                         {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ?
                <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
              <TextField variant="standard"
                         type="password"
                         label="Password"
                         margin="normal"
                         {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ?
                <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

              <TextField variant="standard"
                         type="confirmPassword"
                         label="Confirm password"
                         margin="normal"
                         {...formik.getFieldProps('confirmPassword')}
              />
              {formik.touched.password && formik.errors.password ?
                <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

              <Button className={s.button} type={'submit'} variant={'contained'} color={'primary'}>
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
