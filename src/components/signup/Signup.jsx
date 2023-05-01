
import react , {useState } from 'react';
import image_login from '../../assets/image_login.avif';
import axios from 'axios';
import './login.css';
const [login_user, setLoginUser] = useState("");
const article = { title: 'React POST Request Example' };
// on change handler

//function login
function loginfn (){
  axios.post(`http://localhost:3001/api/student_login`)
      .then(res => {
        console.log(res);
      })
}
function Login() {
  function handleChange(event) {
  console.log(event.target.value);
}
  return (
    <>
      <div className='login_container'>
        <img src={image_login}  className="login_img"/>
        <div className='login_form' >
            <h1>Login</h1>
            <input type="text" placeholder='login ou email' onChange={handleChange()}/>
            <input type="password" placeholder='mot de passe'/>
            <button onClick={loginfn()}>login</button>
            <a>mot de passe oubliee</a>
            <hr/>
            <span>ou</span>
            <button>inscrit</button>
        </div>
      </div>
    </>
  );
}

export default Login;
