function y = isValid(s)
    stk = {};
    pairs = ["()", "[]", "{}"];
    for i = 1:strlength(s)
        c = s(i);
        if c == '(' || c == '{' || c == '['
            stk{end + 1} = c;
        elseif isempty(stk) || ~any(strcmp(stk{end} + c, pairs))
            y = false;
            return;
        else
            stk(end) = [];
        end
    end
    y = isempty(stk);
end
