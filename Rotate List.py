# /**
#  * Definition for singly-linked list.
#  * public class ListNode {
#  *     int val;
#  *     ListNode next;
#  *     ListNode() {}
#  *     ListNode(int val) { this.val = val; }
#  *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
#  * }
#  */
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head or not head.next or k == 0:
            return head
        # Compute the length of the list and get the tail
        length = 1
        tail = head
        while tail.next:
            tail = tail.next
            length += 1
        # Connecting the tail to the head to make it a circular list
        tail.next = head
        # Finding the new tail
        steps_to_new_tail = length - (k % length)
        new_tail = head
        for _ in range(steps_to_new_tail - 1):
            new_tail = new_tail.next
        # The new head is the next node after the new tail
        new_head = new_tail.next
        # Breaking the circle
        new_tail.next = None
        return new_head