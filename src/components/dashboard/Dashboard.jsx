
import react , {useState,useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import SideBar from './SideBar';
import Navbar from '../navbar/Navbar';
import Status from '../status/Status';
import AddNew from '../status/addNew/AddNew';
import Environment from '../../environment';
export default function Dashboard() {
    const [allStatus , setAllStatus] = useState([]);
    const [counter , setcounter] = useState(0);
    const [counter1 , setcounter1] = useState(0);
    console.log("allStatus",allStatus) 
    useEffect(() => {
        let d=new Date()
        ReactDOM.render(<></>, document.getElementById('status_container'));
        axios.get(`https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/dashboard.php?action=getallstatus&counter=${d}`,
        )
          .then( data => {
            setcounter(counter+1);
            console.log(data.data.status)
            setAllStatus(data.data.Status)
            
            let something = data.data.status.map(value=>{
                console.log(value);
                return(<Status item={value} setcounter1={setcounter1} counter1={counter1}/>)
            });
            ReactDOM.render(something, document.getElementById('status_container'));
          }).catch(error => {
                console.log(error);
              });
      }, [counter1]);
      
    return(
        <>
        <Navbar />
        <div className='Dashboard_container'>
            <div className='side_container'>
                <SideBar />
            </div>
            <div className='dashboard_main'>
                <div className='add_status_container'>
                    <AddNew setcounter1={setcounter1} counter1={counter1}/>
                </div>
                <div className='status_container' id='status_container'>
                  
                </div>
            </div>
        </div>
        </>
    )
}