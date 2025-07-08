import React from 'react';
import { AnimationStyles } from './animations';
import { OverlayStyles } from './overlay';
import { ProfileStyles } from './profile';

export const GlobalStyles: React.FC = () => (
  <>
    <AnimationStyles />
    <OverlayStyles />
    <ProfileStyles />
  </>
);
