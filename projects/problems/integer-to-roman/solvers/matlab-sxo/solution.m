function y = intToRoman(num)
    vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    syms = {'M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'};
    n = num;
    y = '';
    for k = 1:length(vals)
        while n >= vals(k)
            y = [y, syms{k}];
            n = n - vals(k);
        end
    end
end
