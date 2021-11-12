function Ped(source, args)
    local pedName = 'mp_m_freemode_01'

    if args and args[1] then
        if args[1] == 'female' or args[1] == 'f' then
            pedName = 'mp_f_freemode_01'
        end
        if args[1] == 'male' or args[1] == 'm' then
            pedName = 'mp_m_freemode_01'
        end
    end

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
    SetPedDefaultComponentVariation(PlayerPedId())

    SetModelAsNoLongerNeeded(pedModel)
end

RegisterCommand('ped', Ped, false)

exports('ped', Ped)
