import { CONSTANTS, log } from "../init.mjs";



export class TotemZonesSceneConfigure {
    // This code blatantly stolen from Zeel's 
    // https://github.com/zeel01/pin-fixer 
    
    static async renderSceneConfig(sceneConfig, html, data) {
        log("In my renderSceneConfig handler");
		const ambItem = html.find(".item[data-tab=ambience]");
		const ambTab  = html.find(".tab[data-tab=ambience]");
		ambItem.after(`<a class="item" data-tab="totem-zone-grids"><i class="fas fa-border-none"></i>TotemZones</a>`);
		// ambTab.after(await this.getSceneHtml(this.getSceneTemplateData(data)));
		ambTab.after(await this.getSceneHtml(undefined));
		// this.attachEventListeners(html);
    }

    /**
	 * The HTML to be added to the scene configuration in order to configure the module
	 *
	 * @param {TotemZonesSettings} settings - The settings of the scene being configured.
	 * @static
	 * @return {string} The HTML to be injected
	 * @memberof TotemZonesSceneConfigure
	 */
    static async getSceneHtml(settings) {

		// return await renderTemplate("modules/pin-fixer/sceneSettings.html", settings);
		return await renderTemplate(`modules/${CONSTANTS.moduleName}/templates/sceneSettings.hbs`);
	}

	// static attachEventListeners(html) {
	// 	const slideWrapper = html.find(".totem-zone-grids .range-slider-with-icons");
	// 	slideWrapper.find(".range-slider")
	// 		.change((event) => this.inputToInput(event, ".range-editor"));
	// 	slideWrapper.find(".range-editor")
	// 		.change((event) => this.inputToInput(event, ".range-slider"));
	// }

}



export class TotmMap {

    // static texture = '/assets/tiles/square-white.svg';
    // static blankTexture = '/assets/tiles/square-empty-dashed.svg';
    // // static tileSize = {x: 500, y: 500};
    // // static gridSize = {x: 6, y: 4};


    // // config = {tileSize: {x:500, y:500}, gridSize:{x:10, y:6}}
    // static drawGrid(config) { 

    //     const scene = canvas?.scene;
    //     if (!scene) return;

    //     // const flagName = `flags.${CONSTANTS.moduleName}.${CONSTANTS.totemTileFlagName}`;

    //     const offSet = {x: (scene.dimensions.rect.width - scene.dimensions.sceneRect.width)/2, 
    //                     y: (scene.dimensions.rect.height - scene.dimensions.sceneRect.height)/2};
        
    //     let tileData = [];

    //     let coords = {x:0, y:0};
    //     for (coords.x=0; coords.x < config.gridSize.x; coords.x++) {
    //         for (coords.y=0; coords.y < config.gridSize.y; coords.y++) {
    //             log(coords);
    //             const data = {
    //                 x: (coords.x * config.tileSize.x) + offSet.x,
    //                 y: (coords.y * config.tileSize.y)  + offSet.y,
    //                 width: config.tileSize.x,
    //                 height: config.tileSize.y,
    //                 texture: {src: config.blankTexture},
    //                 // TODO: change if this code leaves this module
    //                 'flags.swade-dev-scratchpad.isTotemTile': true,
    //                 alpha: 0.6
    //             }
    //             tileData.push(data);
    //         }
    //     }
    //     canvas.scene.createEmbeddedDocuments('Tile', tileData);
    // }




    // static palette = ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'];    
    // static clickHandlerPaletteCycle(clickEvent) {
    //     if (! (clickEvent?.interactionData?.object instanceof Tile)) return;
    //     const tileDoc = clickEvent?.interactionData?.object.document;
    //     log ("flag is", tileDoc.getFlag(CONSTANTS.moduleName, CONSTANTS.totemTileFlagName));
    //     if (! (tileDoc.getFlag(CONSTANTS.moduleName, CONSTANTS.totemTileFlagName) === true)) return;

    //     console.log(tileDoc);
    //     let x = TotmMap.palette.findIndex(x => x === tileDoc.texture.tint);
    //     console.log("x", x);

    //     if (x === -1) {
    //         x=0;
    //     } else {
    //         x++;
    //         if (x >= TotmMap.palette.length) x = 0;
    //     }
    //     console.log("x is now", x, TotmMap.palette[x]);
    //     // tile.document.texture.tint is a string, eg "#b73434"
    //     // tile.document.alpha is a string like "0.9"
    //     tileDoc.update({texture: {tint: TotmMap.palette[x], src: TotmMap.texture, alpha: 0.85}});
    // }


    // static textures = ['/assets/tiles/hex_green.svg',
    //     '/assets/tiles/hex_pink.svg',
    //     '/assets/tiles/hex_blue_grey.svg'];

    // static clickHandlerTextureSwap(clickEvent) {
    //     if (!(clickEvent?.interactionData?.object instanceof Tile)) return;
    //     const tileDoc = clickEvent?.interactionData?.object.document;
    //     console.log(tileDoc);

    //     let x = TotmMap.textures.findIndex(x => x === tileDoc.texture.src);
    //     x++;
    //     if (x >= TotmMap.textures.length) x = 0;

    //     tileDoc.update({texture: {src: TotmMap.textures[x]}});
    // }
}