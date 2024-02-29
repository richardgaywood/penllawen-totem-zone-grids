import { CONSTANTS, log } from "./common.mjs";
import {TotemSceneConfig} from "./TotemSceneConfig.mjs";
import {TotemZones} from "./TotemZones.mjs";


export class TotemSceneControlButtons {
    /** @type {Boolean} */
    static #toolIsOn;

    static onDeactivateTilesLayerHook() {
        TotemSceneControlButtons.disableTool();
    }

    /**
     * @param {SceneControl[]} sceneControlButtons
     */
    static getSceneControlButtonsHook(sceneControlButtons) {
        log("In TotemSceneControlButtons.getSceneControlButtonsHook");

        const tile = sceneControlButtons.find((a) => a.name === 'tiles');

        tile.tools.push({
            name: 'control-totem-zones',
            title: 'Toggle colours of TOTeM zones',
            icon: 'fa-solid fa-border-none',
            onClick: () => TotemSceneControlButtons.toggleControlTool(canvas.scene),
        });

        tile.tools.push({
            name: 'draw-totem-zones',
            title: 'Draw TOTeM zones',
            icon: 'fa-regular fa-square-plus',
            onClick: () => TotemSceneControlButtons.drawTotemZones(canvas.scene),
        });

        tile.tools.push({
            name: 'clear-totem-zones',
            title: 'Clear TOTeM zones',
            icon: 'fa-solid fa-trash',
            onClick: () => TotemSceneControlButtons.removeTotemZones(canvas.scene),
        });
    }


    // /**
    //  * @param {Tile} tile
    //  * @param control
    //  */
    // static onControlTileHook(tile, control) {
    //     // log("in TotemSceneControlButtons.onControlTileHook");
    //     if (control && TotemSceneControlButtons.#toolIsOn && TotemZones.tileIsManaged(tile)) {
    //         log("detected TotemTile");
    //         TotemZones.cyclePalette(tile.document);
    //     }
    //     // tile.on("click", foo());
    // }


    /**
     * @param {SceneControls} sceneControls
     * @param {jQuery} html
     * @param {object} context
     */
    static onRenderSceneControlsHook(sceneControls, html, context) {
        log("in onRenderSceneControlsHook", sceneControls, html, context)
        // If user selects some other tool -- disable us!
        if (sceneControls.activeTool !== 'control-totem-zones') {
            TotemSceneControlButtons.disableTool();
        }


        // This is an attempt to merge two FA icons together, but it just looks ugly;
        // shelving this for now.
        //
        // NB: If Foundry ever supports Font Awesome SVG+JS in the future, then
        // `data-fa-transform="shrink-8"` might be an easier way to achieve this
        //
        // const clearButton = html.find("li[data-tool='clear-totem-zones']");
        // clearButton.children().remove();
        // clearButton.addClass('fa-stack');
        //
        // clearButton.append(
        //     // '<span className="fa-stack fa-2x">' +
        //     '<i class="fa-solid fa-border-none fa-stack-1x"></i>' +
        //     '<i class="fa-solid fa-trash fa-stack-0.5x" ></i>'
        //     // + '</span>'
        // );



    }


    // static onTileClick(tile) {
    //     if (TotemSceneControlButtons.#toolIsOn && TotemZones.tileIsManaged(tile)) {
    //         log("detected TotemTile");
    //         TotemZones.cyclePalette(tile.document);
    //     }
    // }

    static removeTotemZones(scene) {
        log("In TotemSceneControlButtons.removeTotemZones");
        TotemZones.clearGrid();
    }


    static drawTotemZones(scene) {
        log("In TotemSceneControlButtons.drawTotemZones");
        // TotemZones.clearGrid(); // should I clear before drawing?
        TotemZones.drawGrid();
    }


    static toggleControlTool(scene) {
        log("In TotemSceneControlButtons.toggleControlTool");
        if (TotemSceneControlButtons.#toolIsOn)
            TotemSceneControlButtons.disableTool();
        else
            TotemSceneControlButtons.enableTool()
    }

    static disableTool() {
        TotemSceneControlButtons.#toolIsOn = false;
    }

    static enableTool() {
        TotemSceneControlButtons.#toolIsOn = true;
    }

    // static leftClickHandler(clickEvent) {
    //     log("In TotemSceneControlButtons.leftClickHandler");
    //     if (TotemSceneControlButtons.#toolIsOn)
    //         TotemZones.clickHandlerPaletteCycle(clickEvent);
    // }

    // static rightClickHandler(clickEvent) {
    //     log("In TotemSceneControlButtons.rightClickHandler");
    //     // if (this.toolIsOn)
    //     //     TotemZones.clickHandlerPaletteCycle(clickEvent);
    // }

    /**
     * @param {Tile} tile
     * @param {object} context
     */
    static onRefreshTileHook(tile, context) {
        log("In TotemSceneControlButtons.onRefreshTileHook");

        if (tile.document.getFlag(CONSTANTS.moduleName, "isTotemTile")) {
            tile.on("click", clickEvent => {
                log("tile clicked", clickEvent);
                const tile = clickEvent.currentTarget;

                if (TotemSceneControlButtons.#toolIsOn && TotemZones.tileIsManaged(tile)) {
                    log("detected TotemTile");
                    TotemZones.cyclePalette(tile.document);
                }
            });


            // tile.mouseInteractionManager.callbacks
            // const foo = tile.mouseInteractionManager;
            // log("MIM is", foo);
            // tile.mouseInteractionManager.on("clickLeft", x => TotemSceneControlButtons.leftClickHandler(x));
            // tile.mouseInteractionManager.target.on("clickRight", x => TotemSceneControlButtons.rightClickHandler(x));
        }
    }


}


/* layer tool button addition; from core SWADE

  measuredTemplatePresets: [
    {
      data: { t: CONST.MEASURED_TEMPLATE_TYPES.CONE, distance: 9 },
      button: {
        name: constants.TEMPLATE_PRESET.CONE,
        title: 'SWADE.Templates.Cone.Long',
        icon: 'fa-solid fa-location-pin fa-rotate-90',
        visible: true,
        button: true,
        onClick: () => {
          SwadeMeasuredTemplate.fromPreset(constants.TEMPLATE_PRESET.CONE);
        },
      },
    },




   static onGetSceneControlButtons(sceneControlButtons: SceneControl[]) {
    //get the measured template tools
    const measure = sceneControlButtons.find((a) => a.name === 'measure')!;
    //add buttons
    const newTemplateButtons = SWADE.measuredTemplatePresets.map(
      (t) => t.button,
    );
    measure.tools.splice(measure.tools.length - 1, 0, ...newTemplateButtons);

    //get the tile tools
    const tile = sceneControlButtons.find((a) => a.name === 'tiles')!;
    //added the button to clear chase cards
    tile.tools.push({
      name: 'clear-chase-cards',
      title: 'SWADE.ClearChaseCards',
      icon: 'fa-solid fa-shipping-fast',
      onClick: () => chaseUtils.removeChaseTiles(canvas.scene!),
    });
  }


 */

