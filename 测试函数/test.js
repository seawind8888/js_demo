function Pro() {
    return new Promise((resolve,reject) => reject(11))
}
// async function test() {
//     console.log('11')
//     try {
//         const res = await Pro()
//         console.log('[res]',res)
//     } catch (error) {
//        console.log('[error]',error) 
//     }
// }
// test()

Pro().then(res => console.log('[res]',res)).catch(error =>  console.log('[error]',error) )

