function y = isPalindrome(x)
    if x < 0 || (x ~= 0 && mod(x, 10) == 0)
        y = false;
        return;
    end
    str = num2str(x);
    y = strcmp(str, str(end:-1:1));
end
