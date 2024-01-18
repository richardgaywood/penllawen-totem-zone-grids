import {TotemSceneConfig} from "./TotemSceneConfig.mjs";
import {CONSTANTS, log} from "./common.mjs";


export class TotemZones {
    static drawGrid() {
        const scene = canvas?.scene;
        if (!scene) return;

        if (TotemZones.sceneHasManagedTiles())
            // do not overdraw existing config
            return;

        const config = TotemSceneConfig.readFromSceneOrDefaults();

        // const flagName = `flags.${CONSTANTS.moduleName}.${CONSTANTS.totemTileFlagName}`;

        const offSet = {
            x: (scene.dimensions.rect.width - scene.dimensions.sceneRect.width)/2,
            y: (scene.dimensions.rect.height - scene.dimensions.sceneRect.height)/2
        };

        log("Drawing grid with config", config);

        /** @type {object[]} */
        let tileData = [];

        let coords = {x:0, y:0};
        for (coords.x=0; coords.x < config.tileCount.x; coords.x++) {
            for (coords.y=0; coords.y < config.tileCount.y; coords.y++) {
                log(coords);
                const data = {
                    x: (coords.x * config.tileSize.x) + offSet.x,
                    y: (coords.y * config.tileSize.y)  + offSet.y,
                    width: config.tileSize.x,
                    height: config.tileSize.y,
                    texture: {src: config.emptyTexture},
                    // TODO: this is hacky and bad, is there a better way?
                    'flags.penllawen-totem-zone-grids.isTotemTile': true,
                    alpha: 0.6
                }
                tileData.push(data);
            }
        }
        canvas.scene.createEmbeddedDocuments('Tile', tileData);
    }

    static clearGrid() {
        /** @type {Scene} */
        const scene = canvas?.scene;
        if (!scene) return;

        /** @type {string[]} */
        const toDelete = canvas.scene.tiles
            .filter(x => x.flags[CONSTANTS.moduleName]?.isTotemTile)
            .map(x => x.id);

        log(`Erasing ${toDelete.length} ToteM tiles`);

        if (toDelete.length > 0)
            canvas.scene.deleteEmbeddedDocuments("Tile", toDelete);
    }

    // static clickHandlerPaletteCycle(clickEvent) {
    //     log("In clickHandlerPaletteCycle", clickEvent);
    //     if (! (clickEvent?.interactionData?.object instanceof Tile)) return;
    //     const tileDoc = clickEvent?.interactionData?.object.document;

    /**
     * @param {TileDocument} tile
     */
    static cyclePalette(tile) {
        // const tileDoc = tile.document;
        if (! tile.getFlag(CONSTANTS.moduleName, CONSTANTS.totemTileFlagName)) return;

        const config = TotemSceneConfig.readFromSceneOrDefaults();

        let x = config.palette.findIndex(x => x === tile.texture.tint);

        log ("old x", x);
        if (x === -1) {
            x=0;
        } else {
            x++;
            if (x >= config.palette.length) x = 0;
        }
        log ("new x", x);

        // tile.document.texture.tint is a string, eg "#b73434"
        // tile.document.alpha is a string like "0.9"
        tile.update({texture: {tint: config.palette[x], src: config.filledTexture, alpha: 0.85}});
    }

    static tileIsManaged(tile) {
        if (tile.document.getFlag(CONSTANTS.moduleName, "isTotemTile"))
            return true;
    }

    static sceneHasManagedTiles() {
        const hasTiles = (canvas?.scene?.tiles
            .filter(x => x.flags[CONSTANTS.moduleName]?.isTotemTile)
            .length > 0);
        log ("sceneHasManagedTiles() ?", hasTiles);
        return hasTiles;

        /*
         (canvas?.scene?.tiles
             .filter(x => x.flags["penllawen-totem-zone-grids"]?.isTotemTile)
             .length > 0);
        */
    }
}