import Experience from '../experience'
import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'
import * as THREE from 'three'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.params = this.experience.params

		const geometry = new THREE.PlaneGeometry(1, 1)
		const material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: THREE.DoubleSide,
			uniforms: {
				uIntensity: { value: this.params.intensity },
			},
		})

		this.shaderMesh = new THREE.Mesh(geometry, material)
		this.scene.add(this.shaderMesh)
	}
}
