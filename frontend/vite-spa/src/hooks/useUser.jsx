import { useState } from 'react';

export default function useUser() {
    const [user, setUser] = useState(getUser())
    function getUser() {
        const userString = localStorage.getItem('user')
        const user = JSON.parse(userString)
        return user
    }
    function saveUser({ email, password }) {
        const newUser = { email: email, password: password }
        localStorage.setItem('user', JSON.stringify(newUser))
        setUser(newUser)
    }

    return {
        setUser: saveUser, user: user
    }
}