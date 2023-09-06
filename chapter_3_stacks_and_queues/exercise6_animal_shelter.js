/*
 * Statement
 *
 * Animal Shelter: An animal shelter, which holds only dogs and cats, operates on a strictly"first in, first
 * out" basis. People must adopt either the "oldest" (based on arrival time) of all animals at the shelter,
 * or they can select whether they would prefer a dog or a cat (and will receive the oldest animal of
 * that type). They cannot select which specific animal they would like. Create the data structures to
 * maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog,
 * and dequeueCat. You may use the built-in Linkedlist data structure.
 *
 */

import { LinkedList } from '../chapter_2_linked_lists/LinkedList'

class Animal {
    order;
    name;
    constructor(name) { this.name = name }
    isOlderThan(animal) {
        return this.order < animal.order
    }
}

export class Dog extends Animal {
    toString() {
        return `Dog: {name: ${this.name}, order: ${this.order}}`
    }
}
export class Cat extends Animal {
    toString() {
        return `Cat: {name: ${this.name}, order: ${this.order}}`
    }
}

export class AnimalQueue {
    cats = new LinkedList();
    dogs = new LinkedList();
    lastInsertion = 0

    enqueue = (animal) => {
        animal.order = Date.now();
        if (animal instanceof Cat) {
            this.cats.add(animal);
        } else if (animal instanceof Dog) {
            this.dogs.add(animal);
        }
    }

    dequeueAny = () => {
        if (this.cats.isEmpty()) {
            return this.dequeueDog();
        } else if (this.dogs.isEmpty()) {
            return this.dequeueCat();
        }
        if (this.cats.peek().isOlderThan(this.dogs.peek())) {
            return this.dequeueCat();
        } else {
            return this.dequeueDog();
        }
    }

    dequeueDog = () => {
        return this.dogs.poll();
    }

    dequeueCat = () => {
        return this.cats.poll();
    }

    isEmpty() {
        return this.cats.isEmpty() && this.dogs.isEmpty()
    }
}