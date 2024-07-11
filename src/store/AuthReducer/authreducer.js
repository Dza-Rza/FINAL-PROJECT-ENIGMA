const valToken = localStorage.getItem("token")
const valUserInfo = JSON.parse(localStorage.getItem("userInfo"))

const DEFAULT_STATE = {
    token: valToken,
    userInfo: valUserInfo,
    isAuthenticated: !!valToken, // Convert token to boolean
};

    export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_LOGIN_DATA":
            return { ...action.dataPayload, isAuthenticated: true };
        case "LOGOUT":
            localStorage.removeItem("token")
            localStorage.removeItem("userInfo")
            return { userInfo:null, token: null, isAuthenticated: false }
        case "CHECK_AUTH_STATUS":
            return {
                ...state,
                isAuthenticated: state.token ? true : false
            }
        default:
            return state
    }
}