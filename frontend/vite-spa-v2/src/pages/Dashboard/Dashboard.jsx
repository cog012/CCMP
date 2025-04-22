import React from 'react'
import ObjectList from '../../components/ObjectList/ObjectList'
import ObjectUpload from '../../components/ObjectUpload/ObjectUpload'
import ObjectGet from '../../components/ObjectGet/ObjectGet'


export default function Dashboard({ user }) {
    return (
        <div>
            <h1>仪表盘</h1>
            <ObjectList defCategory={'all'} />
            <ObjectUpload user={user} defCategory={'all'} />
            <ObjectGet />
        </div>
    )
}
