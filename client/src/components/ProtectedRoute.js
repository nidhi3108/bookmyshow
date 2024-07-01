import {message} from "antd"
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "../style/custom.css"
//api
import { GetCurrentUser } from '../apicalls/user';

//actions
import {SetUser} from "../redux/userSlice"
import {HideLoading, ShowLoading} from "../redux/loaderSlice"


export default function ProtectedRoute({children}){  //HOC
    console.log(children);
     //when we upadete the store whicheveh element is accessing the store use selector it will iform it right away tht value is updated
    const {user} = useSelector((state)=> state.users) 
    console.log(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
//
    const getpresentUser = async ()=>{
        try{
            dispatch(ShowLoading());  //show a loader
            const response =  await GetCurrentUser();  //make a api call wait for response to store it
            dispatch(HideLoading()) //as soon as  we get response we will hide the loader
            if(response.success){
                dispatch(SetUser(response.data))  //
            }
            else{
                dispatch(SetUser(null))
                message.error(response.message)
                localStorage.removeItem("token") //manulayy delete the token
                navigate("/login")
            }
        }
        catch (error){
            dispatch(HideLoading())
            dispatch(SetUser(null))
            message.error(error.message)

        }
    }

// execute after the rendering of page
    useEffect(()=>{
        if(localStorage.getItem("token"))
            {
                getpresentUser();

            }
            else{
                navigate("/login")
            }
    }, [])


return (
user && (
<div className="layout p-1">
    <div className="header bg-primary flex justify-between p-2">
<div>
    <h1 className="text-2xl text-white cursor-pointer">Book My Show {user.isAdmin? ("Admin"): ""}</h1>
</div>
<div className="bg-white p-1 flex gap-1">
    <i className="ri-shield-user-line text-primary mt-1"></i>
    <h1>{user.name}</h1>
    <i className="content mt-1 p-1"></i>
</div>
    </div>
    <div className="content mt-1 p-1">
        {children}
    </div>
</div>
))}