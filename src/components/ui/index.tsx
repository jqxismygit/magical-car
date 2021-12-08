import React from 'react';
import classnames from 'classnames';
import IconFont from '../icon-font';
import ViewImg from '../../assets/view.png';
import OverviewImg from '../../assets/overview.png';
import Barrage from 'barrage-ui';
import example from 'barrage-ui/example.json'; // 组件提供的示例数据
import { Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './index.less';

const mainMenus = [
  {
    type: 'scene',
    name: '场景',
    icon: 'icon-quanjingtu',
  },
  {
    type: 'color',
    name: '换色',
    icon: 'icon-color',
  },
] as const;

const sceneMenus = [
  {
    type: 'scene',
    icon: 'icon-scene',
  },
  {
    type: 'fenbu',
    icon: 'icon-danhaofenbutu',
  },
  {
    type: 'road',
    icon: 'icon-road',
  },
  {
    type: 'city',
    icon: 'icon-city',
  },
];

const colorMenus = [
  {
    type: 'color',
    startColor: '#FFDEE2',
    endColor: '#E37684',
  },
  {
    type: 'color2',
    startColor: '#C4E7F5',
    endColor: '#47A9D1',
  },
  {
    type: 'color3',
    startColor: '#F8F4BE',
    endColor: '#E1D100',
  },
  {
    type: 'color4',
    startColor: '#D5E8E4',
    endColor: '#5DE9CD',
  },
  {
    type: 'color5',
    startColor: '#E2D7E9',
    endColor: '#BD88E2',
  },
  {
    type: 'color6',
    startColor: '#EDEDED',
    endColor: '#CBCBCB',
  },
  {
    type: 'color7',
    startColor: '#FEE9DF',
    endColor: '#FBBA9D',
  },
];

const UI: React.FC = () => {
  const barrageRef = React.useRef<any>(null);
  const barrageInstance = React.useRef<any>(null);
  const [showBrrage, setShowBrrage] = React.useState<boolean>(false);
  const [mainActive, setMainActive] = React.useState<string>();
  const [sceneActive, setSceneActive] = React.useState<string>();
  const [colorActive, setColorActive] = React.useState<string>();
  const [showViewPage, setShowViewPage] = React.useState<boolean>(false);
  const handleMainBtnClick = (type: string) => {
    setMainActive(type);
  };

  const handleSceneBtnClick = (type: string) => {
    setSceneActive(type);
  };

  const handleColorBtnClick = (type: string) => {
    setColorActive(type);
  };

  React.useEffect(() => {
    barrageInstance.current = new Barrage({
      container: barrageRef.current, // 父级容器
      data: example, // 弹幕数据
      config: {
        // 全局配置项
        duration: 20000, // 弹幕循环周期(单位：毫秒)
        defaultColor: '#fff', // 弹幕默认颜色
      },
    });

    // // 新增一条弹幕
    // barrage.add({
    //   key: 'fctc651a9pm2j20bia8j', // 弹幕的唯一标识
    //   time: 1000, // 弹幕出现的时间(单位：毫秒)
    //   text: '这是新增的一条弹幕', // 弹幕文本内容
    //   fontSize: 24, // 该条弹幕的字号大小(单位：像素)，会覆盖全局设置
    //   color: '#0ff', // 该条弹幕的颜色，会覆盖全局设置
    // });

    // // 播放弹幕
    // barrage.play();
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <div
        ref={barrageRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          visibility: showBrrage ? 'visible' : 'hidden',
          // display: showBrrage ? 'block' : 'none',
        }}
      ></div>
      <div className={classnames(styles.mainWrap)}>
        {mainMenus.map(({ type, name, icon }, idx) => (
          <div
            className={classnames(
              styles.mainBtn,
              mainActive === type && styles.active,
            )}
            key={type}
            style={{ marginLeft: idx > 0 ? 30 : 0 }}
            onClick={() => handleMainBtnClick(type)}
          >
            <IconFont type={icon} style={{ marginRight: 4 }} />
            {name}
          </div>
        ))}
      </div>
      {mainActive === 'scene' && (
        <div
          className={classnames(styles.mainWrap)}
          style={{ bottom: '120px', height: 70 }}
        >
          {sceneMenus.map(({ type, icon }, idx) => (
            <div
              className={classnames(
                styles.sceneBtn,
                sceneActive === type && styles.active,
              )}
              key={type}
              style={{ marginLeft: idx > 0 ? 27 : 0 }}
              onClick={() => handleSceneBtnClick(type)}
            >
              <IconFont type={icon} />
            </div>
          ))}
        </div>
      )}

      {mainActive === 'color' && (
        <div
          className={classnames(styles.mainWrap)}
          style={{ bottom: '120px', height: 70 }}
        >
          {colorMenus.map(({ type, startColor, endColor }, idx) => (
            <div
              className={classnames(
                styles.colorBtn,
                colorActive === type && styles.active,
              )}
              key={type}
              style={{
                marginLeft: idx > 0 ? 43 : 0,
                background: `linear-gradient(145deg, ${startColor} 0%, ${endColor} 100%)`,
              }}
              onClick={() => handleColorBtnClick(type)}
            ></div>
          ))}
        </div>
      )}

      <img
        className={styles.viewBtn}
        style={{ left: '30px' }}
        src={OverviewImg}
      />
      <img
        className={styles.viewBtn}
        style={{ right: '30px' }}
        src={ViewImg}
        onClick={() => setShowViewPage(true)}
      />
      <span className={styles.barrage}>
        <Switch
          style={{ marginRight: 8 }}
          onChange={(checked) => {
            if (barrageInstance.current) {
              if (checked) {
                barrageInstance.current.play();
              } else {
                barrageInstance.current.pause();
              }
              setShowBrrage(!!checked);
            }
          }}
        />
        弹幕
      </span>

      {showViewPage && (
        <div className={styles.viewPage}>
          <CloseOutlined
            className={styles.close}
            onClick={() => setShowViewPage(false)}
          />
          <div className={styles.img}></div>
          <div style={{ marginTop: 15 }}>
            <IconFont
              type={'icon-danhaofenbutu'}
              style={{ marginRight: 4, color: '#DD8080', fontSize: 24 }}
            />
            <span className={styles.title}>科技前灯</span>
          </div>
          <div className={styles.divide} />

          <div className={styles.desc}>体现年前运动的先锋体验</div>
        </div>
      )}
    </div>
  );
};

export default UI;