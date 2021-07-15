import React from 'react';
// import Barrage from 'barrage-ui';
// import example from 'barrage-ui/example.json'; // 组件提供的示例数据
import { BabylonContext, BabylonData } from '../components/babylon-context';
import Hotspots from '../components/hotspots';
import SceneExplorer from '../components/scene-explorer';
import styles from './index.less';

export default function IndexPage() {
  const canvasRef = React.useRef<any>(null);
  const barrageRef = React.useRef<any>(null);
  const [babylon, setBabylon] = React.useState<BabylonData>();
  React.useEffect(() => {
    // const canvas = document.getElementById('renderCanvas'); // Get the canvas element
    const engine = new BABYLON.Engine(canvasRef.current, true); // Generate the BABYLON 3D engine

    // Add your code here matching the playground format
    const createScene = function () {
      const scene = new BABYLON.Scene(engine);

      BABYLON.MeshBuilder.CreateBox('box', {});

      const camera = new BABYLON.ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        15,
        new BABYLON.Vector3(0, 0, 0),
        scene,
      );
      camera.attachControl(canvasRef.current, true);
      const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(1, 1, 0),
        scene,
      );
      return scene;
    };

    if (canvasRef.current) {
      const scene = createScene(); //Call the createScene function
      const uiCanvas =
        BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('uiCanvas');

      // Register a render loop to repeatedly render the scene
      engine.runRenderLoop(function () {
        scene.render();
      });

      async function loadModels() {
        BABYLON.SceneLoader.ShowLoadingScreen = false;
        await Promise.all([
          BABYLON.SceneLoader.AppendAsync('models/', 'Car.babylon', scene),
          BABYLON.SceneLoader.AppendAsync(
            'models/',
            'Car_Hotspot.babylon',
            scene,
          ),
        ]);
      }

      loadModels();

      setBabylon({ scene, uiCanvas, engine });
    }
  }, []);

  // React.useEffect(() => {
  //   const barrage = new Barrage({
  //     container: barrageRef.current, // 父级容器
  //     data: example, // 弹幕数据
  //     config: {
  //       // 全局配置项
  //       duration: 20000, // 弹幕循环周期(单位：毫秒)
  //       defaultColor: '#fff', // 弹幕默认颜色
  //     },
  //   });

  //   // 新增一条弹幕
  //   barrage.add({
  //     key: 'fctc651a9pm2j20bia8j', // 弹幕的唯一标识
  //     time: 1000, // 弹幕出现的时间(单位：毫秒)
  //     text: '这是新增的一条弹幕', // 弹幕文本内容
  //     fontSize: 24, // 该条弹幕的字号大小(单位：像素)，会覆盖全局设置
  //     color: '#0ff', // 该条弹幕的颜色，会覆盖全局设置
  //   });

  //   // 播放弹幕
  //   barrage.play();
  // }, []);

  // React.useEffect(() => {
  //   function togglerDebugLayer() {
  //     var scene = engine.scenes[0];
  //     if (scene.debugLayer.isVisible()) {
  //       scene.debugLayer.hide();
  //     } else {
  //       scene.debugLayer.show({
  //         overlay: true, //覆盖模式打开
  //       });
  //     }
  //   }

  //   document.addEventListener('keydown', function (event) {
  //     if (event.altKey && event.shiftKey && event.keyCode === 68) {
  //       togglerDebugLayer();
  //     }
  //   });
  // }, []);

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
      {/* <div
        ref={barrageRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
        }}
      ></div> */}
      {/* 所有的插件都条件渲染 */}
      {babylon && (
        <>
          <SceneExplorer />
          <Hotspots />
        </>
      )}
    </BabylonContext.Provider>
  );
}
