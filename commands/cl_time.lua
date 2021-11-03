-- Change time of day to Daytime or input an specific hour of day
function ChangeTime(source, args)
    local time = 12

    if not args[1] == nil then
        time = tonumber(args[1])
    end

    if time and (time < 0 or time > 23) then
        print('Invalid hour of day')
        return
    end

    NetworkOverrideClockTime(time, 0, 0);
end
RegisterCommand('time', ChangeTime, false)
