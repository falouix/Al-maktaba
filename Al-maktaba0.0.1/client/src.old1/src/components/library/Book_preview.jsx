import react , {useState } from 'react';
import bookcover from './event_item_container/assets/bookcover.jpg'
function Book_preview() {
    return(
        <>
        <div className='book_preview_container'>
          <h2 className='book_preview_h2'>A Prepos Le Cours <button className='thm-btn'><span>Signaler</span></button></h2>
          <img src={bookcover} />
          <h3>Nom Du Cours</h3>
          <h4>Desctiption</h4>
          <p>
            Contrary to popular belief, 
            Lorem Ipsum is not simply random text. 
            It has roots in a piece of classical Latin literature from 45 BC, 
            making it over 2000 years old. Richard McClintock,
            a Latin professor at Hampden-Sydney College in Virginia, looked
           </p>
           <div className='book_preview_footer'>
            <button className='thm-btn'><span>Lire</span></button>
            <button className='thm-btn'><span>Telecharger</span></button>
            <button className='thm-btn'><span>Ajouter au favoris</span></button>
           </div>
        </div>
        </>
    )
}

export default Book_preview;