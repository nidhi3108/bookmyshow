import { axiosInstance } from ".";

//register
export const Registeruser= async (payload)=>{
  try{
    const response= await axiosInstance.post("/user/register", payload)
    return response.data
  }
  catch (err){
    console.log("err")
   return err;
  }
}



//login
export const Loginuser= async (payload)=>{
  try{
    const response= await axiosInstance.post("/user/login", payload)
    return response.data
  }
  catch (err){
    console.log("err")
   return err;
  }
}


//get current user
export const GetCurrentUser= async (payload)=>{
  try{
    const response= await axiosInstance.get("/user/get-current-user",{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return response.data;
  }
  catch (err){
    console.log("err")
    console.log(err)
   return err;
  }
}

