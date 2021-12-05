import React, { useState } from 'react';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        signUpStart(displayName, email, password);
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <SignUpContainer>
            <SignUpTitle>I do not have an account</SignUpTitle>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    name='displayName'
                    type='text'
                    label='display name'
                    value={displayName}
                    handleChange={handleChange}
                    required
                />
                <FormInput name='email' type='email' label='email' value={email} handleChange={handleChange} required />
                <FormInput
                    name='password'
                    type='password'
                    label='password'
                    value={password}
                    handleChange={handleChange}
                    required
                />
                <FormInput
                    name='confirmPassword'
                    type='password'
                    label='confirm password'
                    value={confirmPassword}
                    handleChange={handleChange}
                    required
                />
                <div className='buttons'>
                    <CustomButton type='submit'>Sign up</CustomButton>
                </div>
            </form>
        </SignUpContainer>
    );
};

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (displayName, email, password) => dispatch(signUpStart({ displayName, email, password })),
});

export default connect(null, mapDispatchToProps)(SignUp);
