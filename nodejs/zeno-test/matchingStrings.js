function matchingStrings(strings, queries) {
    let stack = []
    for(let i=0; i<queries.length; i++){
        let count=0;
        for(let j=0; j<strings.length; j++){
            if(queries[i] == strings[j]){
                count++;
            }
        }
        stack[i] = count;
    }
    return stack;
}
console.log(matchingStrings([ 'aba', 'baba', 'aba', 'xzxb' ],[ 'aba', 'xzxb', 'ab' ]))