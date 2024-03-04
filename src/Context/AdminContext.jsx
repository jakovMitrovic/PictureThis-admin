import React, { createContext, useState } from 'react'

export const AdminContext = createContext(null)

const AdminContextProvider = (props) => {
    const [admin, setAdmin] = useState({
        token:''
    })


    return (
        <AdminContext.Provider value={[admin, setAdmin]}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
