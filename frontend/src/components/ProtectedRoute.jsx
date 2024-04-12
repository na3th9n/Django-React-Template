import {Navigate} from "react-router-dom"
import {jtwDeocde} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState } from "react"

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/api/token/refresh/", 
            {refresh: refreshToken});

            if ()
        } catch {
            setIsAuthorized(false)
            console.log(error)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decode = jtwDeocde(token)
        const tokenExpiration = decode.exp
        const now = Date.now() / 1000 // get date in seconds

        // compare time now and the expiration date

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />

}

export default ProtectedRoute