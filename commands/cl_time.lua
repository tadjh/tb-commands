-- Change time of day to Daytime or input an specific hour of day
function Time(source, args)
    local time = 12

    if args and args[1] then
        time = tonumber(args[1])
    end

    if (time < 0 or time > 23) then
        print('Invalid hour of day')
        return
    end

    NetworkOverrideClockTime(time, 0, 0);
end
RegisterCommand('time', Time, false)

exports('time', Time)
