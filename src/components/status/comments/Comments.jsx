import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
import '.././StatusPublication.css';
import Modal from 'react-modal';
import ProfilePic from '../../../assets/ProfilePic.png';
import Environment from '../../../environment';
let subtitle;
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: 'auto',
        width: 'auto',
        background: 'white',
        padding: "5px"

    },
};
Modal.setAppElement('#root');
function Comments(item) {
    //console.log(item.item)
    const [counter, setCounter] = useState(0);
    const [comment, setComment] = useState('');
    const [allComment, setAllComment] = useState([]);
    const sharecomment = () => {
        if (comment.length) {
            let d = new Date()
            axios.post(`${Environment.api_url}dashboard.php`, {
                action: 'sharecomment',
                id_commenter: JSON.parse(localStorage.getItem('user')).id_students,
                id_item: item.item.id_status,
                text_comment: comment
            }).then(res => {
                console.log(res.data)
                setCounter(counter + 1)
                setComment('')
            })
        } else {
            alert('le commentaire est vide')
        }
    }

    //////// /////////////// ///////
    useEffect(() => {

        let d = new Date()
        axios.get(`${Environment.api_url}dashboard.php?action=getallcomments&id=${item.item.id_status}&d=${d}`).then(res => {
            console.log(res.data)
            setAllComment(res.data.comments)
        })

    }, [counter]);
    //////////////// ///////


    return (
        <div className='commentsbox'>
            <div className='commentboxtop'>
                <h1 className='p_comment_h1 '>Commentaires</h1>
                <button >
                    <a>
                        <AiOutlineSearch className='icons'></AiOutlineSearch>
                    </a>
                </button>
                <div className='commentboxtopbg'></div>
            </div>
            <div className='Nativecomments' >
                {allComment != null && allComment.map(item => {
                    return (
                        <p className='p_comment_text'>
                            <img src={ProfilePic} className='avatar_img' />
                            <span className='p_comment_span'>{item.login_student} </span>
                            <p className='txt_comment_span'>{item.text_comment}</p>
                        </p>
                    )
                })}</div>
            <div className='Commentsinputt'>
                <input
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                    type="text"
                    className='comment_input'
                    placeholder='Écrire un commentaire' />
                <button
                    onClick={sharecomment}
                    className="thm-btn margin_top_5 p_comment_btn">
                    <span>commenter</span>

                </button>
            </div>
        </div>
    )
}

export default Comments;