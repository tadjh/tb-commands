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
function GoToCoords(source, args)
    local inputX, inputY, inputZ = args[1], args[2], args[3]
    local ped = PlayerPedId()
    local x, y, z = .0, .0, 71.0

    if inputX then
        x = CoordsAsNumber(inputX, x)
    end

    if inputY then
        y = CoordsAsNumber(inputY, y)

    end

    if inputZ then
        z = CoordsAsNumber(inputZ, z)
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
RegisterCommand('tp', GoToCoords, false)
