
import image_login from '../../assets/image_login.avif';
import { useNavigate } from "react-router-dom";
import main_logo from '../../assets/maktabalogo.png'
import react , {useState } from 'react';
import axios from 'axios';
import './login.css';
import logsvg from '../../assets/login_assets/log.svg';
import register from '../../assets/login_assets/register.svg';
function Login() {
  const [isActive, setIsActive] = useState("container");

  const handleClick = event => {
    setIsActive(isActive + " sign-up-mode");
  };
  const handleClick1 = event => {
    setIsActive("container");
  };
const [login_user, setLoginUser] = useState("");
const [login_password, setPassUser] = useState("");
const [error_msg, seterror_msg] = useState("");

const navigate = useNavigate();

//function login
function loginfn (){
  
  navigate("/dashboard");
  /*
  console.log('login_user',login_user);
  console.log('login_user',login_password);
  if(login_user ==""){
    seterror_msg("error")
  }
  axios.post(`http://localhost:3001/api/student_login`,{
    login_user : login_user,
    login_password : login_password
  })
      .then(res => {
        console.log(res);
        if(res.data.length >0){
          navigate("/dashboard");
        }else{
          seterror_msg("Data you've entred is wrong")
        }
      })*/
}
const handleChange1 =(event) =>{
  setLoginUser(event.target.value);
  console.log(login_user)
}
const handleChange2 = (event) => {
  setPassUser(event.target.value);
}
  return (
    <div className='login_container '>
      <div className={isActive}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={(event)=>{event.preventDefault();loginfn()}} className="sign-in-form">
            <img src={main_logo} className="main_logo_maktaba" />
            <h2 className="title">Connexion</h2>
            
            <div className='alert_login_form'>{error_msg}</div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nom D'utilisateur Ou E-mail" onChange={handleChange1}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mot De Passe" onChange={handleChange2}/>
            </div>
            <button className="btn solid" >Connexion</button>
            <a href="#">Mot De Passe Oublié ?</a>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Créer Votre Compte</h2>
                <p>Choisissez Votre Identité</p>
                   <div>
                      <input type="radio" id="contactChoice1"
                       name="contact" value="email"/>
                      <label for="contactChoice1">Etudiant</label>

                      <input type="radio" id="contactChoice2"
                      name="contact" value="telephone" />
                      <label for="contactChoice2">Enseignant</label>
                    </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nom D'utilisateur" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="E-mail" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mot De Passe" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirmer Mot De Passe" />
            </div>
            <div className="input-field">
              <i className="fas fa-id-card"></i>
              <input type="text" placeholder="Numero CIN" />
            </div>
            <input type="submit" className="btn" value="Créer" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={handleClick}>
              S'inscrire
            </button>
          </div>
          <img src={logsvg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
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
