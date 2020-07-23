function matchingStrings(strings, queries) {
    var countArray = [];
    for(var i=0; i<queries.length; i++){
        var count=0;
        for(var j=0; j<strings.length; j++){
            if(queries[i] == strings[j]){
                count++;
            }
        }
        countArray[i] = count;
    }
    return countArray;
}
console.log(matchingStrings(['aba','baba','aba','xzxb'],['aba','xzxb','ab']))