import react, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import LogoYoutheonVF from './assets/LogoYoutheonVF.png';
import SideBar from '../dashboard/SideBar';
import Navbar from '../navbar/Navbar';
import LOGOS from './assets/LOGOSSS.jpg';
import Environment from '../../environment';
import './options.css';


function Options() {

  const [lienLinkedin, setLienLinkedin] = useState('');
  const [lienFacebook, setLienFacebook] = useState('');
  const [type_user, settype_user] = useState(JSON.parse(localStorage.getItem('user')).type_user);
  const [login_user, setLoginUser] = useState(JSON.parse(localStorage.getItem('user')).login_student);
  const [level_student, setlevel_student] = useState(JSON.parse(localStorage.getItem('user')).level_student);
  const [speciality_student, setspeciality_student] = useState(JSON.parse(localStorage.getItem('user')).speciality_student);
  const [mail_student, setmail_student] = useState(JSON.parse(localStorage.getItem('user')).mail_student);
  const [login_password, setPassUser] = useState(JSON.parse(localStorage.getItem('user')).password_student);
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

  const [error_msg, seterror_msg] = useState()
  const [progress1, setProgress1] = useState('');
  function handleLevelChange(e) {
    setid_class(levels[e.target.value].name)
    setsubjectsToRender(subjects[e.target.value].map(item => {
      return (
        <option key={item.id} value={item.name}>{item.name}</option>
      )
    }))
  }
  const [subjectsToRender, setsubjectsToRender] = useState(subjects[0].map(item => {
    return (
      <option key={item.id} value={item.id}>{item.name}</option>
    )
  }))



  const [name_file, setname_file] = useState('')
  const [description_file, setdescription_file] = useState('')
  const [nom_teacher, setnom_teacher] = useState('')
  const [id_class, setid_class] = useState('')
  const [id_uploader, setid_uploader] = useState('1')
  const [id_subject, setid_subject] = useState('')
  const [login_password2, setPassUser2] = useState("");
  const updateAccount = (event) => {
    event.preventDefault()
    axios.post(Environment.api_url + 'students.php', {
      action: 'updateaccount',
      id: JSON.parse(localStorage.getItem('user')).id_students,
      login_user: login_user,
      type_user: type_user,
      speciality_student: speciality_student,
      login_password: login_password,
      level_student: level_student,
      mail_student: mail_student,
      lienLinkedin: lienLinkedin,
      lienFacebook: lienFacebook
    }).then((res) => {
      console.log(res)
      //console.log(res.data)
    })
  }

  return (
    <>
      <Navbar />
      <div className='Dashboard_container'>
        <div className='side_container'>
          <SideBar />
        </div>
        <div className='dashboard_main'>
          <div className="heading29"></div>

          <div className="card mb-4">
            {/* Title START */}
            <div className="card-header border-0 pb-0">
              <h1 className="h5 card-title">Paramètres du compte</h1>
            </div>
            {/* Card header START */}
            {/* Card body START */}
            <div className="card-body">
              {/* Form settings START */}
              <form className="">
                {/* First name */}
                <div className="styleparametre">
                  <label className="form-label">Prénom</label>
                  <input type="text" className="form-control" placeholder defaultValue="Prénom" />
                </div>

                {/* User name */}
                <div className="styleparametre">
                  <label className="form-label">Nom d'utilisateur</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder
                    defaultValue={JSON.parse(localStorage.getItem('user')).login_student}
                    onChange={(e) => {
                      setLoginUser(e.target.value)
                    }} />
                </div>

                {/* Années Universitaire  */}
                <div className="styleparametre">
                  <label className="form-label">Choisir Votre Années Universitaire </label>

                  <select className="select11" onChange={(e) => { handleLevelChange(e) }}>
                    {
                      levels.map(item => {
                        return (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        )
                      })
                    }
                  </select>

                </div>
                {/* Spécialité  */}
                <div className="styleparametre">
                  <label className="form-label">Choisir Votre Spécialité </label>
                  <select className="select11" onChange={(e) => {
                    console.log(e.target.value)
                    setspeciality_student(e.target.value)
                  }}>
                    {subjectsToRender}
                  </select>
                </div>
                {/* Type d'utilisateur */}
                <div className="styleparametre">
                  <div >
                    <label className="form-label">Type d'utilisateur</label>
                    <div className='usertyperadiobox'>
                      <input
                        type="radio"
                        id="huey"
                        name="drone"
                        defaultValue="huey"
                        onClick={() => {
                          settype_user('Enseignant')
                        }} />
                      <label htmlFor="huey">Ensegnant</label>
                      <input
                        type="radio"
                        id="dewey"
                        name="drone"
                        defaultValue="dewey"
                        onClick={() => {
                          settype_user('Etudiant')
                        }}
                      />
                      <label htmlFor="dewey">Etudiant</label>
                    </div>
                  </div>
                </div>
                {/* Adresse E-mail*/}
                <div className="styleparametre">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder
                    defaultValue={JSON.parse(localStorage.getItem('user')).mail_student}
                    onChange={(e) => {
                      setmail_student(e.target.value)
                    }} />
                </div>
                <div className="styleparametre">
                  <label className="form-label">Lien Facebook</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder defaultValue="https://www.facebook.com/@username"
                    onChange={(e) => {
                      setLienFacebook(e.target.value)
                    }}
                  />
                </div>
                <div className="styleparametre">
                  <label className="form-label">Lien Linkedin</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder
                    onChange={(e) => {
                      setLienLinkedin(e.target.value)
                    }}

                    defaultValue="https://www.linkedin.com/in/@username" />
                </div>
                {/* Button  */}
                <div className="col-12 text-end">
                  <button
                    type="submit"
                    onClick={updateAccount}
                    className="thm-btn10">
                    <span>Sauvegarder</span>
                  </button>
                </div>
              </form>
              {/* Settings END */}
            </div>
          </div>
          <div className="card mb-4">
            {/* Title START */}
            <div className="card-header border-0 pb-0">
              <h5 className="card-title">Changez votre mot de passe</h5>
            </div>
            {/* Title START */}
            <div className="card-body">
              {/* Settings START */}
              <form className="">
                {/* Current password */}
                <div className="styleparametre">
                  <label className="form-label">Mot de passe actuel</label>
                  <input type="text" className="form-control" placeholder="Entrez Votre mot de passe Actuelle" />
                </div>
                {/* Nouveau mot de passe */}
                <div className="styleparametre">
                  <label className="form-label">Nouveau mot de passe</label>
                  {/* Input group */}
                  <div className="input-group">
                    <input
                      className="form-control fakepassword"
                      type="password" id="psw-input"
                      placeholder="Entrez un nouveau mot de passe"
                      onChange={(e) => {
                        setPassUser(e.target.value)
                      }}
                    />
                    <span className="input-group-text p-0">
                      <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px" />
                    </span>
                  </div>
                  {/* Pswmeter */}
                  <div id="pswmeter" className="mt-2" />
                  <div id="pswmeter-message" className="rounded mt-1" />
                </div>
                {/* Confirm password */}
                <div className="styleparametre">
                  <label className="form-label">Confirmez le mot de passe</label>
                  <input type="text" className="form-control" placeholder />
                </div>
                {/* Button  */}
                <div className="col-12 text-end">
                  <button type="submit" className="thm-btn10"><span>Mettre à jour</span></button>
                </div>
              </form>

              {/* Settings END */}
            </div>
          </div>






          <div className="card mb-4">
            {/* Card header START */}
            <div className="card-header border-0 pb-0">
              <h5 className="card-title">Supprimer le compte</h5>
              <p className="mb-0">Cette Section est Reserver pour la suppression de votre compte,
                Noté Bien : ça va être permanent</p>
            </div>
            {/* Card header START */}
            {/* Card body START */}
            <div className="card-body">
              {/* Delete START */}
              <h6>Avant que tu partes...</h6>
              <ul>
                <li>Si vous supprimez votre compte, vous perdrez toutes vos données.</li>
              </ul>
              <div className="form-check form-check-md my-4">
                <input className="form-check-input" type="checkbox" defaultValue id="deleteaccountCheck" />
                <label className="form-check-label" htmlFor="deleteaccountCheck">Oui, je souhaite supprimer mon compte</label>
              </div>
              <a href="#" className="thm-btn33"><span>Garder mon compte</span></a>
              <a href="#" className="thm-btn10"><span>Supprimer mon compte</span></a>
              {/* Delete END */}
            </div>
            {/* Card body END */}
          </div>

        </div>
      </div>
    </>
  )
}
export default Options;