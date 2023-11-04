import React, { useState } from 'react';
import axios from 'axios';

function AddFile(counter1) {
    const [error_msg, setError_msg] = useState('')
    const createFile = () => {
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
                        <label>Nom de forum*</label>
                        <input className="input-field11" type="text" />
                        <label>Description*</label>
                        <div className="input-field-description11">
                            <textarea
                                type="text"
                                placeholder='Veuillez insérer la discription de votre forum'
                                rows="6"
                            />
                        </div>
                        <button className="thm-btn margin_top_5" onClick={createFile}><span>Partager</span></button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddFile;