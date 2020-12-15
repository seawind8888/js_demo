const _changeList = [{ key: 'modules/big_turntable', name: '大转盘', value: '大转盘' },
{ key: 'cumulative_sign', name: '累计签到', value: '累计签到' },
{ key: 'modules/sign', name: '连续签到', value: '连续签到' }]

const __diffFiles = ['src/modules/big_turntable/model.js', 'src/modules/big_turntable/index.js',
    'src/modules/cumulative_sign/index.jsx']

let _arr = []
_changeList.forEach(e => {
    __diffFiles.forEach(d => {
        if (d.indexOf(e.key) >= 0) {
            _arr.push(e)
        }
    })
}).filter(e => )
console.log('[_arr]', _arr)