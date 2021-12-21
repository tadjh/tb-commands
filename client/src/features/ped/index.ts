import { MAX_EXECUTION, MP_F_FREEMODE, MP_M_FREEMODE } from "../../constants";

const spawn = (pedModel: number) => {
  SetPlayerModel(PlayerId(), pedModel);
  SetPedDefaultComponentVariation(PlayerPedId());
  SetModelAsNoLongerNeeded(pedModel);
};

export const ped = (source: number, [input]: [string]) => {
  let pedName = "";
  switch (input) {
    case "f":
    case "female":
      pedName = MP_F_FREEMODE;
      break;
    case "m":
    case "male":
      pedName = MP_M_FREEMODE;
      break;
    default:
      pedName = MP_F_FREEMODE;
      break;
  }
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
