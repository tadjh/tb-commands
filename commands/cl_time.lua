function ChangeTime(source, args)
    local time = args[1]
    print(args)
    if time and (time < 0 or time > 23) then
        print('Invalid hour of day')
        return
    end
    local hour = time or 0
    NetworkOverrideClockTime(hour, 0, 0);
end
RegisterCommand('time', ChangeTime, false)
