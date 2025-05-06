📘 Rotate List - Solution (Python)
🧾 Problem Statement
Given the head of a linked list, rotate the list to the right by k places.

🧠 Approach
Edge Cases:

If the list is empty, has one element, or k is 0, return the head directly.

Compute Length & Form Circle:

Traverse the list to calculate its length and connect the tail to the head to form a circular list.

Find New Head & Tail:

Calculate the new tail's position: length - (k % length) steps from the head.

The new head is the node right after the new tail.

Break the Circle:

Set new_tail.next = None to break the circle and finalize the new list.

✅ Python Implementation
python
Copy
Edit
# Definition for singly-linked list.
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
📈 Time & Space Complexity
Time Complexity: O(N) – We traverse the list a couple of times.

Space Complexity: O(1) – No extra space is used.

🔁 Example
Input: head = [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]

