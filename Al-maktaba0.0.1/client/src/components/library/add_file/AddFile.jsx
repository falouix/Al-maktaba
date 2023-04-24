import React , {useState } from 'react';
import axios from 'axios';
import ProfilePic from '../../../assets/dashboard_assets/ProfilePic.png';
import { BiShare } from "react-icons/bi";
import Modal from 'react-modal';

import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
function AddFile(counter1){

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
      
    const [progress1, setProgress1] = useState('');
      //files handling
    const [library_file, setlibrary_file] = useState([])
    function handleChangelibrary_file(event) {
        console.log('event.target.files[0]',event.target.files[0])
        setlibrary_file(event.target.files[0])
    }
    const[subjectsToRender,setsubjectsToRender]  = useState(subjects[0].map(item=>{
        return(
            <option key={item.id} value={item.id}>{item.name}</option>
        )
       }))
    function handleLevelChange(e){
        setid_class(levels[e.target.value].name)
        setsubjectsToRender(subjects[e.target.value].map(item=>{
            return(
                <option key={item.id} value={item.name}>{item.name}</option>
            )
           }))
      }
      
      const[name_file,setname_file]  = useState('')
      const[description_file,setdescription_file]  = useState('')
      const[nom_teacher,setnom_teacher]  = useState('')
      
      const[id_class,setid_class]  = useState('')
      const[id_uploader,setid_uploader]  = useState('1')
      const[id_subject,setid_subject]  = useState('')
      const createFile = ()=>{
        // sending club information
        setid_uploader(JSON.parse(localStorage.getItem('user')).id_student)
        axios.post(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/library66.php`,
          {
            action : 'data_information',
            name_file : name_file,
            description_file : description_file,
            id_uploader : id_uploader,
            id_class : id_class,
            id_subject : id_subject,
            nom_teacher : nom_teacher
          }
        )
          .then(res => {
            console.log(res.data);
            if(res.data.success == 'success'){
                console.log(res.data.insert_id);
                // sending files
                const formDasetlibrary_file = new FormData();
                formDasetlibrary_file.append('library_file', library_file);
                axios.post(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/library55.php?action=uploadnew_file&insert_id=`+res.data.insert_id,
                    formDasetlibrary_file,{
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: data => {
                          //Set the progress value to show the progress bar
                         console.log(Math.round((100 * data.loaded) / data.total))
                         setProgress1(Math.round((100 * data.loaded) / data.total))
                        },
                      }
                )
                  .then(res => {
                    counter1.setcounter1(counter1.counter1+1)
                    counter1.closeModal1()
                    console.log(res.data);
                    if(res.data == 'success'){
                        console.log(res.data)
                    }
                  })
            }
          })

      }






    return(
        <>
        <div className='addnew_container'>
        <div class="Book-box11"> 
        <div class="right11">
        <h3>Déposer Un Nouveau Document</h3>
        <label>Choisir Fichier *</label>
        <input type="file" onChange={(e)=>{
            handleChangelibrary_file(e)
        }}/>
        {progress1 && <h1 style={{color: 'red'}}>{progress1}%</h1>}
        <label>Choisir le Niveau Universitaire *</label>
            <select class="select11" onChange={(e)=>{handleLevelChange(e)}}> 
                {
                  levels.map(item=>{
                    return(
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                  })  
                }
            </select>
            <label>Choisir Matière Spécifiée</label>
            <select class="select11"onChange={(e)=>{
                console.log(e.target.value)
                setid_subject(e.target.value)
            }}>
                {subjectsToRender}
            </select>
        <label>Nom Du Fichier *</label>
        <input class="input-field11" type="text" onChange={(e)=>{
            setname_file(e.target.value);
        }}/>
        <label>Nom de l'Enseignant / Proffesseur *</label>
        <input class="input-field11" type="text" onChange={(e)=>{
            setnom_teacher(e.target.value);
        }}/>
        <label>Description*</label>
        <div class="input-field-description11">
        <textarea type="text"  placeholder='Veuillez insérer le nom du chapitre ou sous chapitre' rows="6" onChange={(e)=>{
            setdescription_file(e.target.value);
        }}/>
        </div>
        <button className="thm-btn margin_top_5" onClick={createFile}><span>Partager</span></button>
        </div>
        </div>
        </div>

        </>
    );
}

export default AddFile;