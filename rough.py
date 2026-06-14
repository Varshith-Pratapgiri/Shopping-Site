class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self, val):
        newNode = Node(val)
        self.head = newNode
        self.tail = newNode
        self.length = 1

    def append(self, val):
        newNode = Node(val)
        if self.length == 0:
            self.head = newNode
            self.tail = newNode
        else:
            self.tail.next = newNode
            self.tail = newNode
        self.length += 1
        return True

    def prepend(self, val):
        newNode = Node(val)
        if self.length == 0:
            self.head = newNode
            self.tail = newNode
        else:
            newNode.next = self.head
            self.head = newNode
        self.length += 1
        return True

    def insert(self, val, pos):
        newNode = Node(val)
        if pos < 0 or pos > self.length:
            return False
        if pos == 0:
            return self.prepend(val)
        if pos == self.length:
            return self.append(val)
        curr = self.head
        count = 0
        while count < pos-1:
            curr = curr.next
            count += 1
        newNode.next = curr.next
        curr.next = newNode
        self.length += 1
        return True