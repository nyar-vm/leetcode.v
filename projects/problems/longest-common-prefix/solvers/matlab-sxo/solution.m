function y = longestCommonPrefix(strs)
    first = strs{1};
    for i = 1:strlength(first)
        for j = 2:length(strs)
            if i > strlength(strs{j}) || first(i) ~= strs{j}(i)
                y = first(1:max(0, i - 1));
                return;
            end
        end
    end
    y = first;
end
