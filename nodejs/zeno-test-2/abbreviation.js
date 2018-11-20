function abbreviation(a, b) {
    var aArray
    var bArray
    var lowerIndex
    var upperIndex
    var hash = {}
    var letter
    aArray = a.split('', a.length)
    bArray = a.split('', b.length)
    for (var i = 0; i < bArray.length; i++) {
        for (var j = 0; j < aArray.length; j++) {
            
            lowerIndex = bArray[i].toLowerCase().indexOf(aArray[j])
            upperIndex = bArray[i].toUpperCase().indexOf(aArray[j])
            var keysArr = Object.keys(hash)
            if (lowerIndex >= 0) {
               
                if(!keysArr.length) {
                    hash[aArray[j]] = lowerIndex
                } else {
                    keysArr.forEach((e) => {
                        console.log('e',e)
                        if (e == aArray[j] && hash[e] == lowerIndex) {
    
                        } else {
                            hash[aArray[j]] = lowerIndex
                        }
                    })
                }
                

            }
            if (upperIndex >= 0) {
                if(!keysArr.length) {
                    hash[aArray[j]] = upperIndex
                } else {
                    keysArr.forEach((e) => {
                        if (e == aArray[j] && hash[e] == upperIndex) {
    
                        } else {
                            hash[aArray[j]] = upperIndex
                        }
                    })
                }
            }
        }

    }
    console.log(hash)
    return hash

}
abbreviation('bBccC', 'BBC')