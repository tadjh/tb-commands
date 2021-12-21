import { DEFAULT_GROUND_Z, MAX_EXECUTION, STEP } from "../../constants";
import { debugDATA } from "../../utils";

//   const [hit, safeCoords] = GetSafeCoordForPed(x, y, z, true, 0) as [
//     boolean,
//     Vector3Tuple
//   ];
//   debugDATA(hit);

const tp = (x: number, y: number, z: number) => {
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
      tp(x, y, groundZ);
      clearTick(tick);
    }
    i += STEP;
    if (Date.now() - startTime > MAX_EXECUTION) clearTick(tick);
    Wait(0);
  });
};

export const teleport = (
  source: number,
  [inputX, inputY, inputZ]: [string, string, string]
) => {
  const x = inputX ? parseFloat(inputX) : 0.0;
  const y = inputY ? parseFloat(inputY) : 0.0;
  const z = inputZ ? parseFloat(inputZ) : DEFAULT_GROUND_Z;
  SetFocusPosAndVel(x, y, z, 0.0, 0.0, 0.0);
  findGround(x, y, z);
};
