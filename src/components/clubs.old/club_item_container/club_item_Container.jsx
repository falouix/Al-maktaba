
import react , {useState } from 'react';
import axios from 'axios';
import './club_item_Container.css'
function Club_item_Container(data) {
  console.log(data)
    return (
        <>
		<div className="Book-box-club">	
        <a href="#">
            <img 
                src={"http://localhost:8080/almaktaba_api/"+data.data.logo_dir} 
                alt="random image" 
                className="club_img"
                className='logo_clob_img'/>
            <h2 className='h2_event_item'>{data.data.name_club}</h2>
                <div className="count_container">
                    <div> 
                        <h3>12</h3>
                        <h3>Membres</h3>
                    </div>
                    <div> 
                        <h3>12</h3>
                        <h3>Publication</h3>
                    </div>
                </div>
                
        <button className="thm-btn thm-btn-club margin_top_5" ><span>Rejoint</span></button>

        
            
            
        </a>
		</div>
        </>
    )
}
export default Club_item_Container;