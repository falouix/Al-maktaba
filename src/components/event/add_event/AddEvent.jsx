import React, { useState } from 'react';
import axios from 'axios';
import ProfilePic from '../../../assets/dashboard_assets/ProfilePic.png';
import { BiShare } from "react-icons/bi";
import Modal from 'react-modal';
import Environment from '../../../environment';
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
function AddEvent(props) {
  // const event
  const [banner_file, setbanner_file] = useState()
  const [nameEvent, setnameEvent] = useState();
  const handleChangenameEvent = (event) => {
    setnameEvent(event.target.value);
  }
  const handleChangebannerEvent = (event) => {
    console.log(event.target.files[0])
    if (event.target.files[0].type[0] != "i") {
      alert("type invalide le type de fichier doit etre image")
    } else {
      setbanner_file(event.target.files[0])
    }
  }
  const [DescriptionEvent, setDescriptionEvent] = useState();
  const [linkEvent, setlinkEvent] = useState();

  const [error_msg, seterror_msg] = useState()
  const handleChangelinkEvent = (event) => {
    setlinkEvent(event.target.value);
  }
  const handleChangeDescriptionEvent = (event) => {
    console.log(event.target.value);
    setDescriptionEvent(event.target.value);
  }
  const [DateStartEvent, setDateStartEvent] = useState();
  const handleChangeDateStartEvent = (event) => {
    setDateStartEvent(event.target.value);
  }
  const [DateEndtEvent, setDateEndtEvent] = useState();
  const handleChangeDateEndtEvent = (event) => {
    setDateEndtEvent(event.target.value);
  }
  const [progress, setProgress] = useState()
  const createEnvent = () => {
    if (!nameEvent || !DescriptionEvent || !DateStartEvent || !DateEndtEvent || !linkEvent || !banner_file) {
      seterror_msg("Tous les champs sont obligatoire ! ");
    } else {
      if (DateStartEvent > DateEndtEvent) {
        alert('chois du temps est pas coorect')
      } else {

        axios.post(Environment.api_url + 'events.php', {
          action: 'create',
          nameEvent: nameEvent,
          DescriptionEvent: DescriptionEvent,
          DateStartEvent: DateStartEvent,
          DateEndtEvent: DateEndtEvent,
          linkEvent: linkEvent,
          id_hoster: JSON.parse(localStorage.getItem('user')).id_students,
        }).then(async (res) => {
          console.log(res)
          const formDatabanner_file = new FormData();
          formDatabanner_file.append('banner_file', banner_file);
          await axios.post(`${Environment.api_url}events.php?action=upload_file&insert_id=` + res.data.insert_id,
            formDatabanner_file, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: data => {
              //Set the progress value to show the progress bar
              setProgress(Math.round((100 * data.loaded) / data.total))
            },
          }
          )
            .then(async res => {
              console.log(res.data);
              props.setCounter(props.counter + 1)
              props.closeModal1()
            })
        })
      }
    }

  }
  return (
    <>
      <div className='addnew_container'>
        <div className="Book-box12">
          <div className="right12">
            <h1>Créer Un Évènement</h1>
            <p style={{
              fontSize: '12px',
              color: 'white',
              background: 'red',
              padding: '8px',
              width: '100%',
            }}>{error_msg}</p>
            <label>Nom D'Événement</label>
            <input type="text" className="input-field-event12" onChange={(e) => {
              handleChangenameEvent(e);
            }} />
            <label>Description</label>

            <textarea type="text" rows="6" className="input-field-description13" placeholder='Décrivez Votre événement'
              onChange={(e) => {
                handleChangeDescriptionEvent(e);
              }} />
            <label>Ajouter Un Lien D'inscription</label>
            <input type="text" className="input-field-event12" placeholder='Exemple Lien Google form' onChange={(e) => {
              handleChangelinkEvent(e);
            }} />

            <h2>Ajouter Une Photos Pour L'événement</h2>
            <div className="buttons10">

              <span><input type='file' className="thm-btn margin_top_5 btn_file_event" onChange={(e) => {
                console.log(1111)
                handleChangebannerEvent(e);
              }} /></span>
              {progress && <ProgressBar now={progress} label={`${progress}%`} />}

            </div><br />
            <label>Choisir La Date de début de Votre Évènement </label>

            <input type="date" onChange={(e) => {
              handleChangeDateStartEvent(e);
            }} />
            <label>Choisir La Date de la Fin de Votre Évènement </label>
            <input type="date" onChange={(e) => {
              handleChangeDateEndtEvent(e);
            }} />
            <button className="thm-btn margin_top_5" onClick={(e) => createEnvent(e)}><span>Créer</span></button>

          </div>
        </div>
      </div>
    </>
  );
}

export default AddEvent;