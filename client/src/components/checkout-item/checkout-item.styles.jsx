import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
    width: 100%;
    display: flex;
    min-height: 100px;
    border-bottom: 1px solid darkgrey;
    padding: 15px 0;
    font-size: 20px;
    align-items: center;
`;

export const ImageContainer = styled.div`
    width: 23%;
    padding-right: 15px;

    img {
        width: 100%;
        height: 100%;
    }
`;

export const TextContainer = styled.span`
    width: 23%;
`;

export const QuantityContainer = styled(TextContainer)`
    display: flex;
`;

export const ArrowContainer = styled.div`
    cursor: pointer;
`;

export const ValueContainer = styled(TextContainer)`
    margin: 0 10px;
    text-align: center;

    @media screen and (max-width: 800px) {
        margin: 0 5px;
    }
`;

export const RemoveButton = styled.div`
    padding-left: 12px;
    cursor: pointer;
    text-align: right;
    width: 8%;

    @media screen and (max-width: 800px) {
        width: 12%;
    }
`;
