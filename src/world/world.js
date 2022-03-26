import Experience from '../experience'
import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertex.glsl'
import * as THREE from 'three'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.params = this.experience.params

		const textureLoader = new THREE.TextureLoader()

		const geometry = new THREE.PlaneGeometry(1, 1)
		const material = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			side: THREE.DoubleSide,
			uniforms: {
				uTime: { value: this.experience.time.elapsed },
				uSurfaceResolution: {
					value: {
						x: geometry.parameters.width,
						y: geometry.parameters.height,
					},
				},
				uSpeed: { value: this.params.speed },
				uTexture: { value: undefined },
				uTextureResolution: {
					value: { x: 0, y: 0 },
				},
				uBlocks: { value: this.params.blocks },
			},
		})

		textureLoader.load(this.params.texture, texture => {
			material.uniforms.uTexture.value = texture
			material.uniforms.uTextureResolution.value = {
				x: texture.image.width,
				y: texture.image.height,
			}
		})

		this.shaderMesh = new THREE.Mesh(geometry, material)
		this.scene.add(this.shaderMesh)

		window.requestAnimationFrame(() => this.updateVaryingUniforms())
	}

	updateVaryingUniforms = () => {
		const uniforms = this.shaderMesh.material.uniforms

		uniforms.uTime.value = this.experience.time.elapsed

		window.requestAnimationFrame(() => this.updateVaryingUniforms())
	}
}
