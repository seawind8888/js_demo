var tree = {
    value: "-",
    left: {
        value: '+',
        left: {
            value: 'a',
        },
        right: {
            value: '*',
            left: {
                value: 'b',
            },
            right: {
                value: 'c',
            }
        }
    },
    right: {
        value: '/',
        left: {
            value: 'd',
        },
        right: {
            value: 'e',
        }
    }
}
let DFSList = []
function DFS(node) {
    DFSList.push(node.value)
    if(node.left) arguments.callee(node.left)
    if(node.right) arguments.callee(node.right)
}
DFS(tree)
console.log(DFSList)