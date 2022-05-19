export function ped(...data: any[]): void {
  return globalThis.exports["immersive-ped"].ped(...data);
}

export function SetPedModel(
  model?: string | number,
  shouldEmit?: boolean
): Promise<number> {
  return globalThis.exports["immersive-ped"].SetPedModel(model, shouldEmit);
}
