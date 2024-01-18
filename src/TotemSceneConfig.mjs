import { CONSTANTS, log } from "./common.mjs";

/**
 * @typedef TotemSceneConfig
 * @property {boolean} enable - Whether or not the module is enabled for the given scene
*/
export class TotemSceneConfig {
	get enabled() { return Boolean(canvas.scene.getFlag(CONSTANTS.moduleName, "enabled")); }
	/** @param{Boolean} value */
	set enabled(value) { canvas.scene.setFlag(CONSTANTS.moduleName, value); }

	/** @type {object} */
	#data;
	get data() { return this.#data }
	set data(data) { this.#data = data; }

	get tileCount() { return {x: this.#data.countWidth, y: this.#data.countHeight} }
	get tileSize() { return {x: this.#data.tileWidth, y: this.#data.tileHeight} }

	/** @returns {string[]} */
	get palette() { return this.#data.palette }

	/** @returns {string} */
	get filledTexture() { return this.#data.filledTexture }

	/** @returns {string} */
	get emptyTexture() { return this.#data.emptyTexture }

	static _makeFromDefaults() {
		return TotemSceneConfig.makeFromValues(250, 250, 10, 6,
			'/assets/tiles/square-empty-dashed.svg',
			'/assets/tiles/square-white.svg',
			['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51']);
	}

	/** @return {TotemSceneConfig} */
	static makeFromValues(tW, tH, cW, cH, t1, t2, p) {
		const tsc = new TotemSceneConfig();
		tsc.data = {
			tileWidth: parseInt(tW),
			tileHeight: parseInt(tH),
			countWidth: parseInt(cW),
			countHeight: parseInt(cH),
			emptyTexture: t1,
			filledTexture: t2,
			palette: p
		};
		return tsc;
	}

	/**
	 * @return {TotemSceneConfig}
	 * @memberof {TotemSceneConfig}
	 * */
	static _makeFromData(data) {
		const tsc = new TotemSceneConfig();
		tsc.#data = data;
		return tsc;
	}

	/** @return {TotemSceneConfig} */
	static readFromSceneOrDefaults() {
		/** @type Scene */
		const scene = canvas.scene;

		if (scene.getFlag(CONSTANTS.moduleName, "tzgData")) {
			return TotemSceneConfig._makeFromData(scene.getFlag(CONSTANTS.moduleName, "tzgData"))
		} else {
			return TotemSceneConfig._makeFromDefaults();
		}
	}

	/**
	 * If this config object is different to the one currently stored in the scene, then
	 * overwrite that one with this.
	 *
	 * @returns {true} if the config was changed
	 */
	saveToSceneFlagsIfNecessary() {
		/** @type Scene */
		const scene = canvas.scene;

		if (scene.getFlag(CONSTANTS.moduleName, "tzgData") === this.#data) {
			return false;
		}

		scene.setFlag(CONSTANTS.moduleName, "tzgData", this.#data);
		return true;
	}
}


	/**
	 * Retrieves the current data for the scene being configured.
	 *
	 * @static
	 * @param {object} data - The data being passed to the scene config template
	 * @return {PinFixSettings}
	 * @memberof PinFixer
	 */
	// static getSceneTemplateData(hookData) {
	// 	const data = hookData.data?.flags?.pinfix || {
	// 		enable: false,
	// 		pinLocker: false,
	// 		zoomFloor: this.minCanvScale,
	// 		zoomCeil: this.maxCanvScale,
	// 		minScale: 1,
	// 		maxScale: 1,
	// 		hudScale: 1
	// 	}
	// 	data.sliders = ["zoomFloor", "zoomCeil", "minScale", "maxScale", "hudScale"]
	// 		.map(name => this.mapSliderData(data, name));

	// 	return data;
	// }