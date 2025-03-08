import React, { useEffect, useState } from 'react'
import Upload from '../../components/Upload/Upload'
import Get from '../../components/Get/Get'
import List from '../../components/List/List'


export default function Test({ user }) {
    const [objectList, setObjectList] = useState([])


    return (
        <div>
            <h1>Test Page</h1>
            <List />
            <Upload user={user} />
            <Get />
        </div>
    )
}




