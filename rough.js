class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class LinkedList {
    constructor(val) {
        let newNode = new Node(val);
        this.head = newNode;
        this.tail = newNode;
        this.length = 1;
    }

    append(val) {
        let newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return true;
    }

    prepend(val) {
        let newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return true;
    }

    insert(val, pos) {
        if (pos < 0 || pos > this.length) return false;
        if (pos === 0) return this.prepend(val);
        if (pos === this.length) return this.append(val);
        let curr = this.head;
        let cnt = 0;
        let newNode = new Node(val);
        while (cnt < pos-1) {
            curr = curr.next;
            cnt++;
        }
        newNode.next = curr.next;
        curr.next = newNode;
        this.length++;
        return true;
    }

    pop_first() {
        if (this.length === 0) return false;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            let temp = this.head;
            this.head = temp.next;
            temp.next = null;
        }
        this.length--;
        return true;
    }

    pop_last() {
        if (this.length === 0) return false;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            let curr = this.head;
            while (curr.next.next) {
                curr = curr.next;
            }
            curr.next = null;
            this.tail = curr;
        }
        this.length--;
        return true;
    }

    remove(pos) {
        if (pos < 0 || pos > this.length-1) return false;
        if (pos === 0) return this.pop_first();
        if (pos === this.length-1) return this.pop_last();
        let curr = this.head;
        let cnt = 0;
        while (cnt < pos-1) {
            curr = curr.next;
            cnt++;
        }
        let temp = curr.next;
        curr.next = temp.next;
        temp.next = null;
        this.length--;
        return true;
    }

    logList(node) {
        let curr = node;
        while (curr) {
            console.log(curr.val);
            curr = curr.next;
        }
    }

    reverseList(node) {
        if (node === null) return node;
        let curr = node;
        let prev = null;
        
        while (curr) {
            let next = curr.next;

            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}