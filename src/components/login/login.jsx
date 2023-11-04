
import image_login from '../../assets/image_login.avif';
import ForgetPassword from './ForgetPassword';
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
function Login() {
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
      return;
    }

  }, [localStorage.getItem('user')]);

  const navigate = useNavigate();

  const [id_subject, setid_subject] = useState('')
  // vars we need
  const levels = [
    {
      id: '0',
      name: '1er anneé',
    },
    {
      id: '1',
      name: '2eme anneé',
    },
    {
      id: '2',
      name: '3eme anneé',
    },
  ]
  const subjects = [
    [
      {
        id: '0',
        name: 'Licence en économie',
      },
      {
        id: '1',
        name: 'Licence en gestion',
      },
      {
        id: '2',
        name: 'Licence en droit',
      },
      {
        id: '3',
        name: 'Licence en informatique appliquée en gestion',
      }

    ],
    [{
      id: '0',
      name: 'Licence en économie (tronc commun)',
    },
    {
      id: '1',
      name: 'Licence en gestion (tronc commun)',
    },
    {
      id: '2',
      name: 'Licence en comptabilité',
    },
    {
      id: '3',
      name: 'Licence en droit (tronc commun)',
    },
    {
      id: '4',
      name: 'Licence en informatique de gestion (business computing)',
    }
    ]
    ,
    [
      {
        id: '0',
        name: 'Monnaie, Finance, Banque, Assurance',
      },
      {
        id: '1',
        name: 'Commerce et finance internationale',
      },
      {
        id: '2',
        name: 'Analyse et politique économique',
      },
      {
        id: '3',
        name: 'Business economics',
      },
      {
        id: '4',
        name: 'Marketing',
      },
      {
        id: '5',
        name: 'Finance',
      },
      {
        id: '6',
        name: 'Comptabilité',
      },
      {
        id: '7',
        name: 'Droit public',
      },
      {
        id: '8',
        name: 'Droit privé',
      },
      {
        id: '9',
        name: 'Business intelligence',
      },
      {
        id: '10',
        name: 'E-Business',
      },
      {
        id: '11',
        name: 'Business electronic system',
      }

    ]
  ]
  const [subjectsToRender, setsubjectsToRender] = useState(subjects[0].map(item => {
    return (
      <option key={item.id} value={item.id}>{item.name}</option>
    )
  }))
  function handleLevelChange(e) {
    setlevel_student(levels[e.target.value].name)
    setsubjectsToRender(subjects[e.target.value].map(item => {
      return (
        <option key={item.id} value={item.name}>{item.name}</option>
      )
    }))
  }
  const myRefname = useRef(null);
  const [current_user, setcurrent_user] = useState();
  const [type_user, settype_user] = useState("");
  const [login_user, setLoginUser] = useState("");
  const [level_student, setlevel_student] = useState("1er anneé");
  const [speciality_student, setspeciality_student] = useState("Licence en économie");
  const [mail_student, setmail_student] = useState("");
  const [login_password, setPassUser] = useState("");
  const [login_password2, setPassUser2] = useState("");
  const [pass2msg, setPass2msg] = useState("");
  const [error_msg, seterror_msg] = useState("");
  const [variant, setvariant] = useState("success");
  const [error_msgClassName, seterror_msgClassName] = useState("alert_opacity0");
  const [showForgetPassword, setShowForgetPassword] = useState("false");
  //try to creat account


  const createAccount = (event) => {
    event.preventDefault()
    if ((type_user != "") && (login_user != "") && (level_student != "") && (speciality_student != "")
      && (login_password != "")) {
      axios.post(Environment.api_url + 'students.php', {
        action: 'inscrit',
        login_user: login_user,
        type_user: type_user,
        speciality_student: speciality_student,
        login_password: login_password,
        level_student: level_student,
        mail_student: mail_student
      }).then((res) => {
        //console.log(res)
        //console.log(res.data)
        if ((res.data == "successEmail has sent successfully.") || (res.data == "success")) {
          setvariant('success')
          seterror_msg('Votre compte a etait créer, merci de verifier votre email');
          seterror_msgClassName("alert_opacity0 opacity100")
        }
        else if (res.data.Msg == "mail already used") {
          setvariant('danger')
          seterror_msg('Cette adresse e-mail est déjà utilisée');
          seterror_msgClassName("alert_opacity0 opacity100")
          setTimeout(function () {
            seterror_msgClassName("alert_opacity0")
          }, 3000)
        } else {
          setvariant('danger')
          seterror_msg('try again');
          seterror_msgClassName("alert_opacity0 opacity100")
          setTimeout(function () {
            seterror_msgClassName("alert_opacity0")
          }, 3000)
        }
      })
    } else {
      alert("remplir tous les champs SVP!")
    }
  }

  // try to login 
  const loginAccount = (event) => {
    event.preventDefault();
    var items = [];
    axios.post(Environment.api_url + 'students.php?action=get', {
      action: 'get',
      login_user: login_user,
      mail_student: mail_student,
      login_password: login_password,
    }).then((res) => {
      console.log(res.data.success)
      if (res.data.success == '1') {
        console.log('current_user from login', res.data.user[0].user)
        if (res.data.user[0].user.active_student == '0') {

          seterror_msg("votre E-mail n'est pas verifier")
        } else {
          localStorage.setItem('user', JSON.stringify(res.data.user[0].user));
          setTimeout(() => {
            navigate('/dashboard');
          }, 500)
        }
      } else {
        seterror_msg('Verifier Votre E-mail ou Mot De passe')
      }
    })
  }
  const [isActive, setIsActive] = useState("container");

  const handleClick = event => {
    setIsActive(isActive + " sign-up-mode");
  };
  const handleClick1 = event => {
    setIsActive("container");
  };


  return (
    <div className='login_container'>
      < ForgetPassword showForgetPassword={showForgetPassword} />
      <div className={isActive + " custom_login_container"}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={loginAccount} className="sign-in-form">
              <img src={main_logo} className="main_logo_maktaba" />
              <div className='alert_login_form'>{error_msg}</div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Adresse E-mail" onChange={(e) => {
                  e.preventDefault();
                  console.log('e.target.value', e.target.value)
                  setLoginUser(e.target.value)
                }} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Mot De Passe" onChange={(e) => {
                  e.preventDefault();
                  console.log('e.target.value', e.target.value)
                  setPassUser(e.target.value)
                }} />
              </div>
              <button className="btn solid custom" >Connexion</button>
              <a onClick={(e) => {
                e.preventDefault();
                setShowForgetPassword(true)
              }}>Mot De Passe Oublié ?</a>
            </form>
            <form onSubmit={createAccount} className="sign-up-form">
              <h2 className="title">Créer Votre Compte</h2>
              <Alert className={error_msgClassName} variant={variant} style={{ width: "100%" }}>
                <Alert.Heading>
                  {error_msg}
                </Alert.Heading>
              </Alert>
              <p>Choisissez Votre Identité</p>
              <div>
                <input type="radio" id="contactChoice1"
                  name="contact" value="email" onClick={() => {
                    settype_user('Etudiant')
                  }} />
                <label >Etudiant</label>
                <input type="radio" id="contactChoice2"
                  name="contact" value="telephone" onClick={() => {
                    settype_user('Enseignant')
                  }} />
                <label >Enseignant</label>
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Nom D'utilisateur" onChange={(e) => {
                  e.preventDefault();
                  console.log('e.target.value', e.target.value)
                  setLoginUser(e.target.value)
                }} />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="E-mail" onChange={(e) => {
                  e.preventDefault();
                  console.log('e.target.value', e.target.value)
                  setmail_student(e.target.value)
                }} />
              </div>

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Mot De Passe" onChange={(e) => {
                  e.preventDefault();
                  setPassUser(e.target.value)
                  if (login_password2 != e.target.value) {
                    setPass2msg('mot de passe et la confirmation ne sont pas egaux')
                  } else {
                    setPass2msg('')
                  }
                }} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Confirmer Mot De Passe" onChange={(e) => {
                  e.preventDefault();
                  setPassUser2(e.target.value)
                  if (login_password != e.target.value) {
                    setPass2msg('mot de passe et la confirmation ne sont pas egaux')
                  } else {
                    setPass2msg('')
                  }
                }} />
              </div>

              <span className='pass2msg'>{pass2msg}</span>
              <h5>Choisir Votre Années Universitaire</h5>

              <div className="input-field">
                <i className="fas fa-bars"></i>
                <select onChange={(e) => { handleLevelChange(e) }}>
                  {
                    levels.map(item => {
                      return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      )
                    })
                  }
                </select>
              </div>
              <h5>Choisir Votre Spécialité</h5>
              <div className="input-field">
                <i className="fas fa-bars"></i>
                <select onChange={(e) => {
                  console.log(e.target.value)
                  setspeciality_student(e.target.value)
                }}>
                  {subjectsToRender}
                </select>
              </div>

              <input type="submit" className="btn solid custom" value="Créer" />
              <input style={{ display: 'none' }} type="reset" ref={myRefname} className="btn solid custom" value="reset" />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Vous n'avez pas encore de compte?</h3>
              <p>
                Cette initiative est mise en œuvre par l'association Youtheon en collaboration avec World Learning et soutenue par la Middle East Partnership Initiative (MEPI) dans le cadre du fonds LDF Impact
              </p>
              <button className="btn transparent" id="sign-up-btn" onClick={handleClick}>
                S'inscrire
              </button>
            </div>
            <img src={logsvg} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Connectez-Vous à votre compte</h3>
              <p>
                <img src={logo1} className="logo1.png" />
                <img src={logo2} className="logo2.png" />
                <img src={logo3} className="logo3.png" />
              </p>
              <button className="btn transparent" id="sign-in-btn" onClick={handleClick1}>
                Connexion
              </button>
            </div>
            <img src={register} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
