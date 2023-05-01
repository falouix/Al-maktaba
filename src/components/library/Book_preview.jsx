import react , {useState } from 'react';
import bookcover from './event_item_container/assets/bookcover.jpg'
function Book_preview(data) {
    return(
        <>
  <div className="container13">
    <h3>
      {data.data.name_file}
    </h3>
      <iframe 
    id="if1" 
    width="100%" 
    height="600"  
    src={"https://www.apialmaktaba.inspira-jendouba.org/almaktaba_api/"+data.data.location_file}>
    </iframe>
    <div className="star-wrapper13">
          <a href="#" className="fas fa-star s1"></a>
          <a href="#" className="fas fa-star s2"></a>
          <a href="#" className="fas fa-star s3"></a>
          <a href="#" className="fas fa-star s4"></a>
          <a href="#" className="fas fa-star s5"></a>
        </div>
        <h3>
      Description
    </h3>
    <p >
      {data.data.description_file}
    </p>
    <div className='btn_container_file_read'>
    <button className="thm-btn13"><span>Signaler</span></button>
    <button className="thm-btn13"><span>Ajouter au favoris</span></button>

    </div>
      </div>

        </>
    )
}

export default Book_preview;