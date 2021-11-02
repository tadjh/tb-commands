function GetCoords(source, args)
    local playerCoords = GetEntityCoords(PlayerPedId())
    local text = (args[1] or 'coords') .. ' ' .. playerCoords
    print('coords: ' .. text)
end
RegisterCommand('coords', GetCoords, false)
