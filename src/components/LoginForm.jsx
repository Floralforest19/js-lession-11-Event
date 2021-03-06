import React, { useState, useContext }from 'react'
import { UserContext } from '../context/UserContext'
import { useHistory } from 'react-router-dom'

const ROOT_URL = "http://yoshi.willandskill.eu:8999/api/v1/"
const LOGIN_URL = `${ROOT_URL}auth/api-token-auth/`

export default function LoginForm() {
    const history = useHistory()

    const [email, setEmail] = useState("test.user@willandskill.se")
    const [password, setPassword] = useState("js-lesson-10")
    const {setToken} = useContext(UserContext)

    function login() {
        const payload = {
            email: email,
            password: password
        }
        //Samma som const payload = {email, password}
        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                setToken(data.token)
                history.push("/event-list")
            })
    }
    return(
        <div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    placeholder="john.doe@company.com"
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                />
            </div>
            <button onClick={login}>Login</button>
        </div>
    )
}