
import react, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar';
import Navbar from '../navbar/Navbar';
import Status from '../status/Status';
import AddNew from '../status/addNew/AddNew';
import Environment from '../../environment';
import MyEditor from './Editor';
function Dashboard() {

    const [allStatus, setAllStatus] = useState([]);
    let navigate = useNavigate()
    const openProfile = (id) => {
        console.log(JSON.parse(localStorage.getItem('user')).id_students)
        if (JSON.parse(localStorage.getItem('user')).id_students != id) {
            navigate(`/profile/${id}`)
        } else {
            navigate(`/profile`)
        }
    };
    function getAllstatus(d) {
        axios.get(`${Environment.api_url}dashboard.php?action=getallstatus&counter=${d}`,
        )
            .then(data => {
                setcounter(counter + 1);
                setAllStatus(data.data.status)
            })
    }
    const [counter, setcounter] = useState(0);
    const [counter1, setcounter1] = useState(0);
    useEffect(() => {
        let d = new Date()
        getAllstatus(d)
    }, [counter1]);

    return (
        <>
            <Navbar />
            <div className='Dashboard_container'>

                <div className='side_container'>
                    <SideBar />
                </div>
                <div className='dashboard_main'>

                    <div className='add_status_container'>
                        <AddNew setcounter1={setcounter1} counter1={counter1} />
                    </div>
                    <div className='status_container' id='status_container'>
                        {allStatus && allStatus.length && allStatus.map(value => {
                            //console.log(value);
                            return (<Status
                                item={value}
                                setcounter1={setcounter1}
                                counter1={counter1}
                                openProfile={openProfile}
                            />)
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;