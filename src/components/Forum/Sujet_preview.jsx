import { useState } from 'react';
import axios from 'axios';
function Sujet_preview(data) {
  const [Newdescription, setNewdescription] = useState(data.data.name_file);
  const [NewName, setNewName] = useState(data.data.description_file);

  return (
    <>






    </>
  )
}

export default Sujet_preview;