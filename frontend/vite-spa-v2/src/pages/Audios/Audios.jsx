import React from 'react'
import ObjectList from '../../components/ObjectList/ObjectList'
import ObjectUpload from '../../components/ObjectUpload/ObjectUpload'
import ObjectGet from '../../components/ObjectGet/ObjectGet'

export default function Audios({ user }) {
    return (
        <div>
            <h1>音频</h1>
            <ObjectList defCategory={'audios'} />
            <ObjectUpload user={user} defCategory={'audios'} />
            <ObjectGet />
        </div>
    )
}