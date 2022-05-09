import { DEFAULT_COORDS_LABEL } from "./config";
import { debugDATA } from "../../utils";

/**
 * Gets the ped's current coordinates
 * @param _source The source (unused)
 * @returns void
 */
export function coords(_source: number) {
  const pedCoords = GetEntityCoords(PlayerPedId(), true);
  debugDATA(DEFAULT_COORDS_LABEL, pedCoords);
}
