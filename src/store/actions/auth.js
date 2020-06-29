import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout());
        }, expirationTime)
    }
}


//In here is the code that authenticates user
export const auth = (email, password, isSignUp) => {
    return dispatch=>{
        dispatch(authStart()); 
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }   

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4VQXraKSivVydizexhs9KKRtAEgJKBOs';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4VQXraKSivVydizexhs9KKRtAEgJKBOs'
        }
        axios.post(url, authData)
            .then(response=>{
                console.log(response.data);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err=>{
                dispatch(authFail(err.response.data.error))
            })
    }
}