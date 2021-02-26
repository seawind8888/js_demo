'use strict'

// 定义节点
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}


class LList {
    constructor() {
        this.head = new Node('head');
    }

    // 查找链表中一个节点
    find (item) {
        var currNode = this.head;
        while (currNode.element != item) {
            currNode = currNode.next;
        }
        return currNode;
    }

    // 插入节点
    insert (newElement, item) {
        var newNode = new Node(newElement);
        var current = this.find(item);
        newNode.next = current.next;
        current.next = newNode;
    }

    // // 查找元素前一个节点
    // findPrevious (item) {
    //     var currNode = this.head;
    //     while (!(currNode.next == null) && currNode.next.element != item) {
    //         currNode = currNode.next;
    //     }
    //     return currNode;
    // }

    // 删除一个节点
    remove (item) {
        var prevNode = this.findPrevious(item)
        if (!(prevNode.next == null)) {
            prevNode.next = prevNode.next.next;
        }
    }

    // 返回队尾元素
    display () {
        var currNode = this.head;
        while (currNode.next != null) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }

}
