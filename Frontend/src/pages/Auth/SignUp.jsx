import React from 'react';
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async(e) => {

    e.preventDefault();

    let profileImageUrl = " ";

    if(!fullName){
      setError('please enter your name');
      return;
    }
    if(!validateEmail(email)){
      setError('please enter a valid email address');
      return;
    }
 
    if(!password){
      setError('please enter your password');
      return;
    }

    setError("");




  }
  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10  md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black"> Create an Account</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">Join us today by entering your details below.</p>
        <form onSubmit={handleSignUp}>
          <div className="flex justify-center mb-6">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="MIn 8 characters"
                type="text"
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an Account ?{" "}
            <Link className="font-medium text-primary underline" to="/login">
                LOGIN
            </Link>
          </p>
        </form>


      </div>
    </AuthLayout>
  )
}

export default Signup
