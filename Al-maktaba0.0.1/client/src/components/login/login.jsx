
import image_login from '../../assets/image_login.avif';
import { useNavigate } from "react-router-dom";
import main_logo from '../../assets/maktabalogo.png'
import react , {useState } from 'react';
import axios from 'axios';
import './login.css';
import logsvg from '../../assets/login_assets/log.svg';
import register from '../../assets/login_assets/register.svg';
import Environment from '../../environment';
function Login() {
  
const navigate = useNavigate();

const[id_subject,setid_subject]  = useState('')
// vars we need
const levels =[
  {
      id : '0',
      name : '1er anneé',
  },
  {
      id : '1',
      name : '2eme anneé',
  },
  {
      id : '2',
      name : '3eme anneé',
  },
]
const subjects =[
  [{
      id : '0',
      name : 'Licence en économie',
  },
  {
      id : '1',
      name : 'Licence en gestion',
  },
  {
      id : '2',
      name : 'Licence en droit',
  }],
  [{
      id : '0',
      name : 'Licence en économie111',
  },
  {
      id : '1',
      name : 'Licence en gestion',
  },
  {
      id : '2',
      name : 'Licence en comptabilité',
  }],
  [{
      id : '0',
      name : 'Monnaie, Finance, Banque, Assurance',
  },
  {
      id : '1',
      name : 'Commerce et finance internationale',
  },
  {
      id : '2',
      name : 'Licence en comptabilité',
  }]
]
const[subjectsToRender,setsubjectsToRender]  = useState(subjects[0].map(item=>{
  return(
      <option key={item.id} value={item.id}>{item.name}</option>
  )
 }))
function handleLevelChange(e){
  setlevel_student(levels[e.target.value].name)
  setsubjectsToRender(subjects[e.target.value].map(item=>{
      return(
          <option key={item.id} value={item.name}>{item.name}</option>
      )
     }))
}
  const [current_user, setcurrent_user] = useState();
  const [type_user, settype_user] = useState("");
  const [login_user, setLoginUser] = useState("");
  const [level_student, setlevel_student] = useState("1er anneé");
  const [speciality_student, setspeciality_student] = useState("Licence en économie");
  const [mail_student, setmail_student] = useState("");
  const [login_password, setPassUser] = useState("");
  const [error_msg, seterror_msg] = useState("");
  //try to creat account


  const createAccount =(event)=>{
    event.preventDefault()
    if((type_user != "")&&(login_user != "")&&(level_student != "")&&(speciality_student != "")
    &&(login_password != "")){
    axios.post(Environment.api_url+'students.php',{
        action : 'inscrit',
        login_user  : login_user ,
        type_user : type_user,
        speciality_student : speciality_student,
        login_password :  login_password,
        level_student  :   level_student ,
        mail_student  :   mail_student
    }).then((res)=>{
        console.log(res)
          console.log(res.data)
          if(res.data == 'success'){
            seterror_msg('your acocount is ready login please');
            handleClick1();
          }else{
            seterror_msg('try again');
          }
    })}else{
      alert("remplir tous les champs SVP!")
    }
}

// try to login 
const loginAccount =(event)=>{
  event.preventDefault();
  var items =[];
  axios.post(Environment.api_url+'students.php?action=get',{
  action : 'get',
  login_user  : login_user ,
  mail_student : mail_student,
  login_password :  login_password,
}).then((res)=>{
  console.log(res.data.success)
  if(res.data.success){
    console.log('current_user from login',res.data.user[0].user)
    localStorage.setItem('user', JSON.stringify(res.data.user[0].user));
    setTimeout(()=>{

      navigate('/dashboard');
    },1000)
  }else{
    seterror_msg('login ou mot de passe invalide')
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
      <div className={isActive+" custom_login_container"}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={loginAccount} className="sign-in-form">
            <img src={main_logo} className="main_logo_maktaba" />
            <h2 className="title">Connexion</h2>
            <div className='alert_login_form'>{error_msg}</div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nom D'utilisateur Ou E-mail" onChange={(e)=>{
                e.preventDefault();
                console.log('e.target.value',e.target.value)
                setLoginUser(e.target.value)
              }}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mot De Passe" onChange={(e)=>{
                e.preventDefault();
                console.log('e.target.value',e.target.value)
                setPassUser(e.target.value)
              }}/>
            </div>
            <button className="btn solid custom" >Connexion</button>
            <a href="#">Mot De Passe Oublié ?</a>
          </form>
          <form onSubmit={createAccount} className="sign-up-form">
            <h2 className="title">Créer Votre Compte</h2>
                <p>Choisissez Votre Identité</p>
                   <div>
                      <input type="radio" id="contactChoice1"
                       name="contact" value="email" onClick={()=>{
                        settype_user('Etudiant')
                      }}/>
                      <label for="contactChoice1">Etudiant</label>
                      <input type="radio" id="contactChoice2"
                      name="contact" value="telephone" onClick={()=>{
                        settype_user('Enseignant')
                      }}/>
                      <label for="contactChoice2">Enseignant</label>
                    </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nom D'utilisateur" onChange={(e)=>{
                e.preventDefault();
                console.log('e.target.value',e.target.value)
                setLoginUser(e.target.value)
              }} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="E-mail" onChange={(e)=>{
                e.preventDefault();
                console.log('e.target.value',e.target.value)
                setmail_student(e.target.value)
              }}/>
            </div>

            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mot De Passe" onChange={(e)=>{
                e.preventDefault();
                console.log('e.target.value',e.target.value)
                setPassUser(e.target.value)
              }}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirmer Mot De Passe" />
            </div>
            <h5>Choisir Votre Années Universitaire</h5>
            
            <div className="input-field">
              <i className="fas fa-bars"></i>
            <select onChange={(e)=>{handleLevelChange(e)}}> 
                {
                  levels.map(item=>{
                    return(
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                  })  
                }
            </select>
            </div>
            <h5>Choisir Votre Spécialité</h5>
            <div className="input-field">
              <i className="fas fa-bars"></i>
              <select onChange={(e)=>{
                console.log(e.target.value)
                setspeciality_student(e.target.value)
            }}>
                {subjectsToRender}
            </select>
            </div>
           
            <input type="submit" className="btn solid custom" value="Créer" />
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
