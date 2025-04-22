import React from 'react'
import ObjectList from '../../components/ObjectList/ObjectList'
import ObjectUpload from '../../components/ObjectUpload/ObjectUpload'
import ObjectGet from '../../components/ObjectGet/ObjectGet'

export default function Images({ user }) {
    return (
        <div>
            <h1>图片</h1>
            <ObjectList defCategory={'images'} />
            <ObjectUpload user={user} defCategory={'images'} />
            <ObjectGet />
        </div>
    )
}