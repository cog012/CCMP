import { useState } from 'react'

export default function useAdmin() {
    const [admin, setAdmin] = useState(getAdmin())
    function getAdmin() {
        const adminString = localStorage.getItem('admin')
        const admin = JSON.parse(adminString)
        return admin
    }
    function saveAdmin({ admin }) {
        const newAdmin = { admin: admin }
        localStorage.setItem('admin', JSON.stringify(newAdmin))
        setAdmin(newAdmin)
    }

    return {
        setAdmin: saveAdmin, admin: admin
    }
}