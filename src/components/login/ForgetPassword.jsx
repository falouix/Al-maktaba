
import image_login from '../../assets/image_login.avif';

import { useNavigate } from "react-router-dom";
import main_logo from '../../assets/maktabalogo.png'
import logo1 from '../../assets/logo1.png'
import logo2 from '../../assets/logo2.png'
import logo3 from '../../assets/logo3.png'
import Alert from "react-bootstrap/Alert";
import react, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './login.css';
import logsvg from '../../assets/login_assets/log.svg';
import register from '../../assets/login_assets/register.svg';
import Environment from '../../environment';
function ForgetPassword(showForgetPassword) {
    const [mailValue, setMailValue] = useState('')
    const [alertMsg, setAlertMsg] = useState(false)
    const [alertMsg1, setAlertMsg1] = useState(false)
    const [btnValue, setBtnValue] = useState('check')
    const [codeValue, setCodeValue] = useState('')
    const [codeShow, setCodesShow] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/dashboard');
            return;
        }

    }, [localStorage.getItem('user')]);

    const navigate = useNavigate();

    const [id_subject, setid_subject] = useState('')
    // vars we need

    const myRefname = useRef(null);
    //try to creat account


    const forgetPassword = () => {
        axios.post(`${Environment.api_url}students.php`, {
            action: 'forgetPassword',
            mail: mailValue
        })
            .then(function (res) {
                console.log(res.data.success);
                if (res.data.success == "1") {
                    setAlertMsg(true)
                    setCodesShow(true)
                    setAlertMsg1(false)
                    setBtnValue('changer mot de passe')
                } else {
                    setAlertMsg1(true)
                    setAlertMsg(false)
                }
            }).catch(function (error) {
                console.log(error);
            });
    }


    return (
        <div className={showForgetPassword ? 'ForgetPassword_container' : 'ForgetPassword_container showForgetPassword'}>
            <div className='ForgetPassword_form_container'>
                <p className={!alertMsg ? 'ForgetPasswordP' : 'ForgetPasswordP show'}>
                    nous vous avons envoyé un e-mail, veuillez le vérifier
                </p>
                <p className={!alertMsg1 ? 'ForgetPasswordP1' : 'ForgetPasswordP1 show'}>
                    cette adresse mail n'est pas valide
                </p>
                <input
                    value={mailValue}
                    onChange={(e) => {
                        setMailValue(e.target.value)
                    }}
                    placeholder='Entrez vore mail'
                />
                <input
                    className={!codeShow ? 'codeShow' : 'codeShow show'}
                    value={codeValue}
                    onChange={(e) => {
                        setCodeValue(e.target.value)
                    }}
                    placeholder='Entrez le code ici!'
                />
                <button
                    onClick={forgetPassword}
                    className='thm-btn'>
                    <span>
                        {btnValue}
                    </span>
                </button>
            </div>
        </div>
    );
}

export default ForgetPassword;
