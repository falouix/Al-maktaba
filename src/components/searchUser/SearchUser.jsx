
import react, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import SideBar from './SideBar';
import Navbar from '../navbar/Navbar';
import Environment from '../../environment';
import ProfilePic from '../../assets/ProfilePic.png';

import { useNavigate, useParams } from "react-router-dom";
function SearchUser() {


    const params = useParams();
    const [allStatus, setAllStatus] = useState([]);
    let navigate = useNavigate()
    const openProfile = (id) => {
        console.log(id)
        if (JSON.parse(localStorage.getItem('user')).id_students != id) {
            navigate(`/profile/${id}`)
        } else {
            navigate(`/profile`)
        }
    };
    function getSearch(d, search) {
        axios.get(`${Environment.api_url}students.php?action=searchuser&counter=${d}&search=${search}`,
        )
            .then(data => {
                setcounter(counter + 1);
                console.log('datatttt', data.data)
                setAllStatus(data.data.user)
            })
    }
    const [counter, setcounter] = useState(0);
    const [counter1, setcounter1] = useState(0);
    useEffect(() => {
        let d = new Date()
        let search = 'test'

        getSearch(d, params.search)
    }, [counter1]);

    return (
        <>
            <Navbar />
            <div className='Dashboard_container'>

                <div className='side_container'>
                    <SideBar />
                </div>
                <div className='dashboard_main marginTop'>
                    <div className='status_container' id='status_container'>
                        {allStatus && allStatus.length && allStatus.map(value => {
                            console.log(value);
                            return (
                                <div
                                    className={!value.type_user == 'etudiant' ? 'card_container teacher' : 'card_container student'}
                                    onClick={() => { openProfile(value.id_students) }}>
                                    <div className={!value.type_user == 'etudiant' ? 'card_container_header teacher' : 'card_container_header student'}>
                                        <img src={ProfilePic} className='avatar_img' />
                                        <h4 className='h4_status' >{value.login_student}</h4>
                                    </div>
                                    <div>
                                        <span>Contacts</span>
                                        <p>mail: {value.mail_student}</p>
                                        <p>facebook: {value.link_facebook}</p>
                                        <p>LinkdIn: {value.link_linkdin}</p>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchUser;