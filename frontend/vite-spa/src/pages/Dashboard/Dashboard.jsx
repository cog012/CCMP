import React from 'react'
import Upload from '../../components/Upload/Upload'
import List from '../../components/List/List'
import Get from '../../components/Get/Get'


export default function Dashboard({ user, category }) {
    return (
        <div>
            <List category={category} />
            <Upload user={user} category={category} />
            <Get category={category} />
        </div>
    )
}
