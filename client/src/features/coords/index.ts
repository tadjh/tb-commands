import { DEFAULT_COORDS_LABEL } from "../../constants";

export const coords = (source: number, [input]: [string]) => {
  const pedCoords = GetEntityCoords(PlayerPedId(), true);
  const text = `${input || DEFAULT_COORDS_LABEL} ${pedCoords}`;
  console.log(text);
};
