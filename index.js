const logUpdate = require('log-update')

const logPromiseToken = () => `P`
const DEFAULT_CONCURRENT_COUNT = 1
class PromiseQueue {
  constructor(promises =[], concurrentCount = DEFAULT_CONCURRENT_COUNT, enableLogs = false) {
    this.enableLogs = enableLogs
    this.concurrent = concurrentCount
    this.total = promises.length
    this.unfinished = promises
    this.executing = []
    this.resolved = []
  }
  
  shouldExecute() {
    return ((this.executing.length < this.concurrent) && this.unfinished.length)
  }

  logExecution() {
    const {unfinished, executing, resolved} = this
    logUpdate(`
      unfinished: ${this.unfinished.map(logPromiseToken)}
      executing: ${this.executing.map(logPromiseToken)}
      resolved: ${this.resolved.map(logPromiseToken)}
    `)
  }
  execute() {
    while (this.shouldExecute()) {
      var promise = this.unfinished.shift()
      promise.then(() => {
        this.resolved.push(this.executing.shift())
        if (this.enableLogs) {
          this.logExecution()
        }
        this.execute()
      })
      this.executing.push(promise)
      if (this.enableLogs) {
        this.logExecution()
      }
    }
  }
}

module.exports = PromiseQueue