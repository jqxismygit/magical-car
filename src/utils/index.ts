type MaterialProperty = Partial<BABYLON.StandardMaterial>;

export function updateMaterial(
  id: string,
  material: MaterialProperty,
  scene: BABYLON.Scene,
) {
  const mat = scene.getMaterialByID(id);
  if (mat) {
    Object.keys(material).forEach((k) => {
      //@ts-ignore
      mat[k] = material[k];
    });
  }
}
