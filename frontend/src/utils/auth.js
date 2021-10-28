import jwt_decode from "jwt-decode"

export let authenticate = (token, cb) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(token))
    }
}

export const isAuthenticated = () => {
    if (typeof window === "undefined") return false
    if (localStorage.getItem("jwt")) {
        let { exp } = jwt_decode(JSON.parse(localStorage.getItem("jwt")))
        if (new Date().getTime() < exp * 1000) {
            return true
        } else {
            localStorage.removeItem("jwt")
            return false
        }
    } else return false
}

export const userInfo = () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"))
    const decoded = jwt_decode(jwt)
    return { ...decoded, token: jwt }
}

export const signOut = cb => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        cb()
    }
}