import React from 'react'
import ObjectList from '../../components/ObjectList/ObjectList'
import ObjectUpload from '../../components/ObjectUpload/ObjectUpload'
import ObjectGet from '../../components/ObjectGet/ObjectGet'

export default function Files({ user }) {
    return (
        <div>
            <h1>文档</h1>
            <ObjectList defCategory={'files'} />
            <ObjectUpload user={user} defCategory={'files'} />
            <ObjectGet />
        </div>
    )
}