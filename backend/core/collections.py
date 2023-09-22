class Queue:
    def __init__(self) -> None:
        self.queueu = {}
        self.tail = 0
        self.head = 0

    def put(self, value):
        self.queueu[self.head] = value
        self.head += 1
    
    def put_list(self, _list):
        for value in _list:
            self.put(value)
    
    def get(self) -> object:
        value = self.queueu.pop(self.tail)
        self.tail += 1
        return value
    
    def empty(self) -> bool:
        return False if self.queueu else True
