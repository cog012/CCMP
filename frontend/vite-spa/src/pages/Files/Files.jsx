import React from 'react'
import List from '../../components/List/List'
import Upload from '../../components/Upload/Upload'
import Get from '../../components/Get/Get'

export default function Files({ user, category }) {
    return (
        <div>
            <h1>Files</h1>
            <List category={category} />
            <Upload user={user} category={category} />
            <Get category={category} />
        </div>
    )
}