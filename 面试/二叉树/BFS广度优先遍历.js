
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
  let BFSList = []; 
  //定义保存广度遍历结果的数组
  function BFS(node) {
    if (node) { //判断二叉树是否为空
      let queue = [node]; //将二叉树放入队列
      while (queue.length !== 0) { //判断队列是否为空
        node = queue.shift(); //从队列中取出一个结点
        BFSList.push(node.value); //将取出结点的值保存到数组
        if (node.left) queue.push(node.left); //如果存在左子树，将左子树放入队列
        if (node.right) queue.push(node.right); //如果存在右子树，将右子树放入队列
      }
    }
  }
  BFS(tree);
  console.log(BFSList)
