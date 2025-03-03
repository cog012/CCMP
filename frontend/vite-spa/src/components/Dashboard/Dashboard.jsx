import React from 'react';
import ObjectList from '../legacy/ObjectList'
import ObjectUpload from '../legacy/ObjectUpload'
import ObjectDelete from '../legacy/ObjectDelete'
import ObjectGet from '../legacy/ObjectGet'

export default function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
            <ObjectList />
            <ObjectUpload />
            <ObjectDelete />
        </div>
    )
}