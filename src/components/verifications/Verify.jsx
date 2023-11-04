import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import './verify.css';
import Modal from 'react-modal';
import Mailverif from '../../assets/mailverif.png';
import Environment from '../../environment';
import { TextField } from '@mui/material';
let subtitle;
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 'auto',
    width: 'auto',
    background: 'white',
    padding: "5px"

  },
};

const Commentstyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    marginTop: '20px',
    transform: 'translate(-50%, -50%)',
    height: 'auto',
    width: '90%',
    background: 'white',
    padding: "5px"

  },
};


Modal.setAppElement('#root');
function Verify() {
  //console.log(item.item)
  const [tst, settst] = useState('');

  let forumId = useParams();

  const navigate = useNavigate();
  // get comments
  async function verify() {

    await axios.post(`${Environment.api_url}students.php`, {
      action: 'verify',
      id: forumId.id
    })
      .then(function (res) {
        console.log(res);
        if (res.data == "success") {
          navigate('/')
        }
      }).catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="Verify-container">
      <img src={Mailverif} alt='Mailverif' />
      <div style={{ textAlign: 'center' }}>
        <h3>Verifiez votre adresse mail</h3>
        <p>
          veuillez cliquer sur le bouton pour vérifier votre courrier
        </p>
        <button
          onClick={verify}
          className=' thm-btn '>
          <span>vérifier</span>
        </button>
      </div>
    </div>
  )
}

export default Verify;