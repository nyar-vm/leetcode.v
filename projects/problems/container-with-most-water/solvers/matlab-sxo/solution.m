function y = maxArea(height)
    l = 1;
    r = length(height);
    y = 0;
    while l < r
        t = min(height(l), height(r)) * (r - l);
        y = max(y, t);
        if height(l) < height(r)
            l = l + 1;
        else
            r = r - 1;
        end
    end
end
