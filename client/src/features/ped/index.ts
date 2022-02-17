import { MAX_EXECUTION, MP_F_FREEMODE, MP_M_FREEMODE } from "../../constants";

/**
 * Spawns the new ped model and releases it from memory
 * @param pedModel The ped model hash
 */
const spawn = (pedModel: number) => {
  SetPlayerModel(PlayerId(), pedModel);
  SetPedDefaultComponentVariation(PlayerPedId());
  SetModelAsNoLongerNeeded(pedModel);
};

/**
 * Loads the ped into memory
 * @param pedName The ped name
 * @returns void
 */
const request = (pedName: string) => {
  const pedModel = GetHashKey(pedName);
  if (!IsModelInCdimage(pedModel) || !IsModelAPed(pedModel)) return;
  RequestModel(pedModel);
  const startTime = Date.now();
  const tick = setTick(() => {
    if (HasModelLoaded(pedModel)) {
      spawn(pedModel);
      clearTick(tick);
    }
    if (Date.now() - startTime > MAX_EXECUTION) clearTick(tick);
    Wait(0);
  });
};

/**
 * Sets ped model based on args
 * @param source The source
 * @param args The args
 * @returns void
 */
export const ped = (source: number, args?: [string]) => {
  if (!args) return request(MP_M_FREEMODE);
  const [name] = args;
  let pedName = "";
  switch (name) {
    case "f":
    case "female":
      pedName = MP_F_FREEMODE;
      break;
    case "m":
    case "male":
      pedName = MP_M_FREEMODE;
      break;
    default:
      pedName = MP_M_FREEMODE;
      break;
  }
  request(pedName);
};
