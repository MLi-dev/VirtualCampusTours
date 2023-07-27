import * as THREE from 'three'

export const randomColor = (x, y, z) => {
  if (!x) {
    var r = Math.random(),
      g = Math.random(),
      b = Math.random()
    return new THREE.Color(r, g, b)
  } else {
    return new THREE.Color(x, y, z)
  }
}
