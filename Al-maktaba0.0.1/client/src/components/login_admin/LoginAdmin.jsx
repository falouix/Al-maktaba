
import image_login from '../../assets/image_login.avif';
import { useNavigate } from "react-router-dom";
import main_logo from '../../assets/maktabalogo.png'
import react , {useState } from 'react';
import axios from 'axios';
import './LoginAdmin.css';
import logsvg from '../../assets/login_assets/log.svg';
import register from '../../assets/login_assets/register.svg';
import Environment from '../../environment';
function LoginAdmin() {
  
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
  console.log({
    action : 'get',
    login_user  : login_user ,
    mail_student : mail_student,
    login_password :  login_password,
  })
  axios.post(Environment.api_url+'admin.php?action=get',{
  action : 'get',
  login_user  : login_user ,
  mail_student : mail_student,
  login_password :  login_password,
}).then((res)=>{
  if(res.data.success){
    let userHolder = res.data.user[0].user
    if(userHolder.login_admin){
      userHolder.type = "admin"
    }else{
      userHolder.type = "user"
    }
    localStorage.setItem('user', JSON.stringify(userHolder));
    navigate('/dashboard');
  }else{
    seterror_msg('login ou mot de passe invalide')
  }
  })
}
  const [isActive, setIsActive] = useState("container");

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
            <h2 className="title">Connexion Admin</h2>
            <div className='alert_login_form'>{error_msg}</div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nom D'utilisateur" onChange={(e)=>{
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
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginAdmin;
