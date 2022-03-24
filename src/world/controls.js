import { Pane } from 'tweakpane'
import Experience from '../experience'

export default class Controls {
	constructor() {
		this.experience = new Experience()

		this.params = {
			intensity: 1,
		}

		this.experience.params = this.params

		this.pane = new Pane({
			title: 'Config',
		})

		this.addRotationInput()
		this.addIntensityInput()
	}

	addRotationInput() {
		this.pane
			.addButton({
				title: `Rotation ${
					this.experience.camera.controls.autoRotate ? 'on' : 'off'
				}`,
				label: 'Auto Rotation',
			})
			.on('click', () => {
				this.experience.camera.controls.autoRotate =
					!this.experience.camera.controls.autoRotate
				this.pane.children[0].title = `Rotation ${
					this.experience.camera.controls.autoRotate ? 'on' : 'off'
				}`
			})
	}

	addIntensityInput() {
		this.pane
			.addInput(this.params, 'intensity', {
				step: 0.1,
				min: 0,
				max: 2,
				label: 'Intensity',
			})
			.on('change', () => {
				this.experience.world.shaderMesh.material.uniforms.uIntensity.value =
					this.params.intensity
			})
	}
}
