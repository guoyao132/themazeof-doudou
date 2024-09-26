import type { Mesh, LineSegments } from 'three'


type MYMESH = Mesh | LineSegments;

export default class Entity {
  public mesh: MYMESH;
  constructor(mesh: MYMESH) {
    this.mesh = mesh
    mesh.castShadow = true
    mesh.receiveShadow = true
  }

  get position() {
    return this.mesh.position
  }
}
