/**
 * Gets the ped's current coordinates
 * @param _source The source (unused)
 * @returns void
 */
export function coords(_source: number) {
  console.log("coords", ...GetEntityCoords(PlayerPedId(), true));
}
