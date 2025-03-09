import React from 'react'
import Upload from '../../components/Upload/Upload'
import Get from '../../components/Get/Get'
import List from '../../components/List/List'
import Tag from '../../components/Tag/Tag'


export default function Test({ user, category }) {
    return (
        <div>
            <h1>Test Page</h1>
            <Tag user={user} />
            <List category={category} />
            <Upload user={user} category={category} />
            <Get />
        </div>
    )
}




