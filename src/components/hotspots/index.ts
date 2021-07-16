import React from 'react';
import { Hotspot } from '../../types';
import { useBabyloneContext } from '../babylon-context';
import { findByPath } from '@/utils';
interface HotspotsProps {
  activeTags?: string[];
  data?: Hotspot[];
  onClick?: (key: string) => void;
}

const Hotspots: React.FC<HotspotsProps> = (props) => {
  const { activeTags = [], data, onClick } = props;
  const { babylon } = useBabyloneContext();
  const { scene, uiCanvas } = babylon;
  const initRef = React.useRef(false);
  const activeHotsopt = React.useMemo(
    () =>
      data &&
      data.filter((h) =>
        typeof h.tag === 'string' ? activeTags.indexOf(h.tag) > -1 : true,
      ),
    [data, activeTags],
  );
  console.log('activeHotsopt = ', activeHotsopt);

  React.useEffect(() => {
    if (!initRef.current && data && scene && uiCanvas) {
      data.forEach((hotspot) => {
        const target = findByPath(scene, hotspot.location as string);
        if (target) {
          const btn = BABYLON.GUI.Button.CreateSimpleButton(hotspot.key, '');
          btn.width = '24px';
          btn.height = '24px';
          btn.background = 'green';
          btn.onPointerUpObservable.add(function () {
            onClick?.(hotspot.key);
          });
          uiCanvas?.addControl(btn);
          btn.linkWithMesh(target);
        }
      });
    }
  }, [scene, uiCanvas, activeHotsopt]);

  return null;
};

export default Hotspots;
