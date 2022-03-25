import * as actions from '../actions/index';

const initialState = {

}

const rootReducer = (state=initialState,action)=>{
    switch(action.type){
        case actions.GET_STH: return{
        }
        default: return state;
    }
}

export default rootReducer;