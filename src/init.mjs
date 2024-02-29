import {TotemSceneConfig} from './TotemSceneConfig.mjs';
import {TotemSceneSettings} from './TotemSceneSettings.mjs';
import {CONSTANTS, log} from './common.mjs';
import {TotemZones} from "./TotemZones.mjs";
import {TotemSceneControlButtons} from "./TotemSceneControlButtons.mjs";
// import SwadeCoreHooks from "./SwadeCoreHooks";

Hooks.once('init', function () {
    console.log(`DOCG | init-ing ${CONSTANTS.moduleName}`);

    loadTemplates(CONSTANTS.modulePath + "templates/sceneSettings.hbs");
});

Hooks.on("ready", () => { 
    log("Ready!");

    /** @type {TotemSceneConfig} */
    // let config = new TotemSceneConfig();

    // game.modules.get(CONSTANTS.moduleName).totmMap = TotmMap;

    // "click", x => TotemZones.clickHandlerPaletteCycle(x));
});


Hooks.on("renderSceneConfig", (...args) =>
    TotemSceneSettings.renderSceneConfigHook(...args));

// Hooks.on("closeSceneConfig", (...args) =>
//     TotemSceneSettings.closeSceneConfigHook(...args));

Hooks.on('getSceneControlButtons', TotemSceneControlButtons.getSceneControlButtonsHook);
Hooks.on('deactivateTilesLayer', TotemSceneControlButtons.onDeactivateTilesLayerHook);
// Hooks.on('controlTile', TotemSceneControlButtons.onControlTileHook);
Hooks.on('refreshTile', TotemSceneControlButtons.onRefreshTileHook);


Hooks.on('renderSceneControls', TotemSceneControlButtons.onRenderSceneControlsHook);



// log ("registering hook...");
// Hooks.on('controlTile', x => {console.log("caught hook!", x)});
// log ("done!");


// try {
    //   if (!game.modules.get('_dev-mode')?.enabled) return;

    //     const isDebugging = game.modules.get('_dev-mode')
    //         .api.getPackageDebugValue(CONSTANTS.moduleName);
    
    //     if (isDebugging) {
    //       console.log(CONSTANTS.moduleName, '|DOCG|', ...args);
    //     }
    //   } catch (e) {
    //     console.error("DOCG | Catastrophic logging failure", e);
    //   }

// import { TotmMap, TotmSettings } from './src/totm_map.mjs';
// import { TotemZonesSceneConfigure } from './src/totm_map.mjs';

    
// Hooks.once('devModeReady', function () {
//     console.log('in totem devModeReady');
//     game.modules.get('_dev-mode')?.api?.registerPackageDebugFlag(CONSTANTS.moduleName);
//     console.log('done totem devModeReady');
//     log("DevMode debug flag logging is enabled!");
// });