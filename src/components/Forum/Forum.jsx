
import react, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SideBar from './SideBar';
import Navbar from '../navbar/Navbar';
import Status from '../status/StatusForum';
import AddNew from '../status/addNew1/AddNew';
import Environment from '../../environment';
import './Forum.css';
import TextField from '@mui/material/TextField';
function Forum() {
  // lazy load somehow
  const [displayLimit, setDisplayLimit] = useState(3);
  const [allStatus, setAllStatus] = useState([]);

  const [result, setResult] = useState([]);
  const [counter, setcounter] = useState(0);
  const [counter1, setcounter1] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [counter2, setcounter2] = useState(0);
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
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
    axios.get(`${Environment.api_url}forum.php?action=getallstatus&counter=${d}`,
    )
      .then(data => {
        console.log('data forums', data)
        setcounter(counter + 1);
        setAllStatus(data.data.status)
      })
  }




  useEffect(() => {
    let d = new Date();
    getAllstatus(d, displayLimit);
  }, [counter1]);

  useEffect(() => {
    function handleScroll() {
      const position = window.scrollY;
      setScrollPosition(position);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const showMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 2);
  };
  return (
    <>
      <Navbar />
      <div className='Dashboard_container'>

        <div className='side_container'>
          <SideBar />
        </div>
        <div className='dashboard_main'>

          <div className="" id="searchfiles_container" style={{ width: '96% !important' }}>
            <span>Recherche</span>
            <TextField
              style={{ width: "100%" }}
              placeholder='Rechercher nom de fichier ou nom du prof'

              onChange={(e) => {
                const all = allStatus.filter(item => {
                  if ((item.title_status.toUpperCase().includes(e.target.value.toUpperCase()))) {
                    console.log(item)
                    return item
                  }
                });
                setResult(all)
              }} />
          </div>
          <div className='add_status_container'>
            <AddNew setcounter1={setcounter1} counter1={counter1} />
          </div>
          <div className='status_container' id='status_container'>
            {result.length && result.length && allStatus.slice(0, displayLimit).map(value => {
              //console.log(value);
              return (<Status
                item={value}
                setcounter1={setcounter1}
                counter1={counter1}
                openProfile={openProfile}
              />)
            })}
            {!result.length && allStatus && allStatus.length && allStatus.slice(0, displayLimit).map(value => {
              //console.log(value);
              return (<Status
                item={value}
                setcounter1={setcounter1}
                counter1={counter1}
                openProfile={openProfile}
              />)
            })}
          </div>
          <div className='btn_container'>
            <button className='thm-btn' onClick={showMore}>
              <span>
                Show more
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forum;