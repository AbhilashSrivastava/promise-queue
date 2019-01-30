# Promise-Queue
Promise Queues for concurrently running tasks


## Usage

DEFINITION: 
```javascript
const t = new PromiseQueue(
              <List Of Promises(array)>,
              <Number of tasks to run concurrently(number)>,
              <Enable Logging(boolean)>
           )
```

EXECUTION:
 ```javascript
  t.execute()
```



### Example
```javascript
const PromiseQueue = require('./index')

const delay = (seconds) => new Promise((resolves) => {
  setTimeout(resolves, seconds*1000)
})


const concurrentTasks = [
  delay(2),
  delay(6),
  delay(1),
  delay(3),
  delay(1),
  delay(4),
  delay(5),
  delay(7),
  delay(1),
  delay(2),
  delay(3),
  delay(1)
]

const delayQueue = new PromiseQueue(concurrentTasks, 2, true)
delayQueue.execute()  

```

![Alt Text](https://media.giphy.com/media/2UJrCzHO6boSHIBi7R/giphy.gif)


