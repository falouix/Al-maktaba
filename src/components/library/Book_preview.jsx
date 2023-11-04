import { useState } from 'react';
import axios from 'axios';
function Book_preview(data) {
  const [Newdescription, setNewdescription] = useState(data.data.name_file);
  const [NewName, setNewName] = useState(data.data.description_file);

  const addToFavorit = () => {
    axios.post(
      `https://www.apialmaktaba.inspira-jendouba.org/library66.php`,
      {
        action: 'add_favorit',
        id_user: JSON.parse(localStorage.getItem('user')).id_students,
        id_file: data.data.id_file,
      }).then(res => {
        //console.log(res.data)
      })
  }
  const saveEdits = () => {
    axios.post(
      `https://www.apialmaktaba.inspira-jendouba.org/library66.php`,
      {
        action: 'edti_file_description',
        id_file: data.data.id_file,
        Newdescription: Newdescription,
        NewName: NewName,
      }).then(res => {
        data.setcounter1(data.counter1 + 1)
        data.closeModal()
        console.log(res.data)
      })
  }
  return (
    <>
      <div className="container13">
        <h3>
          {data.data.name_file}
        </h3>
        {data.action &&
          <input rows="4" style={{ width: "100%" }} placeholder='ecrire ici le nouveau titre' onChange={(e) => {
            setNewName(e.target.value)
          }} />}
        <iframe
          id="if1"
          width="100%"
          height="600"
          src={"https://www.apialmaktaba.inspira-jendouba.org/" + data.data.location_file}>
        </iframe>
        <div className="star-wrapper13">
          <a href="#" className="fas fa-star s1"></a>
          <a href="#" className="fas fa-star s2"></a>
          <a href="#" className="fas fa-star s3"></a>
          <a href="#" className="fas fa-star s4"></a>
          <a href="#" className="fas fa-star s5"></a>
        </div>
        <h3>
          Description
        </h3>
        <p >
          {data.data.description_file}
        </p>

        {data.action &&
          <textarea rows="4" style={{ width: "100%" }} placeholder='ecrire ici le nouveau description' onChange={(e) => {
            setNewdescription(e.target.value)
          }} />}
        <div className='btn_container_file_read'>
          {!data.action
            && <button className="thm-btn13"><span>Signaler</span></button>}
          {!data.action
            && data.data.flag != "profile" && <button className="thm-btn13" onClick={() => {
              addToFavorit()
            }}><span>Ajouter au favoris</span></button>}
          {data.action &&
            <button className="thm-btn13" onClick={() => {
              saveEdits();
            }}>
              <span>Enregistrer</span>
            </button>}
        </div>
      </div>

    </>
  )
}

export default Book_preview;