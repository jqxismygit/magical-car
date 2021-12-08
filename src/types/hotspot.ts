export interface Hotspot {
  key: string;
  tag?: string; //热点的标签
  location: string | BABYLON.Vector3; //于热点关联的3D对象ID或者是一个3D坐标
  image: string;
}
