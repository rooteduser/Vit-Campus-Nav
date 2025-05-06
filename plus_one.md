Problem: Plus One

We are given a large integer represented as an array of its digits. The digits are arranged from most significant (left) to least significant (right). Our task is to increment this number by one and return the resulting array of digits.

Example:

Input: [1, 2, 3]Output: [1, 2, 4]Explanation: 123 + 1 = 124

Input: [9]Output: [1, 0]Explanation: 9 + 1 = 10

Approach:

To solve this problem, we simulate the manual process of adding one to a number. We start from the rightmost digit (just like how we do addition on paper). Here's the step-by-step approach:

Start from the last digit:

Try to add 1 to it.

If the result is less than 10, no carry is generated. Update the digit and return the array.

Handle Carry:

If the digit becomes 10 after adding 1, set it to 0 and carry over the 1 to the digit on the left.

Repeat the Process:

Continue this process for each digit moving leftwards.

All Digits are 9:

If all digits are 9, like [9, 9, 9], then after adding 1, we will have [0, 0, 0] and an extra 1 at the beginning.

In such a case, we add a new 1 at the start of the array, making it [1, 0, 0, 0].

Python Code:

from typing import List

class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        # Start from the last digit and move towards the first
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0

        # If loop completes, it means all digits were 9
        return [1] + digits

Why This Works:

We handle the simplest case (no carry) quickly.

We take care of overflow in each digit smartly.

The solution is efficient and covers all edge cases.

Time Complexity: O(n), where n is the number of digits.

Space Complexity: O(1) if we don't count the input/output space.

This solution is simple, intuitive, and very close to how we would solve the problem manually.

