function y = romanToInt(s)
    d = containers.Map({'I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000});
    n = strlength(s);
    y = d(s(n));
    for i = 1:(n - 1)
        a = d(s(i));
        b = d(s(i + 1));
        if a < b
            y = y - a;
        else
            y = y + a;
        end
    end
end
