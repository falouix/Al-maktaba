import React , {useState,useEffect } from 'react';
import axios from 'axios';
import ProfilePic from '../../../assets/dashboard_assets/ProfilePic.png';
import { BiShare } from "react-icons/bi";
import Modal from 'react-modal';
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"

      
function AddClub(props){
    //files handling
    const [logo_file, setlogo_file] = useState()
    const [banner_file, setbanner_file] = useState()
    function handleChangelogo_file(event) {
        setlogo_file(event.target.files[0])
    }
    function handleChangebanner_file(event) {
        setbanner_file(event.target.files[0])
    }
    // club imformation
    const [name_club,setname_club] = useState('')
    const [id_student,setid_student] = useState(1)
    const [description_club,setdescription_club] = useState('')
    const [progress, setProgress] = useState()
    const [progress1, setProgress1] = useState()
    // creat club funtion
    async function createClub(){
      
        // sending club information
        try { await axios.post(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/clubs.php`,
          {
            action : 'data_information',
            name_club : name_club,
            description_club : description_club,
            id_student : id_student
          }
        )
          .then(async res => {
            if(res.data.success == 'success'){
                console.log(res.data.insert_id)
                // sending files
                const formDatalogo_file = new FormData();
                const formDatabanner_file = new FormData();
                formDatalogo_file.append('logo_file', logo_file);
                formDatabanner_file.append('banner_file', banner_file);
                await axios.post(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/clubs.php?action=datalogo_file&insert_id=`+res.data.insert_id,
                  formDatalogo_file,{
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
                    if(res.data == 'success'){
                        console.log(res.data)
                    }
                  })
                  await axios.post(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/clubs.php?action=databanner_file&insert_id=`+res.data.insert_id,
                  formDatabanner_file,{
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: data => {
                      //Set the progress value to show the progress bar
                      setProgress1(Math.round((100 * data.loaded) / data.total))
                    },
                  }
                 )
                   .then(res => {
                     console.log(res.data);
                     if(res.data == 'success'){
                         console.log(res.data)
                     }
                   })
                   
            }
            return res.data
          })}
          catch (err) {
              console.error(err);
          }

      }
      const creatReal=()=>{
        createClub()
          .then(res =>{ 
            props.closeModal1()
            props.settest(++props.test)
            
          })
      }
    const content =
        <>
        <h2>Ajouter un nouveau club</h2>
            <label>Nom du club</label>
            <input type="text" placeholder='Nom du club' className='addNewClubinput'
             onChange={(event)=>{
                event.preventDefault();
                setname_club(event.target.value);
             }}
            />
            <label>Description</label>
            <textarea type="text" rows="6"
             onChange={(event)=>{
                event.preventDefault();
                setdescription_club(event.target.value);
             }}
            />
            <label>Logo</label>
            <input type="file" onChange={(event)=>{handleChangelogo_file(event)}}/>
            {progress !=null && <ProgressBar now={progress} label={`${progress}%`} />}
            <label>Banniér</label>
            <input type="file" onChange={(event)=>{handleChangebanner_file(event)}}/>
            {progress1 && <ProgressBar now={progress1} label={`${progress1}%`} />}
            <button className="thm-btn margin_top_5" onClick={creatReal}>
                <span>Demmander</span>
            </button>
            <button className="thm-btn margin_top_5" onClick={props.closeModal1}>
                <span>cancel</span>
            </button>
        </>;
 
    
    
    return(
        <>
        <div className='addnew_club_container'>
            {content}
        </div>
        </>
    );
}

export default AddClub;