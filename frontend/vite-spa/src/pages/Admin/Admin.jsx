import React from "react"
import TagList from "../../components/TagList/TagList"
import UserList from "../../components/UserList/UserList"
import ObjectListAdmin from "../../components/ObjectListAdmin/ObjectListAdmin"

export default function Admin({ user, adminToken }) {
    if (!adminToken) {
        return (
            <div>
                <h1>Page eligible for Admin</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>Admin Page</h1>
            <TagList user={user} adminToken={adminToken} />
            <UserList user={user} adminToken={adminToken} />
            <ObjectListAdmin user={user} adminToken={adminToken} />
        </div>
    )
}