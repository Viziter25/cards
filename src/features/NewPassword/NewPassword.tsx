import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createPasswordTC} from '../Login/auth-reducer';
import {Navigate, useParams} from 'react-router-dom';
import s from './newPassword.module.scss'
import Button from '@mui/material/Button';
import {PasswordInput} from '../../common/components/password-input/PasswordInput';


export const NewPassword = () => {

  const dispatch = useAppDispatch()
  const isCreatePassword = useAppSelector(state => state.auth.isCreatePassword)
  const {token} = useParams()
  console.log(token)

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().min(7, 'Password must be more than 7 characters').required('Required')
    }),
    onSubmit: (values) => {
      dispatch(createPasswordTC({password: values.password, resetPasswordToken: token}))
    }
  })

  if (isCreatePassword) {
    return <Navigate to={'/login'}/>
  }

  return (
    <div className={s.loginContainer}>
      <div className={s.loginContent}>
        <h3 className={s.title}>
          Create new password
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.form}>
            <PasswordInput name={'Password'} dataFormik={{...formik.getFieldProps('password')}}/>
            {formik.touched.password && formik.errors.password &&
                <div className={s.error}>{formik.errors.password}</div>}
            <div className={s.footer}>
              <span>Create new password and we will send you further instructions to email</span>
            </div>
            <Button className={s.button} type='submit' variant={"contained"}>Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
};