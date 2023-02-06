import React from 'react';
import s from './login.module.scss'
import {Button, Checkbox, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";


export const Login = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(2, 'Min length 2 symbols').required('Required')
    })
    ,
    onSubmit: (values) => {
      dispatch(loginTC(values))
    }
  })

  if (isLoggedIn) {
    return <Navigate to={'/'}/>
  }

  return (
    <div className={s.loginContainer}>
      <div className={s.loginContent}>
        <h3 className={s.title}>
          Sign in
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.form}>
            <TextField
              className={s.input}
              variant={"standard"}
              InputLabelProps={{
                shrink: true,
              }}
              label={'Email'}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && <div className={s.error}>{formik.errors.email}</div>}
            <TextField
              className={s.input}
              variant={"standard"}
              type={'password'}
              InputLabelProps={{
                shrink: true,
              }}
              label={'password'}
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password &&
                <div className={s.error}>{formik.errors.password}</div>}
            <div className={s.checkBoxCont}>
              <Checkbox
                className={s.checkBox}
                {...formik.getFieldProps('rememberMe')}
                checked={formik.values.rememberMe}
              />
              <span>Remember me</span>
            </div>
            <span className={s.fPass}>Forgot Password?</span>
            <Button className={s.button} type='submit' variant={"contained"}>Sign in</Button>
          </div>
        </form>
        <div className={s.footer}>
          <span>Already have an account?</span>
          <a href="">Sign Up</a>
        </div>
      </div>
    </div>
  );
};
