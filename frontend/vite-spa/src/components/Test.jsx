import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Upload from './Upload/Upload'
import Get from './Get/Get'
import { getObjectList } from '../services/s3'



export default function Test({ user }) {
    const [objectList, setObjectList] = useState([])

    useEffect(() => {
        let mounted = true
        getObjectList()
            .then(res => {
                if (mounted) {
                    setObjectList(res)
                }
            })
        return () => mounted = false
    }, [])

    return (
        <div>
            <h2>Test Page</h2>
            <Link to="/dashboard">To Dashboard Page</Link>
            <ul>
                {objectList.map(object => (<li key={object.Key}>{object.Key}</li>))}
            </ul>
            <Upload user={user} />
            <Get />
        </div>
    )
}




