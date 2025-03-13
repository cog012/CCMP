import { useState } from 'react'

export default function useAdminToken() {
    const [adminToken, setAdminToken] = useState(getAdminToken())
    function getAdminToken() {
        const adminTokenString = localStorage.getItem('adminToken')
        const adminToken = JSON.parse(adminTokenString)
        return adminToken
    }
    function saveAdminToken({ adminToken }) {
        const newAdminToken = { adminToken: adminToken }
        localStorage.setItem('adminToken', JSON.stringify(newAdminToken))
        setAdminToken(newAdminToken)
    }

    return {
        setAdminToken: saveAdminToken, adminToken: adminToken
    }
}