function ChangePed()
    local pedName = 'mp_m_freemode_01'
    local pedModel = GetHashKey(pedName)

    if not IsModelInCdimage(pedModel) or not IsModelAPed(pedModel) then
        TriggerEvent('chat:addMessage', {
            args = {'Ped model: ' .. pedName .. ' not found'}
        })
        return
    end

    RequestModel(pedModel)

    while not HasModelLoaded(pedModel) do
        Wait(0)
    end

    SetPlayerModel(PlayerId(), pedModel)
    SetPedComponentVariation(GetPlayerPed(-1), 0, 0, 0, 2)

    SetModelAsNoLongerNeeded(pedModel)
end

RegisterCommand('changeped', ChangePed, false)
