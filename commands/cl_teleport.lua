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
    local x, y, z = .0, .0, 200.0

    if inputX then
        print(inputX)
        x = CoordsAsNumber(inputX, x)
    end

    if inputY then
        print(inputY)
        y = CoordsAsNumber(inputY, y)

    end

    if inputZ then
        print(inputZ)
        z = CoordsAsNumber(inputZ, z)
    end

    -- Load terrian before getting ground Z
    SetFocusPosAndVel(x, y, z, 0.0, 0.0, 0.0)

    local canGetGround, groundZ = GetGroundZFor_3dCoord(x, y, z, true)

    if canGetGround then
        z = groundZ
    end

    SetEntityCoords(ped, x, y, z, false, false, false, false)

    ClearFocus() -- is this working?
end
RegisterCommand('tp', GoToCoords, false)
