-- Transform string to number
function CoordsAsNumber(input, name)
    local coord = tonumber(input) + .0
    local label = ' ' .. name or ''

    if coord == nil then
        print('Error:', 'TB0002', 'Invalid coordinate', label)
        return
    end

    return coord
end

-- Teleport to 0, 0 or custom coordinate
-- TODO Sometimes doesn't load ground and I don't know why
function Teleport(source, args)
    local ped = PlayerPedId()
    local x, y, z = .0, .0, 71.0

    if args and args[1] then
        x = CoordsAsNumber(args[1], x)
    end

    if args and args[2] then
        y = CoordsAsNumber(args[2], y)

    end

    if args and args[3] then
        z = CoordsAsNumber(args[3], z)
    end

    -- Load terrian before getting ground Z
    SetFocusPosAndVel(x, y, z, 0.0, 0.0, 0.0)

    Citizen.CreateThread(function()
        local canGetGround, groundZ = GetGroundZFor_3dCoord(x, y, z, false)

        while canGetGround == false do
            Wait(0)
            z = z + 10
            canGetGround, groundZ = GetGroundZFor_3dCoord(x, y, z, false)
        end

        if canGetGround then
            z = groundZ
        end

        SetEntityCoords(ped, x, y, z, false, false, false, false)

        ClearFocus() -- is this working?    
    end)
end
RegisterCommand('tp', Teleport, false)

exports('tp', Teleport)

