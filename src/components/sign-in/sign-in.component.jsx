import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

import { SignInContainer, SignInTitle, SignInButtons } from './sign-in.styles';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <SignInContainer>
                <SignInTitle>I already have an account</SignInTitle>
                <span>Sign in with your email and password</span>
                <form className='sign-in-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        label='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        label='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        required
                    />
                    <SignInButtons>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </SignInButtons>
                </form>
            </SignInContainer>
        );
    }
}

export default SignIn;
