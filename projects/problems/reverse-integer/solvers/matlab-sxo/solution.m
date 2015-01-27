function y = reverse(x)
    mi = intmin('int32');
    mx = intmax('int32');
    n = x;
    y = 0;
    while n ~= 0
        if y < floor(mi / 10) + 1 || y > floor(mx / 10)
            y = 0;
            return;
        end
        rem = mod(n, 10);
        if n < 0 && rem > 0
            rem = rem - 10;
        end
        y = y * 10 + rem;
        n = floor((n - rem) / 10);
    end
end
