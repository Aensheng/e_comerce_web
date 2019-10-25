import React, { useState } from 'react'
import { connect } from 'react-redux'

import './sign-in.styles.scss'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'


const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email:'', password:'' })
    const { email, password } = userCredentials

    const handleSubmit = async event => {
        event.preventDefault()

        emailSignInStart( email, password )
    }

    const handleChange = event => {
        const { name, value } = event.target

        setCredentials({...userCredentials, [name]:value })
    }

    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}> 
                <FormInput 
                    name='email' 
                    type='email' 
                    value={email} 
                    handleChange={handleChange} 
                    label='email' 
                    required/>
                <FormInput 
                    name='password' 
                    type='password' 
                    value={password} 
                    handleChange={handleChange} 
                    label='password'
                    required/>
                <div className='buttons'>
                    <CustomButton type='submit' >Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                        Sign In With Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: ( email, password ) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn)