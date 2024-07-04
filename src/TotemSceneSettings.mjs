import {CONSTANTS, log} from "./common.mjs";
import {TotemSceneConfig} from "./TotemSceneConfig.mjs";
import {TotemZones} from "./TotemZones.mjs";
// import {SWADE} from "./config";

export class TotemSceneSettings {
    // This code blatantly stolen from Zeel's 
    // https://github.com/zeel01/pin-fixer 
    
    static async renderSceneConfigHook(sceneConfig, html, data) {
		const ambItem = html.find(".item[data-tab=ambience]");
		const ambTab = html.find(".tab[data-tab=ambience]");
		ambItem.after(`<a class="item" data-tab="totem-zone-grids"><i class="fas fa-border-none"></i>TotemZones</a>`);
		ambTab.after(await this.getSceneHtml(TotemSceneConfig.readFromSceneOrDefaults()));
		this.attachEventListeners(html);
    }

    /**
	 * @param {TotemSceneConfig} config
	 * @return {string} The HTML to be injected
	 */
    static async getSceneHtml(config) {
		return await renderTemplate(`modules/${CONSTANTS.moduleName}/templates/sceneSettings.hbs`,
			config.data);
	}

    /**
     * @param {jQuery} html
     */
	static attachEventListeners(html) {
		// html.find('button[name="tgzMakeGrid"]').click((event => this.makeGridButton(event)));
	}

    static makeGridButton(event) {
        // TotemZones.drawGrid();
    }

	/**
	 * @param {SceneConfig} sceneConfig
	 * @param {jQuery} html
	 */
	static closeSceneConfigHook(sceneConfig, html) {
		let config = TotemSceneConfig.makeFromValues(
			html.find('input[name="tzgTileWidth"]').val(),
			html.find('input[name="tzgTileHeight"]').val(),
			html.find('input[name="tzgCountWidth"]').val(),
			html.find('input[name="tzgCountHeight"]').val(),
			'/assets/tiles/square-empty-dashed.svg',
			'/assets/tiles/square-white.svg',
			['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51']
		);

		config.saveToSceneFlagsIfNecessary();
		// console.log("made a config", config);
		// if (!TotemZones.sceneHasManagedTiles()) { // don't overdraw existing config
		// 	if (config.saveToSceneFlagsIfNecessary()) {
		// 		console.log("re-drawing grid");
		// 		TotemZones.clearGrid();
		// 		TotemZones.drawGrid();
		// 	}
		// }
	}




}