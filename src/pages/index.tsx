import React from 'react';
// import Barrage from 'barrage-ui';
// import example from 'barrage-ui/example.json'; // 组件提供的示例数据
// import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods

import { BabylonContext, BabylonData } from '../components/babylon-context';
import Hotspots from '../components/hotspots';
import SceneExplorer from '../components/scene-explorer';
import { startAnimation } from '@/utils';
import hotspots from './hotspot-config';
import UI from '../components/ui';
import styles from './index.less';

export default function IndexPage() {
  const canvasRef = React.useRef<any>(null);

  const [babylon, setBabylon] = React.useState<BabylonData>();
  React.useEffect(() => {
    // const canvas = document.getElementById('renderCanvas'); // Get the canvas element
    const engine = new BABYLON.Engine(canvasRef.current, true); // Generate the BABYLON 3D engine
    BABYLON.Animation.AllowMatricesInterpolation = true;

    // Add your code here matching the playground format
    const createScene = function () {
      const scene = new BABYLON.Scene(engine);

      //场景debugLayer
      // scene.debugLayer.show()

      // BABYLON.MeshBuilder.CreateBox('box', {});

      const camera = new BABYLON.ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        15,
        new BABYLON.Vector3(0, 0.5, 0),
        scene,
      );
      camera.attachControl(canvasRef.current, true);
      camera.attachControl(canvasRef, true, false, false); //禁止相机移动
      camera.lowerRadiusLimit = 4;
      camera.upperRadiusLimit = 6;
      camera.upperBetaLimit = Math.PI / 2;
      camera.pinchDeltaPercentage = 0.01; //捏合百分比
      camera.wheelDeltaPercentage = 0.01; //滚轮百分比

      const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(1, 1, 0),
        scene,
      );

      // 加载环境贴图
      const hdrTextureA = BABYLON.CubeTexture.CreateFromPrefilteredData(
        'Texture/A.env',
        scene,
      );
      // const hdrTextureB = BABYLON.CubeTexture.CreateFromPrefilteredData(
      //   'Texture/B.env',
      //   scene,
      // );
      // const hdrTextureC = BABYLON.CubeTexture.CreateFromPrefilteredData(
      //   'Texture/C.env',
      //   scene,
      // );
      // const hdrTextureD = BABYLON.CubeTexture.CreateFromPrefilteredData(
      //   'Texture/D.env',
      //   scene,
      // );
      scene.createDefaultSkybox(hdrTextureA);
      //关闭环境球显示
      // scene.getMeshByID('hdrSkyBox').setEnabled(false);

      return scene;
    };

    if (canvasRef.current) {
      const scene = createScene(); //Call the createScene function
      const uiCanvas =
        BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('uiCanvas');
      const CoT = new BABYLON.TransformNode('root');
      // Register a render loop to repeatedly render the scene
      engine.runRenderLoop(function () {
        scene.render();
      });

      async function initScene() {
        BABYLON.SceneLoader.ShowLoadingScreen = false;
        await Promise.all([
          BABYLON.SceneLoader.AppendAsync(
            'models/Porsche/',
            'Porsche911.gltf',
            scene,
          ).then((result) => {
            //调整模型大小
            const __root__ = scene.getMeshByID('__root__');
            __root__.scaling.x = 10;
            __root__.scaling.y = 10;
            __root__.scaling.z = 10;

            //调整材质
            /*             const Mat_Window = scene.getMaterialByID('Window');
            Mat_Window.alpha = 0.5;
            Mat_Window.transparencyMode = 3;
            Mat_Window.metallic = 1; */

            /*             const Mat_GlassClear = scene.getMaterialByID('GlassClear');
            Mat_GlassClear.alpha = 0.5;
            Mat_GlassClear.transparencyMode = 3;
            Mat_GlassClear.metallic = 1;
            Mat_GlassClear.roughness = 0; */

            //车漆材质
            const CSR2_CarPaint = scene.getMaterialByID('CSR2_CarPaint');
            CSR2_CarPaint.albedoColor = new BABYLON.Color3(0, 0, 0);
            CSR2_CarPaint.metallic = 1;
            CSR2_CarPaint.roughness = 0.3;
            CSR2_CarPaint.bumpTexture = new BABYLON.Texture(
              'models/CarPaint_Normal.png',
              scene,
            );
            CSR2_CarPaint.bumpTexture.coordinatesIndex = 1;
            CSR2_CarPaint.bumpTexture.vScale = 30;
            CSR2_CarPaint.bumpTexture.uScale = 30;

            CSR2_CarPaint.clearCoat.isEnabled = true;
            CSR2_CarPaint.clearCoat.intensity = 0.5;
          }),
          BABYLON.SceneLoader.AppendAsync(
            'models/',
            'Car_Hotspot.babylon',
            scene,
          ),
        ]);

        // 监测浏览器/画布调整大小事件
        window.addEventListener('resize', function () {
          engine.resize();
        });

        setBabylon({ scene, uiCanvas, engine });
      }

      initScene();
    }
  }, []);

  const handleHotspotClick = (k: string) => {
    console.log(k);
    if (k === 'OpenCarDoor_L') {
      babylon?.scene && startAnimation(babylon?.scene, 'AN_Door_L');
    } else if (k === 'OpenCarDoor_R') {
      babylon?.scene && startAnimation(babylon?.scene, 'AN_Door_R');
    }
  };

  return (
    <BabylonContext.Provider
      value={{ babylon: babylon as BabylonData, setBabylon }}
    >
      <canvas
        id="renderCanvas"
        touch-action="none"
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      ></canvas>

      {/* 所有的插件都条件渲染 */}
      {babylon && (
        <>
          <SceneExplorer />
          <Hotspots
            activeTags={['animation']}
            data={hotspots}
            onClick={handleHotspotClick}
          />
          {/* <UI /> */}
        </>
      )}
    </BabylonContext.Provider>
  );
}
