import { DEFAULT_COORDS_LABEL } from "./config";

/**
 * Gets the ped's current coordinates
 * @param _source The source (unused)
 * @returns void
 */
export function coords(_source: number) {
  const pedCoords = GetEntityCoords(PlayerPedId(), true);
  console.log(DEFAULT_COORDS_LABEL, ...pedCoords);
}
