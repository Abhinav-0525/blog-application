import React, { useState } from 'react'
import { RegisterContext } from './RegisterContext'

function Store({children}) {

    const [regiSnack, setRegiSnack] = useState(false);
    const [artiSnack, setArtiSnack] = useState(false);
    const [artiUpSnack, setArtiUpSnack] = useState(false);

  return (
    <RegisterContext.Provider value={{
        registerNotify:[regiSnack, setRegiSnack],
        articleCreateNotify: [artiSnack, setArtiSnack],
        articleUpdateNotify: [artiUpSnack, setArtiUpSnack]
    }}>
        {children}
    </RegisterContext.Provider>
  )
}

export default Store