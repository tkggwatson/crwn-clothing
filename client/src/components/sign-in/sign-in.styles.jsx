import styled from 'styled-components';

export const SignInContainer = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 800px) {
        width: 90vw;
        margin-bottom: 30px;
    }
`;

export const SignInTitle = styled.h2`
    margin: 10px 0;
`;

export const SignInButtons = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 5px;

    @media screen and (max-width: 800px) {
        display: grid;
        grid-gap: 5px;
    }
`;
