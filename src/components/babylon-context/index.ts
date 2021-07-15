import React from 'react';

export interface BabylonData {
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;
  uiCanvas: BABYLON.GUI.AdvancedDynamicTexture;
}
interface BabylonContextValue {
  babylon: BabylonData;
  setBabylon?: (babylon: BabylonData) => void;
}

export const BabylonContext = React.createContext<BabylonContextValue>(
  {} as BabylonContextValue,
);

export const useBabyloneContext = (): BabylonContextValue =>
  React.useContext<BabylonContextValue>(BabylonContext);
