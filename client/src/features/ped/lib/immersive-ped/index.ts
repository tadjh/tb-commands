export function ped(...data: any[]): VoidFunction {
  return globalThis.exports["immersive-ped"].ped(...data);
}

export function SetPedModel(
  model?: string,
  callback?: (ped: number) => void
): number {
  return globalThis.exports["immersive-ped"].SetPedModel(model, callback);
}
