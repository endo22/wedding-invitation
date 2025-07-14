import { useState } from 'react';

export const useOverlay = () => {
  const [overlayVisible, setOverlayVisible] = useState(true);

  const handleOverlayClick = () => {
    setOverlayVisible(false);
  };

  return {
    overlayVisible,
    handleOverlayClick
  };
};
