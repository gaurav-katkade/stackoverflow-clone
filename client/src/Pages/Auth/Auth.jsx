import React, { useState } from 'react'
import icon from "../../assets/icon.png"
import AboutAuth from './AboutAuth';
import './Auth.css'
const Auth = () => {
  const [isSignUp,setIsSignUp] = useState(false);

  const handleSwitch=()=>{
    setIsSignUp(!isSignUp)
  }
  return (
   <section className='auth-section'>
      {isSignUp && <AboutAuth/>}
      <div className='auth-container-2'>
        {
          !isSignUp && <img src={icon} alt='stack-overflow' className='login-logo'/>
        }
        <form>
          {
            isSignUp && 
              <label htmlFor='name'>
                <h4>Display Name</h4>
                <input type='text' name='name' id='name'/>
              </label>
          }
          <label htmlFor='email'>
              <h4>Email</h4>
              <input type='email' name='email' id='email'/>
          </label>
          <label htmlFor='password'>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <h4>Password</h4>
                  {!isSignUp && <h4 style={{fontSize:"13px",color:"#007ac6"}}>forgot password ?</h4>}
                </div>
              <input type='password' name='password' id='password'/>
              {isSignUp && <p>Password must contain at least eight<br></br> characters including at least 1 letter and number</p>}
          </label>
          {
            isSignUp && <label htmlFor='check'>
              <input type='checkbox' id='check' name='check'/>
               <p style={{fontSize:"13px"}}>Opt-in to receive occasional,<br/> product updates, user research invitations,<br/> company announcements, and digests.</p>
            </label>
          }
          <button className='auth-btn'>{isSignUp?"Sign up":"Log in"}</button>
          {
            isSignUp && <p style={{color:"#666767",fontSize:"13px"}}>
              By clicking "Sign up", you agree to our 
              <span style={{color:"#007ac6"}}> terms of <br/>service</span>, 
              <span style={{color:"#007ac6"}}> privacy policy</span> and 
              <span style={{color:"#007ac6"}}> cookie policy</span>
            </p>
          }
        </form>
        <p>
          {isSignUp?'already have an account':"Don't have account"}
          <button className='handle-switch-btn' onClick={handleSwitch}>{isSignUp?"Login":"Sign Up"}</button>
        </p>
      </div>
   </section>
  )
}

export default Auth
