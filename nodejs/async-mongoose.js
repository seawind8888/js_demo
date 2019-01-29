function asyncMongo({model = '', method = '', key = {}, value = {}, options = {}}) {
    if(!model) {console.log('[asyncMongo] not set mongo mondel');return}
    if(!method) {console.log('[asyncMongo] not set mongo mondel methods');return}

    return new Promise((resolve, reject) => {
        model[method](key, value ,options,(err,doc) => {
            if(err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

module.exports = asyncMongo