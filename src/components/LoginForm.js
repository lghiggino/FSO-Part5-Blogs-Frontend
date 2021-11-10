import { useContext, useState } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import blogService from "../services/blogService";
import loginService from "../services/loginService";
import propTypes from "prop-types"

export default function LoginForm({ setNotificationMessage, setShowLoginForm }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { setUser } = useContext(LoggedInUserContext)
    //valid login with lghiggino - lghiggino

    async function handleLogin() {
        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            localStorage.setItem("blogsAppUser", JSON.stringify(user))
            blogService.setToken(user.token)
            setUsername("")
            setPassword("")
            setNotificationMessage({ message: "Logged in sucessfully", variant: "success" })
            setTimeout(() => {
                setNotificationMessage({message: "",  variant: "" })
            }, 5000)
            setShowLoginForm(false)
        }
        catch (error) {
            console.log(error)
            setNotificationMessage({ message: `Wrong credentials - ${error.message}`, variant: "error" })
            setTimeout(() => {
                setNotificationMessage({message: "",  variant: "" })
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

            {/* {user &&
                <pre>{JSON.stringify(user, null, 2)}</pre>
            } */}
        </>
    )
}

LoginForm.propTypes = {
    setNotificationMessage: propTypes.func.isRequired, 
    setShowLoginForm: propTypes.func.isRequired
}