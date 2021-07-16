import React from 'react';
import { useBabyloneContext } from '../babylon-context';

const SceneExplorer = () => {
  const { babylon } = useBabyloneContext();
  const { scene } = babylon;
  React.useEffect(() => {
    function togglerDebugLayer() {
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide();
      } else {
        scene.debugLayer.show({
          overlay: true, //覆盖模式打开
        });
      }
    }
    document.addEventListener('keydown', function (event) {
      if (event.altKey && event.shiftKey && event.keyCode === 68) {
        togglerDebugLayer();
      }
    });
    // togglerDebugLayer();
  }, [scene]);
  return <></>;
};

export default SceneExplorer;
