import Experience from '../experience'
import ShaderPlane from './shaderPlane'
import Floor from './floor'
import Environment from './environment'
import * as THREE from 'three'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		//wait for resources
		this.resources.on('resources_ready', () => {
			// this.floor = new Floor()
			// this.environment = new Environment()
			this.ShaderPlane = new ShaderPlane()

			this.scene.background = this.resources.items.environmentMapTexture
		})
	}

	update() {
		if (this.ShaderPlane) this.ShaderPlane.update()
	}
}
