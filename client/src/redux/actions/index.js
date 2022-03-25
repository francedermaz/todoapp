import axios from 'axios';

export function loginUser(payload) {
    return async function (dispatch) {
        let req = await axios.post("http://localhost:3001/auth/signIn/",payload);
        return dispatch({
            type: "LOGIN_USER",
            payload: req.data,
        });
    };
}
  
export function logoutUser() {
    return async function (dispatch) {
        return dispatch({
            type: "LOG_OUT_USER",
        });
    };
}
  
export function createUser(payload) {
    return async function (dispatch) {
        let req = await axios.post("http://localhost:3001/auth/signUp",payload);
        return dispatch({
            type: "CREATE_USER",
            payload: req.data,
        });
    };
}