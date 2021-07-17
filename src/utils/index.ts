type MaterialProperty = Partial<BABYLON.StandardMaterial>;

export function updateMaterial(
  name: string,
  material: MaterialProperty,
  scene: BABYLON.Scene,
) {
  const mat = scene.getMeshByName(name);
  if (mat) {
    Object.keys(material).forEach((k) => {
      //@ts-ignore
      mat[k] = material[k];
    });
  }
}

//仅仅查找自己的子节点
function findChildMeshes(
  node: BABYLON.Node | BABYLON.Mesh,
  path: string,
): BABYLON.AbstractMesh[] | undefined {
  const pathSplit = path.split('/');
  if (pathSplit.length === 1) {
    return node.getChildMeshes(true, (n) => n.name === path);
  } else {
    const nextPath = pathSplit.slice(1).join('/');
    const meshes = node.getChildMeshes(true, (n) => n.name === path[0]);
    if (meshes.length > 0) {
      meshes.forEach((mesh) => {
        const findMeshes = findChildMeshes(mesh, nextPath);
        if (findMeshes && findMeshes.length > 0) {
          return findMeshes;
        }
      });
    } else {
      return undefined;
    }
  }
}

//深度优先
export function findByPath(
  scene: BABYLON.Scene,
  path: string,
  root?: BABYLON.Node | BABYLON.Mesh,
): BABYLON.AbstractMesh | null {
  if (root) {
    const meshes = findChildMeshes(root, path);
    return meshes && meshes.length > 0 ? meshes[0] : null;
  } else {
    const pathSplit = path.split('/');
    const nextPath = pathSplit.slice(1).join('/');
    const rootMesh = scene.getMeshByName(pathSplit[0]);

    if (pathSplit.length === 1) {
      return rootMesh;
    } else {
      const findMeshes = rootMesh && findChildMeshes(rootMesh, nextPath);
      return findMeshes && findMeshes.length > 0 ? findMeshes[0] : null;
    }
  }
}

//播放动画
export function startAnimation(
  scene: BABYLON.Scene,
  name: string,
  speed: number = 2,
  inverse?: boolean,
  from?: number,
  to?: number,
) {
  const animation = scene.getAnimationGroupByName(name);
  const aFrom = typeof from === 'number' ? from : animation?.from;
  const aTo = typeof to === 'number' ? to : animation?.to;
  if (inverse) {
    animation?.start(false, speed, aTo, aFrom);
  } else {
    animation?.start(false, speed, aFrom, aTo);
  }
}
