import React from 'react';
import s from './passwordRecovery.module.scss'
import { Button, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../../common/constants/path";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ForgotPasswordType } from "../authAPI";
import { useAppDispatch } from "../../../app/store";
import { recPasswordTC } from "../auth-reducer";

export const PasswordRecovery = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required')
    })
    ,
    onSubmit: (values) => {
      const forgotDate: ForgotPasswordType = {
        email: values.email,
        from: "test-front-admin stemmy287@gmail.com",
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/new_password/$token$'>
link</a>
</div>`
      }
      dispatch(recPasswordTC({ data: forgotDate }))
        .then(res => {
          if (res) {
            navigate(PATH.CHECK_EMAIL)
          }
        })
    }
  })

  return (
    <div className={s.passRecContainer}>
      <div className={s.passRecContent}>
        <h3 className={s.title}>
          Forgot your password?
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.form}>
            <TextField
              className={s.input}
              variant={"standard"}
              label={'Email'}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && <div className={s.error}>{formik.errors.email}</div>}
            <div className={s.desc}>Enter your email address and we will send you further instructions</div>
            <Button className={s.button} variant={"contained"} type={'submit'}>Send Instructions</Button>
            <div className={s.footer}>
              <span>Did you remember your password?</span>
              <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};