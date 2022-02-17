import { DEFAULT_COORDS_LABEL } from "../../constants";
import { debugDATA } from "../../utils";

/**
 * Gets the ped's current coordinates
 * @param source The source
 * @returns void
 */
export const coords = (source: number) => {
  const pedCoords = GetEntityCoords(PlayerPedId(), true);
  debugDATA(DEFAULT_COORDS_LABEL, pedCoords);
};
