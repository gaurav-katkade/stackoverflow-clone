import * as api from '../api'
import { setCurrentUser } from './currentUser'
export const signUp = (authData,navigate)=>async (dispatch)=>{
    try {
        const {data} = await api.signUp(authData)
        dispatch({type:'AUTH',data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}


export const login= (authData,navigate)=>async (dispatch)=>{
    try {
        const {data} = await api.logIn(authData)
        dispatch({type:'AUTH',data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const  forgotPassword =(data,navigate)=>async(dispatch)=>{
    try {
        const {email,mobile_no} = data;
        const {data} = await api.forgotPassword(email,mobile_no)
        navigate('/reset-password');
    } catch (error) {
        console.log(error);
    }
}

export const  resetPassword =(data)=>async(dispatch)=>{
    try {
        const {email,user_otp,new_password} = data;
        const {data} = await api.resetPassword(email,user_otp,new_password)
    } catch (error) {
        console.log(error);
    }
}