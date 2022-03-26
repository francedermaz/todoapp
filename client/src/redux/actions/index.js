import axios from 'axios';

export function getItems(userId,folderId) {
    let payload = {userId: userId, folderId:folderId}
    return async function (dispatch) {
        let req = await axios.post("http://localhost:3001/item/folder/",payload);
        return dispatch({
            type: "GET_ITEMS",
            payload: req.data,
        });
    };
}

export function getFolders(payload) {
    return async function (dispatch) {
        let req = await axios.get("http://localhost:3001/folder/"+payload);
        return dispatch({
            type: "GET_FOLDERS",
            payload: req.data,
        });
    };
}

export function postItem(payload) {
    return async function (dispatch) {
        let req = await axios.post("http://localhost:3001/item/",payload);
        return dispatch({
            type: "POST_ITEMS",
            payload: req.data,
        });
    };
}

export function deleteItem(payload) {
    return async function (dispatch) {
        let req = await axios.delete("http://localhost:3001/item/"+payload);
        return dispatch({
            type: "DELETE_ITEMS",
            payload: req.data,
        });
    };
}

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