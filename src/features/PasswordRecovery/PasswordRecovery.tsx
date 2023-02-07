import React, {ChangeEvent, useState} from 'react';
import s from './passwordRecovery.module.scss'
import {Button, TextField} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../common/constants/path";
import {useFormik} from "formik";
import * as Yup from "yup";
import {CheckEmail} from "../CheckEmail/CheckEmail";
import {authAPI} from "../../api/authAPI";

export const PasswordRecovery = () => {

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required')
    })
    ,
    onSubmit: (values) => {
      console.log(values)
    }
  })
  const navigate = useNavigate()

  const onClickHandler = () => {
    authAPI.forgotPassword({
      email: formik.values.email,
      from: 'Eugene Lipatenko steem287@gmail.com',
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/cards#/login/$token$'>
link</a>
</div>`
    })
      .then(res => {
        navigate(PATH.CHECK_EMAIL)
      })
  }

  return (
    <div className={s.passRecContainer}>
      <div className={s.passRecContent}>
        <h3 className={s.title}>
          Forgot your password?
        </h3>
        <div className={s.form}>
          <TextField
            className={s.input}
            variant={"standard"}
            label={'Email'}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && <div className={s.error}>{formik.errors.email}</div>}
          <div className={s.desc}>Enter your email address and we will send you further instructions</div>
          <Button className={s.button} variant={"contained"} onClick={onClickHandler}>Send Instructions</Button>
          <div className={s.footer}>
            <span>Did you remember your password?</span>
            <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};