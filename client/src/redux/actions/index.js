import axios from 'axios';

export const GET_STH = 'GET STH';

export const getAll = () => {
    return async function (dispatch){
        let aux = await axios.get("http://localhost:3001/")
        return dispatch({
            type: GET_STH,
            payload: aux.data,
        })
    }
}