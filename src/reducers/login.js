import { GET_USER, SET_LOGGEDIN, SET_PRO_USER_ID, SET_REDIRECT, SET_ROLE, SET_PRO_USER } from "../actions";
import { initialState } from "../store";

export const loginReducer = (state = initialState.login, action) => {
    switch (action.type) {
        case SET_LOGGEDIN:
            return {
                ...state,
                isloggedin: action.payload
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_ROLE:
            return {
                ...state,
                role: action.payload
            }
        case SET_REDIRECT:
            return {
                ...state,
                url: action.payload
            }    
        default:
            return state    
    }
}

export const proUserReducer = (state = initialState.prouser, action) => {
    switch(action.type) {
        case SET_PRO_USER_ID:
            return {
                ...state,
                prouserId: action.payload
            }
        case SET_PRO_USER:
            return {
                ...state,
                prouser: action.payload
            }
        default:
            return state
    }
}