function y = threeSum(nums)
    a = sort(nums);
    n = length(a);
    y = {};
    i = 1;
    while i <= n - 2
        if a(i) > 0
            break;
        end
        if i > 1 && a(i) == a(i - 1)
            i = i + 1;
            continue;
        end
        j = i + 1;
        k = n;
        while j < k
            x = a(i) + a(j) + a(k);
            if x < 0
                j = j + 1;
            elseif x > 0
                k = k - 1;
            else
                y{end + 1} = [a(i), a(j), a(k)];
                j = j + 1;
                k = k - 1;
                while j < k && a(j) == a(j - 1)
                    j = j + 1;
                end
                while j < k && a(k) == a(k + 1)
                    k = k - 1;
                end
            end
        end
        i = i + 1;
    end
end
