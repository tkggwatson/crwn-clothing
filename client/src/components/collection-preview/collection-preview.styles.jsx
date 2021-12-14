import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    @media screen and (max-width: 800px) {
        align-items: center;
    }
`;

export const Title = styled.h1`
    font-size: 38px;
    margin: 0 auto 25px;

    &:hover {
        color: grey;
        cursor: pointer;
    }
`;

export const PreviewContainer = styled.div`
    display: flex;
    justify-content: space-between;

    & > div {
        margin-bottom: 30px;
    }
    
    @media screen and (max-width: 800px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
    }
`;
