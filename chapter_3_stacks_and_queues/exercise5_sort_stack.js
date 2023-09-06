/*
 * Statement
 *
 * Sort Stack: Write a program to sort a stack such that the smallest items are on the top. You can use
 * an additional temporary stack, but you may not copy the elements into any other data structure
 * (such as an array). The stack supports the following operations: push, pop, peek, and is Empty.
 *
 */

import { Stack } from './Stack';

export function sortStack(stack) {
    const temporaryStack = new Stack();
    while (!stack.isEmpty()) {
        const element = stack.pop();
        while (!temporaryStack.isEmpty() && temporaryStack.peek() > element) {
            stack.push(temporaryStack.pop());
        }
        temporaryStack.push(element);
    }

    while (!temporaryStack.isEmpty()) {
        stack.push(temporaryStack.pop());
    }
}