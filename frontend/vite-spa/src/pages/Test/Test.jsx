import React, { useEffect, useState } from 'react'
import Upload from '../../components/Upload/Upload'
import Get from '../../components/Get/Get'
import List from '../../components/List/List'
import Tag from '../../components/Tag/Tag'


export default function Test({ user, category }) {
    const [objectList, setObjectList] = useState([])


    return (
        <div>
            <h1>Test Page</h1>
            <Tag user={user} />
            <List category={category} />
            <Upload user={user} />
            <Get />
        </div>
    )
}




