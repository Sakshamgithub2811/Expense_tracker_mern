import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async(e) =>{
    console.log("saksham1");
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
  console.log("saksham2");

    if(!password){
      setError("Please enter the password");
      return;
    }
    console.log("saksham3");

    setError("");

    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });

      console.log("response",response.data);
      const {token, user} = response.data;


      if(token){
        localStorage.setItem("token",token);
        navigate("/dashboard");
      }

    }catch(error){
        if(error.response && error.response.data.message){

          setError(error.response.data.message);
          console.error(error);
        }else{
       
          setError("Something went wrong, Please try again");
        }
    }

    
  }
  
  return (
    <AuthLayout>
      <div className = "lg:w-[70%] h-3.4 md:h-full flex flex-col justify-center" >
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className=" text-xs text-slate-700 mt-1.25 mb-6">
          Please enter your details to login 
        </p>
        
        <form onSubmit={handleLogin}>
          <Input 
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input 
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="MIn 8 characters"
            type="text"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>



      </div>
    </AuthLayout>
  )
}

export default Login
