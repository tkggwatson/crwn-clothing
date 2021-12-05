import React, { useState } from 'react';
import { connect } from 'react-redux';

import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { SignInContainer, SignInTitle, SignInButtons } from './sign-in.styles';

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
    const [userCredentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const { email, password } = userCredentials;

    const handleSubmit = (event) => {
        event.preventDefault();
        emailSignInStart(email, password);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <FormInput name='email' type='email' label='email' value={email} handleChange={handleChange} required />
                <FormInput
                    name='password'
                    type='password'
                    label='password'
                    value={password}
                    handleChange={handleChange}
                    required
                />
                <SignInButtons>
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </SignInButtons>
            </form>
        </SignInContainer>
    );
};

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
