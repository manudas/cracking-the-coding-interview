import { AnimalQueue, Cat, Dog } from '../exercise6_animal_shelter';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Cracking the coding interview: Stacks and queues, exercise 6: animal queue', () => {
    const initialData =  [{
        type: 'cat',
        name: 'gato1',
    },
    {
        type: 'cat',
        name: 'gato2',
    },
    {
        type: 'dog',
        name: 'perro1',
    },
    {
        type: 'cat',
        name: 'gato3',
    },
    {
        type: 'dog',
        name: 'perrito2',
    }];

    let testingQueue

    beforeEach(async() => {
        testingQueue = new AnimalQueue();
        /*
         * Map fails as it creates and launches as many funcs as elementsin initialData arr inmediatly

            await Promise.all(initialData.map(async(animal) => {
                await sleep(1500); // otherwise all get inserted with the same timestamp
                testingQueue.enqueue(animal.type === 'cat' ? new Cat(animal.name) : new Dog(animal.name));
            }));

        */

        // for works as it waits for the previous call to be finished before launching the next one
        for(const animal of initialData) {
            await sleep(Math.random());
            testingQueue.enqueue(animal.type === 'cat' ? new Cat(animal.name) : new Dog(animal.name));
        }
    })

    test('should dequeue first in first out with dequeueAny', () => {
        const expectedDequeueArr = initialData.map(e => e.name);
        const realQueueArr = [];
        while(!testingQueue.isEmpty()) {
            realQueueArr.push(testingQueue.dequeueAny());
        }

        const dequeuedArrNames = realQueueArr.map(e => e.name);

        // console.log(`Received: ${dequeuedArrNames}`);
        // console.log(`Expected: ${expectedDequeueArr}`);
        expect(expectedDequeueArr).toEqual(dequeuedArrNames);
    })

    test('CATS: should dequeue first in first out with dequeueCat', () => {
        const expectedDequeueArr = initialData.filter(e => e.type === 'cat').map(e => e.name);
        const realQueueArr = [];
        let currentCat = null;
        while((currentCat = testingQueue.dequeueCat()) !== null) {
            realQueueArr.push(currentCat);
        }

        const dequeuedArrNames = realQueueArr.map(e => e.name);

        // console.log(`Received: ${dequeuedArrNames}`);
        // console.log(`Expected: ${expectedDequeueArr}`);
        expect(expectedDequeueArr).toEqual(dequeuedArrNames);
    })

    test('DOGS: should dequeue first in first out with dequeueDog', () => {
        const expectedDequeueArr = initialData.filter(e => e.type === 'dog').map(e => e.name);
        const realQueueArr = [];
        let currentDog = null;
        while((currentDog = testingQueue.dequeueDog()) !== null) {
            realQueueArr.push(currentDog);
        }

        const dequeuedArrNames = realQueueArr.map(e => e.name);

        // console.log(`Received: ${dequeuedArrNames}`);
        // console.log(`Expected: ${expectedDequeueArr}`);
        expect(expectedDequeueArr).toEqual(dequeuedArrNames);
    })
});