import { DEFAULT_GROUND_Z, MAX_EXECUTION, STEP } from "../../config";
import { debugDATA } from "../../utils";

//   const [hit, safeCoords] = GetSafeCoordForPed(x, y, z, true, 0) as [
//     boolean,
//     Vector3Tuple
//   ];
//   debugDATA(hit);

const teleport = (x: number, y: number, z: number) => {
  const ped = PlayerPedId();
  SetEntityCoords(ped, x, y, z, false, false, false, false);
  ClearFocus();
  debugDATA(`Teleported to ${x}, ${y}, ${z}.`);
};

const findGround = (x: number, y: number, z: number) => {
  const startTime = Date.now();
  let i = STEP;
  const tick = setTick(() => {
    const [hit, groundZ] = GetGroundZFor_3dCoord(x, y, z + i, true);
    if (hit) {
      teleport(x, y, groundZ);
      clearTick(tick);
    }
    i += STEP;
    if (Date.now() - startTime > MAX_EXECUTION) clearTick(tick);
    Wait(0);
  });
};

const preload = (x: number, y: number, z: number) => {
  SetFocusPosAndVel(x, y, z, 0.0, 0.0, 0.0);
  findGround(x, y, z);
};

export const tp = (source: number, args?: [string, string, string]) => {
  if (!args) return preload(0.0, 0.0, DEFAULT_GROUND_Z);
  const [inputX, inputY, inputZ] = args;
  const x = inputX ? parseFloat(inputX) : 0.0;
  const y = inputY ? parseFloat(inputY) : 0.0;
  const z = inputZ ? parseFloat(inputZ) : DEFAULT_GROUND_Z;
  preload(x, y, z);
};
