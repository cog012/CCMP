import React from 'react'
import ObjectList from '../../components/ObjectList/ObjectList'
import ObjectUpload from '../../components/ObjectUpload/ObjectUpload'
import ObjectGet from '../../components/ObjectGet/ObjectGet'

export default function Videos({ user }) {
    return (
        <div>
            <h1>视频</h1>
            <ObjectList defCategory={'videos'} />
            <ObjectUpload user={user} defCategory={'videos'} />
            <ObjectGet />
        </div>
    )
}