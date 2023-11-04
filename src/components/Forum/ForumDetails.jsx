
import react, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from './SideBar';
import Navbar from '../navbar/Navbar';
import Environment from '../../environment';

import ProfilePic from '../../assets/ProfilePic.png';
import './Forum.css';
import TextField from '@mui/material/TextField';
function ForumDetails() {

  const [displayLimit, setDisplayLimit] = useState(3);
  const showMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 2);
  };
  let d = new Date()
  // lazy load somehow
  const [counter, setcounter] = useState(0);
  const [comment, setComment] = useState('')

  const [comments, setComments] = useState([])
  const [forum, setForum] = useState({})
  const [fileContent, setFileContent] = useState(<></>)
  let navigate = useNavigate()
  let forumId = useParams();
  console.log()
  async function getForum(id) {
    let item =
      await axios.get(`${Environment.api_url}forum.php?${d}&action=getforum&id=` + id)
        .then(function (res) {
          let item;
          console.log("res.data", res.data.clubs[0])
          setForum(res.data.clubs[0])
          let fileContent;
          if (res.data.clubs[0].status_type == 'jpg' ||
            res.data.clubs[0].status_type == 'jpeg' ||
            res.data.clubs[0].status_type == 'png' ||
            res.data.clubs[0].status_type == 'gif' ||
            res.data.clubs[0].status_type == 'webp') {
            fileContent =
              <img className='club_details_banner'
                src={Environment.api_url + res.data.clubs[0].file_dir} />
          } else {
            fileContent = <iframe
              id="if1"
              width="100%"
              height="700"
              src={Environment.api_url + res.data.clubs[0].file_dir}>
            </iframe>
          }
          setFileContent(fileContent)
          return (item)
        }).catch(function (error) {
          console.log(error);
        });
    return item
  }

  // get comments
  async function getComments(id) {
    await axios.get(`${Environment.api_url}forum.php?${d}&action=getallcomments&id=` + id)
      .then(function (res) {
        console.log(res.data.comments);
        setComments(res.data.comments)
      }).catch(function (error) {
        console.log(error);
      });
  }

  //share comment
  function sharecomment() {
    axios.post(`${Environment.api_url}forum.php`, {
      action: 'sharecomment',
      text_comment: comment,
      id_item: forumId.id,
      id_commenter: JSON.parse(localStorage.getItem('user')).id_students
    })
      .then(function (res) {
        console.log(res)
        if (res.data.success == "success") {
          setComment('')
          setcounter(counter + 1)
        }

      }).catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getForum(forumId.id)
    getComments(forumId.id)
    console.log('comments', comments)
  }, [counter]);
  return (
    <>
      <Navbar />
      <div className='Dashboard_container'>

        <div className='side_container'>
          <SideBar />
        </div>
        <div className={forum.type_user == "Etudiant" ? 'dashboard_main student' : 'dashboard_main teacher'}>
          <div>
            <div className='forumdetailsheader'>
              <div className='hosterinfo'>
                <img src={ProfilePic} className='avatar_img' />
                <h4>{forum.login_student}<span>{forum.type_user}</span></h4>

                <p>{forum.date}</p>
              </div>
              <h2>{forum.title_status}</h2>
              <p>{forum.text_status}</p>
            </div>
            <div className='forumimgContainer'>
              {fileContent}
            </div>
            <div className='commentsContainer'>
              {comments && comments.slice(0, displayLimit).map(item => {
                return (
                  <div key={item.id_comment}
                    className={item.type_user == "Etudiant" ? 'commentContainer student' : 'commentContainer teacher'}
                  >

                    <h4>
                      <img src={ProfilePic} className='avatar_img' />
                      {item.login_student}
                    </h4>
                    <p>{item.text_comment}</p>
                  </div>
                )
              })
              }
              <button
                className='thm-btn margin_top_5'
                onClick={showMore}
              >
                <span>afficher plus</span>
              </button>
            </div>
            <div className='sharecommentcontainer'>
              <textarea value={comment} onChange={(e) => {
                e.preventDefault()
                setComment(e.target.value)
              }} />
              <button
                className='thm-btn margin_top_5'
                onClick={sharecomment}
              >
                <span>commenter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForumDetails;