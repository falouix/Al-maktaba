import React, { useState } from 'react';
import axios from 'axios';

import Environment from '../../../environment';
function AddFile(counter1) {

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
    //files handling
    const [library_file, setlibrary_file] = useState([])
    function handleChangelibrary_file(event) {
        console.log('event.target.files[0]', event.target.files[0])
        setlibrary_file(event.target.files[0])
    }
    const [subjectsToRender, setsubjectsToRender] = useState(subjects[0].map(item => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    }))
    function handleLevelChange(e) {
        setid_class(levels[e.target.value].name)
        setsubjectsToRender(subjects[e.target.value].map(item => {
            return (
                <option key={item.id} value={item.name}>{item.name}</option>
            )
        }))
    }

    const [name_file, setname_file] = useState('')
    const [description_file, setdescription_file] = useState('')
    const [nom_teacher, setnom_teacher] = useState('')

    const [id_class, setid_class] = useState('1er anneé')
    const [id_uploader, setid_uploader] = useState('1')
    const [id_subject, setid_subject] = useState('Licence en économie')
    const createFile = () => {
        console.log(JSON.parse(localStorage.getItem('user')).id_students)
        if (!name_file || !description_file || !nom_teacher || !library_file) {
            seterror_msg("Tous les champs sont obligatoire ! ");
        } else {
            // sending club information
            setid_uploader(JSON.parse(localStorage.getItem('user')).id_students)
            axios.post(`${Environment.api_url}library66.php`,
                {
                    action: 'data_information',
                    name_file: name_file,
                    description_file: description_file,
                    id_uploader: JSON.parse(localStorage.getItem('user')).id_students,
                    id_class: id_class,
                    id_subject: id_subject,
                    nom_teacher: nom_teacher,
                }
            )
                .then(res => {
                    console.log(res.data);
                    if (res.data.success == 'success') {
                        console.log(res.data.insert_id);
                        // sending files
                        const formDasetlibrary_file = new FormData();
                        formDasetlibrary_file.append('library_file', library_file);
                        axios.post(`${Environment.api_url}/library55.php?action=uploadnew_file&insert_id=` + res.data.insert_id,
                            formDasetlibrary_file, {
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
                                counter1.setcounter1(counter1.counter1 + 1)
                                counter1.closeModal1()
                                console.log(res.data);
                                if (res.data == 'success') {
                                    console.log(res.data)
                                }
                            })
                    }
                })
        }
    }






    return (
        <>
            <div className='addnew_container'>
                <div className="Book-box11">
                    <div className="right11">
                        <h3>Déposer Un Nouveau Document</h3>
                        <p style={{
                            fontSize: '12px',
                            color: 'white',
                            background: 'red',
                            padding: '8px',
                            width: '100%',
                            marginLeft: '-11px'
                        }}>{error_msg}</p>
                        <label>Choisir Fichier *</label>
                        <input type="file" accept=".pdf" onChange={(e) => {
                            handleChangelibrary_file(e)
                        }} />
                        {progress1 && <h1 style={{ color: 'red' }}>{progress1}%</h1>}
                        <label>Choisir le Niveau Universitaire *</label>
                        <select className="select11" onChange={(e) => { handleLevelChange(e) }}>
                            {
                                levels.map(item => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label>Choisir Spécialité</label>
                        <select className="select11" onChange={(e) => {
                            console.log(e.target.value)
                            setid_subject(e.target.value)
                        }}>
                            {subjectsToRender}
                        </select>
                        <label>Nom Du Matiére *</label>
                        <input className="input-field11" type="text" onChange={(e) => {
                            setname_file(e.target.value);
                        }} />
                        <label>Nom de l'Enseignant / Proffesseur *</label>
                        <input className="input-field11" type="text" onChange={(e) => {
                            setnom_teacher(e.target.value);
                        }} />
                        <label>Description*</label>
                        <div className="input-field-description11">
                            <textarea type="text" placeholder='Veuillez insérer le nom du chapitre ou sous chapitre' rows="6" onChange={(e) => {
                                setdescription_file(e.target.value);
                            }} />
                        </div>
                        <button className="thm-btn margin_top_5" onClick={createFile}><span>Partager</span></button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddFile;