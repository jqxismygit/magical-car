import React from 'react';
import { Hotspot } from '../../types';
import { useBabyloneContext } from '../babylon-context';
interface HotspotsProps {
  data?: Hotspot[];
}

const Hotspots: React.FC<HotspotsProps> = (props) => {
  const { scene, uiCanvas } = useBabyloneContext();
  React.useEffect(() => {
    let button1: BABYLON.GUI.Button;
    if (scene) {
      button1 = BABYLON.GUI.Button.CreateSimpleButton('but1', 'Click Me');
      button1.width = '150px';
      button1.height = '40px';
      button1.color = 'white';
      button1.cornerRadius = 20;
      button1.background = 'green';
      button1.onPointerUpObservable.add(function () {
        alert('you did it!');
      });
      uiCanvas?.addControl(button1);
    }

    setTimeout(() => {
      if (scene) {
        button1.isVisible = false;
      }
    }, 3000);
  }, [scene]);

  return null;
};

export default Hotspots;
