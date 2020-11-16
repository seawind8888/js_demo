Array.prototype.unique = function() {
    return [...new Set(this)]
}

[1,2,3,1].sort().unique()