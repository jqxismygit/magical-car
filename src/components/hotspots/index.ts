import React from 'react';
import { Hotspot } from '../../types';
import { useBabyloneContext } from '../babylon-context';
import { findByPath } from '@/utils';
interface HotspotsProps {
  activeTags?: string[];
  data?: Hotspot[];
  onClick?: (key: string) => void;
}

interface HotspotMap {
  [key: string]: BABYLON.GUI.Button;
}

const Hotspots: React.FC<HotspotsProps> = (props) => {
  const { activeTags = [], data, onClick } = props;
  const { babylon } = useBabyloneContext();
  const { scene, uiCanvas } = babylon;
  const hotspotMapRef = React.useRef<HotspotMap>({});

  React.useEffect(() => {
    if (
      Object.keys(hotspotMapRef.current).length === 0 &&
      data &&
      scene &&
      uiCanvas
    ) {
      data.forEach((hotspot) => {
        const target = findByPath(scene, hotspot.location as string);
        if (target) {
          // const btn = BABYLON.GUI.Button.CreateSimpleButton(hotspot.key, '');
          const btn = BABYLON.GUI.Button.CreateImageOnlyButton(
            hotspot.key,
            hotspot.image,
          );
          btn.width = '42px';
          btn.height = '42px';
          // btn.background = 'green';
          btn.onPointerUpObservable.add(function () {
            onClick?.(hotspot.key);
          });
          btn.isVisible = false;
          uiCanvas?.addControl(btn);
          btn.linkWithMesh(target);
          hotspotMapRef.current[hotspot.key] = btn;
        }
      });
    }
    if (scene && uiCanvas && data) {
      data &&
        data
          .filter((h) =>
            typeof h.tag === 'string' ? activeTags.indexOf(h.tag) > -1 : true,
          )
          .forEach((h) => {
            const btn = hotspotMapRef.current[h.key];
            if (btn) {
              btn.isVisible = true;
            }
          });
    }
  }, [scene, uiCanvas, data, activeTags]);

  return null;
};

export default Hotspots;
