
import react , {useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import Navbar from '../navbar/Navbar';
import Status from '../status/Status';
import AddNew from '../status/addNew/AddNew';
function Dashboard() {
    
    return(
        <>
        <Navbar />
        <div className='Dashboard_container'>
            <div className='side_container'>
                <SideBar />
            </div>
            <div className='dashboard_main'>
                <div className='add_status_container'>
                    <AddNew />
                </div>
                <div className='status_container'>
                    <Status />
                    
                    <Status />
                    
                    <Status />
                </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard;