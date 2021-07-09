import React from 'react';

interface BabylonContextValue {
  scene?: BABYLON.Scene;
  setScene: (scene: BABYLON.Scene) => void;
  uiCanvas?: BABYLON.GUI.AdvancedDynamicTexture;
  setUiCanvas: (scene: BABYLON.Scene) => void;
}

export const BabylonContext = React.createContext<BabylonContextValue>(
  {} as BabylonContextValue,
);

export const useBabyloneContext = (): BabylonContextValue =>
  React.useContext<BabylonContextValue>(BabylonContext);
