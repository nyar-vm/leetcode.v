% 阻塞：S-008 — 见 sxo-evolution references/capability-backlog.md
function out = twoSum(nums, target)
    n = length(nums);
    for i = 1:(n - 1)
        for j = (i + 1):n
            if nums(i) + nums(j) == target
                out = [i - 1, j - 1];
                return;
            end
        end
    end
    out = [];
end
