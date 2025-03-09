import React from 'react'
import List from '../../components/List/List'
import Upload from '../../components/Upload/Upload'
import Get from '../../components/Get/Get'

export default function Images({ user, category }) {
    return (
        <div>
            <h1>Images</h1>
            <List category={category} />
            <Upload category={category} />
            <Get category={category} />
        </div>
    )
}