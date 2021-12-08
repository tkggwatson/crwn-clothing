import React from 'react';

import {
    MenuItemContainer,
    BackgroundImage,
    ContentContainer,
    ContentTitle,
    ContentSubtitle,
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => (
    <MenuItemContainer size={size} to={linkUrl}>
        <BackgroundImage className='background-image' imageUrl={imageUrl} />
        <ContentContainer className='content'>
            <ContentTitle>{title.toUpperCase()}</ContentTitle>
            <ContentSubtitle>SHOP NOW</ContentSubtitle>
        </ContentContainer>
    </MenuItemContainer>
);

export default MenuItem;
