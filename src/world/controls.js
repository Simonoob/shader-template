import { Pane } from 'tweakpane'
import * as THREE from 'three'
import Experience from '../experience'
import doggo from '/static/images/doggo.jpeg'
import guy from '/static/images/guy_profile.jpeg'

export default class Controls {
	constructor() {
		this.experience = new Experience()

		this.params = {
			speed: 1,
			blocks: 3,
			texture: guy,
		}

		this.experience.params = this.params

		this.pane = new Pane({
			title: 'Config',
		})

		this.addRotationStop()
		this.addRotationReset()
		this.addSpeedInput()
		this.addBlocksInput()
		this.addTextureInput()
	}

	addRotationStop() {
		this.pane
			.addButton({
				title: `Auto Rotation ${
					this.experience.camera.controls.autoRotate ? 'on' : 'off'
				}`,
			})
			.on('click', () => {
				this.experience.camera.controls.autoRotate =
					!this.experience.camera.controls.autoRotate
				this.pane.children[0].title = `Auto Rotation ${
					this.experience.camera.controls.autoRotate ? 'on' : 'off'
				}`
			})
	}

	addRotationReset() {
		this.pane
			.addButton({
				title: `Reset Rotation`,
			})
			.on('click', () => {
				this.experience.camera.controls.reset()
			})
	}

	addSpeedInput() {
		this.pane
			.addInput(this.params, 'speed', {
				step: 0.1,
				min: 0,
				max: 10,
				label: 'Speed',
			})
			.on('change', () => {
				this.experience.world.shaderMesh.material.uniforms.uSpeed.value =
					this.params.speed
			})
	}

	addBlocksInput() {
		this.pane
			.addInput(this.params, 'blocks', {
				step: 1,
				min: 1,
				max: 20,
				label: 'Squares',
			})
			.on('change', () => {
				this.experience.world.shaderMesh.material.uniforms.uBlocks.value =
					this.params.blocks
			})
	}

	addTextureInput() {
		this.pane
			.addInput(this.params, 'texture', {
				view: 'list',
				options: [
					{ text: 'Guy Profile', value: guy },
					{ text: 'Beautiful Doggo', value: doggo },
				],
				label: 'Texture',
			})
			.on('change', () => {
				const textureLoader = new THREE.TextureLoader()
				textureLoader.load(this.params.texture, texture => {
					this.experience.world.shaderMesh.material.uniforms.uTexture.value =
						texture
					this.experience.world.shaderMesh.material.uniforms.uTextureResolution.value =
						{
							x: texture.image.width,
							y: texture.image.height,
						}
				})
			})
	}
}
