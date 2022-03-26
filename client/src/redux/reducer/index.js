import jwt from "jsonwebtoken";

const initialState = {
    user:{},
    loggedIn:false,
    items:[],
    folders:[],
}

const rootReducer = (state=initialState,action)=>{
    switch(action.type){
        case "GET_ITEMS":
            return{...state,items:action.payload}
        case "GET_FOLDERS":
            return {...state,folders:action.payload}
        case "POST_ITEMS":
            return {...state}
        case "DELETE_ITEMS":
            return {...state}
        case "CREATE_FOLDER":
            return {...state}
        case "DELETE_FOLDER":
            return {...state}
        case "LOGIN_USER":
            if (action.payload.token) {
                const token = action.payload.token;
                const useraux = jwt.decode(token);
                const obj = useraux.user;
                const user = {
                    id: obj.id,
                    email: obj.email,
                    name: obj.name,
                    lastName: obj.lastName,
                };
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                return { ...state, user: user, loggedIn: true };
            } 
            else{
              return { ...state, user: {}, loggedIn: false };
            }
        case "LOG_OUT_USER":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return { ...state, user: {}, loggedIn: false };
        case "CREATE_USER":
            return { ...state };
        default: return state;
    }
}

export default rootReducer;