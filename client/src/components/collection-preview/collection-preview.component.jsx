import React from 'react';
import { useNavigate } from 'react-router';

import CollectionItem from '../collection-item/collection-item.component';

import { CollectionPreviewContainer, Title, PreviewContainer } from './collection-preview.styles';

const CollectionPreview = ({ title, items, routeName }) => {
    const navigate = useNavigate();
    return (
        <CollectionPreviewContainer>
            <Title
                onClick={() => {
                    navigate(routeName);
                }}
            >
                {title.toUpperCase()}
            </Title>
            <PreviewContainer>
                {items
                    .filter((item, idx) => idx < 4)
                    .map((item) => (
                        <CollectionItem key={item.id} item={item} />
                    ))}
            </PreviewContainer>
        </CollectionPreviewContainer>
    );
};

export default CollectionPreview;
