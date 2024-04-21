import * as api from '../api'

export const  fetchAllUsers =()=>async(dispatch)=>{
    try {
        const {data} = await api.fetchAllUsers()
        // console.log("🚀 ~ fetchAllUsers ~ {data:", data)
        
        dispatch({type:'FETCH_USERS',payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = (id,updateData)=>async(dispatch)=>{
    try {
        // console.log("we are reaching the aaction for update user")
        const {data} = await api.updateProfile(id,updateData)
        // console.log("actions->users.js->updateProfile",data)
        dispatch({type:'UPDATE_CURRENT_USER',payload:data})
    } catch (error) {
        console.log(error)
    }
}