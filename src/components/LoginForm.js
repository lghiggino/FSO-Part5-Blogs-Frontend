import { useContext, useState } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import blogService from "../services/blogService";
import loginService from "../services/loginService";

export default function LoginForm({ setErrorMessage }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { user, setUser } = useContext(LoggedInUserContext)
    //valid login with lghiggino - lghiggino


    async function handleLogin() {
        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            localStorage.setItem("blogsAppUser", JSON.stringify(user))
            blogService.setToken(user.token)
            setUsername("")
            setPassword("")
        }
        catch (error) {
            console.log(error)
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email"
                value={username}
                onChange={(event) => { setUsername(event.target.value) }}
            />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"
                value={password}
                onChange={(event) => { setPassword(event.target.value) }}
            />

            <button onClick={() => { handleLogin() }}>Login</button>

            {user &&
                <pre>{JSON.stringify(user, null, 2)}</pre>
            }
        </>
    )
}