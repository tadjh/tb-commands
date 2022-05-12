import {
  DEFAULT_COORDS,
  MAX_EXECUTION,
  SHOULD_IGNORE_WATER,
  STEP,
} from "./config";
import { Args } from "../../types";
import { debugDATA, isEmpty } from "../../utils";
import { parseArgs } from "./utils";

const teleport = (x: number, y: number, z: number) => {
  SetEntityCoords(PlayerPedId(), x, y, z, false, false, false, false);
  ClearFocus();
  if (IsScreenFadedOut()) {
    DoScreenFadeIn(500);
  }
  debugDATA(`Teleported to ${x}, ${y}, ${z}.`);
};
const beforeTeleport = (x: number, y: number, z: number) => {
  DoScreenFadeOut(500);
  const tick = setTick(() => {
    if (!IsScreenFadedOut()) {
      Wait(0);
    } else {
      SetFocusArea(x, y, z, 0.0, 0.0, 0.0);
      clearTick(tick);
    }
  });
};

const handleTeleport = (x: number, y: number, z: number) => {
  beforeTeleport(x, y, z);
  const startTime = Date.now();
  let i = 0;
  const tick = setTick(() => {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime > MAX_EXECUTION) return clearTick(tick);
    const [hit, groundZ] = GetGroundZFor_3dCoord(
      x,
      y,
      z + i,
      SHOULD_IGNORE_WATER
    );
    if (hit) {
      teleport(x, y, groundZ);
      return clearTick(tick);
    }
    i += STEP;
    Wait(0);
  });
};

function setDefault() {
  handleTeleport(...DEFAULT_COORDS);
}

export const tp = (_source: number, args: Args | []) => {
  if (isEmpty(args)) return setDefault();
  const nextCoords = parseArgs(args);
  handleTeleport(...nextCoords);
};
