import React from 'react';
import s from "./checkEmail.module.scss";
import emailImage from '../../common/image/EmailImage.svg'
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../common/constants/path";


export const CheckEmail = () => {

  const navigate = useNavigate()

  const onClickHandler = () => {

    navigate(PATH.LOGIN)
  }

  return (
    <div className={s.checkEmailContainer}>
      <div className={s.checkEmailContent}>
        <h3 className={s.title}>
          Check Email
        </h3>
        <div className={s.image}>
          <img src={emailImage}/>
        </div>
        <span className={s.desc}>Enter your email address and we will send you further instructions</span>
        <Button className={s.button} variant={"contained"} onClick={onClickHandler}>Back to login</Button>
      </div>
    </div>
  );
};

