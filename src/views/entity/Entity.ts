import type { Mesh, LineSegments, Vector3 } from 'three'


export type MYMESH = Mesh | LineSegments;

export default class Entity {
  public mesh: MYMESH;
  constructor(mesh: MYMESH) {
    this.mesh = mesh
    mesh.castShadow = true
    mesh.receiveShadow = true
  }

  get position():Vector3 {
    return this.mesh.position
  }

  dispose() {
    this.mesh.geometry?.dispose()
    let material = this.mesh.material;
    if (!Array.isArray(material)) {
      material = [material];
    }
    material.forEach((item) => {
      item.dispose()
    })
  }
}
