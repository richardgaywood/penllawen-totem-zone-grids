export const CONSTANTS = {
    moduleName: "penllawen-totem-zone-grids",
    modulePath: "modules/penllawen-totem-zone-grids/",
    debug: true,
    totemTileFlagName: 'isTotemTile'
};

/**
 * @param  {...any} stuff to log
 */
export function log(...args) {
    if (!CONSTANTS.debug) return;
    console.log(CONSTANTS.moduleName, '|DOCG|', ...args);
}
