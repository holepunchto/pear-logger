'use strict'

const { test } = require('brittle')
const Logger = require('..')

const consoleLog = console.log
const consoleError = console.error
const consoleTrace = console.trace

test('logger level OFF', async function (t) {
  t.plan(2)

  const Logger = require('..')

  let consoleLogCount = 0
  console.log = () => { consoleLogCount += 1 }
  t.teardown(() => { console.log = consoleLog })

  let consoleErrorCount = 0
  console.error = () => { consoleErrorCount += 1 }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger({ labels: ['label-test'], level: Logger.OFF })
  try {
    logger.error('label-test', 'error')
    logger.info('label-test', 'info')
    logger.trace('label-test', 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.is(consoleLogCount, 0, 'console.log not called')
  t.is(consoleErrorCount, 0, 'console.error not called')
})

test('logger level ERR', async function (t) {
  t.plan(2)

  const Logger = require('..')

  let consoleLogCount = 0
  console.log = () => { consoleLogCount += 1 }
  t.teardown(() => { console.log = consoleLog })

  let consoleErrorCount = 0
  console.error = () => { consoleErrorCount += 1 }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger({ labels: ['label-test'], level: Logger.ERR })
  try {
    logger.error('label-test', 'error')
    logger.info('label-test', 'info')
    logger.trace('label-test', 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.is(consoleLogCount, 0, 'console.log not called')
  t.is(consoleErrorCount, 1, 'console.error called once')
})

test('logger level INF', async function (t) {
  t.plan(2)

  const Logger = require('..')

  let consoleLogCount = 0
  console.log = () => { consoleLogCount += 1 }
  t.teardown(() => { console.log = consoleLog })

  let consoleErrorCount = 0
  console.error = () => { consoleErrorCount += 1 }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger({ labels: ['label-test'], level: Logger.INF })
  try {
    logger.error('label-test', 'error')
    logger.info('label-test', 'info')
    logger.trace('label-test', 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.is(consoleLogCount, 1, 'console.log called once')
  t.is(consoleErrorCount, 1, 'console.error called once')
})

test('logger level TRC', async function (t) {
  t.plan(2)

  const Logger = require('..')

  let consoleLogCount = 0
  console.log = () => { consoleLogCount += 1 }
  t.teardown(() => { console.log = consoleLog })

  let consoleErrorCount = 0
  console.error = () => { consoleErrorCount += 1 }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger({ labels: ['label-test'], level: Logger.TRC })
  try {
    logger.error('label-test', 'error')
    logger.info('label-test', 'info')
    logger.trace('label-test', 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.is(consoleLogCount, 1, 'console.log called once')
  t.is(consoleErrorCount, 2, 'console.error called twice')
})

test('logger with matching label', async function (t) {
  t.plan(2)

  let consoleLogCount = 0
  console.log = () => { consoleLogCount += 1 }
  t.teardown(() => { console.log = consoleLog })

  let consoleErrorCount = 0
  console.error = () => { consoleErrorCount += 1 }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger({ labels: ['label-test'], level: Logger.TRC })
  try {
    logger.error('label-test', 'error')
    logger.info('label-test', 'info')
    logger.trace('label-test', 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.is(consoleLogCount, 1, 'console.log called once for matching label')
  t.is(consoleErrorCount, 2, 'console.error called twice for matching label')
})

test('logger with non-matching label', async function (t) {
  t.plan(2)

  let consoleLogCount = 0
  console.log = () => { consoleLogCount += 1 }
  t.teardown(() => { console.log = consoleLog })

  let consoleErrorCount = 0
  console.error = () => { consoleErrorCount += 1 }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger({ labels: ['label-test'], level: Logger.TRC })
  try {
    logger.error('non-matching-label', 'error')
    logger.info('non-matching-label', 'info')
    logger.trace('non-matching-label', 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.is(consoleLogCount, 0, 'console.log not called for non-matching label')
  t.is(consoleErrorCount, 0, 'console.error not called for non-matching label')
})

test('logger with multiple labels', async function (t) {
  t.plan(2)

  let consoleLogCount = 0
  console.log = () => { consoleLogCount += 1 }
  t.teardown(() => { console.log = consoleLog })

  let consoleErrorCount = 0
  console.error = () => { consoleErrorCount += 1 }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger({ labels: ['label-test', 'label-extra'], level: Logger.TRC })
  try {
    logger.error('label-test', 'error')
    logger.info('label-extra', 'info')
    logger.trace('non-matching-label', 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.is(consoleLogCount, 1, 'console.log called once for matching labels')
  t.is(consoleErrorCount, 1, 'console.error called once for matching labels')
})

test('Logger constructor with default switches', async function (t) {
  t.plan(2)

  const Logger = require('..')

  let consoleLogCount = 0
  console.log = () => { consoleLogCount += 1 }
  t.teardown(() => { console.log = consoleLog })

  let consoleErrorCount = 0
  console.error = () => { consoleErrorCount += 1 }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger()
  try {
    logger.error('label-test', 'error')
    logger.info('label-test', 'info')
    logger.trace('label-test', 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.is(consoleLogCount, 0, 'console.log not called')
  t.is(consoleErrorCount, 0, 'console.error not called')
})

test('Logger constructor with custom switches', async function (t) {
  t.plan(2)

  const Logger = require('..')

  const originalSwitches = { ...Logger.switches }
  Logger.switches = {
    ...Logger.switches,
    level: Logger.ERR,
    labels: ['label-test']
  }
  t.teardown(() => { Logger.switches = originalSwitches })

  let consoleLogCount = 0
  console.log = () => { consoleLogCount += 1 }
  t.teardown(() => { console.log = consoleLog })

  let consoleErrorCount = 0
  console.error = () => { consoleErrorCount += 1 }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger()
  try {
    logger.error('label-test', 'error')
    logger.info('label-test', 'info')
    logger.trace('label-test', 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.is(consoleLogCount, 0, 'console.log not called')
  t.is(consoleErrorCount, 1, 'console.error called once')
})

test('logger format', async function (t) {
  t.plan(3)
  const Logger = require('..')
  const logger = new Logger({ labels: ['label-test'], level: Logger.INF })
  t.ok(/ERR \[ label-test \] error/.test(logger.format('ERR', 'label-test', 'error')))
  t.ok(/INF \[ label-test \] info/.test(logger.format('INF', 'label-test', 'info')))
  t.is(logger.format('TRC', 'label-test', 'trace'), '')
})

test('logger format stacks: true', async function (t) {
  t.plan(3)
  const Logger = require('..')
  const logger = new Logger({ labels: ['label-test'], level: Logger.INF, stacks: true })

  t.ok(/(\n^ {4}at .+$)+/m.test(logger.format('ERR', 'label-test', 'error')))
  t.ok(/(\n^ {4}at .+$)+/m.test(logger.format('ERR', 'label-test', 'error')))
  t.is(logger.format('TRC', 'label-test', 'trace'), '')
})

test('logger with array labels', async function (t) {
  t.plan(9)

  const Logger = require('..')

  let logOutput = ''
  console.log = (...args) => { logOutput +=  args.join(' ') + '\n' }
  t.teardown(() => { console.log = consoleLog })

  let errorOutput = ''
  console.error = (...args) => { errorOutput +=  args.join(' ') + '\n' }
  t.teardown(() => { console.error = consoleError })

  const logger = new Logger({ labels: ['label1', 'label2'], level: Logger.TRC })
  try {
    logger.error(['label1', 'label2', 'label3'], 'error')
    logger.info(['label1', 'label2', 'label3'], 'info')
    logger.trace(['label1', 'label2', 'label3'], 'trace')
  } finally {
    console.log = consoleLog
    console.error = consoleError
  }

  t.ok(logOutput.includes('INF [ label1 ] info'), 'should include info message for label1')
  t.ok(logOutput.includes('INF [ label2 ] info'), 'should include info message for label2')
  t.ok(!logOutput.includes('INF [ label3 ] info'), 'should not include info message for label3')

  t.ok(errorOutput.includes('ERR [ label1 ] error'), 'should include error message for label1')
  t.ok(errorOutput.includes('ERR [ label2 ] error'), 'should include error message for label2')
  t.ok(!errorOutput.includes('ERR [ label3 ] error'), 'should not include error message for label3')

  t.ok(errorOutput.includes('TRC [ label1 ] trace'), 'should include trace message for label1')
  t.ok(errorOutput.includes('TRC [ label2 ] trace'), 'should include trace message for label2')
  t.ok(!errorOutput.includes('TRC [ label3 ] trace'), 'should not include trace message for label3')
})

test.solo('logger format with array labels', async function (t) {
  t.plan(3)

  const Logger = require('..')
  const logger = new Logger({ labels: ['label1', 'label2'], level: Logger.INF })

  const output = logger.format('ERR', ['label1', 'label2', 'label3'], 'error')
  const lines = output.split('\n').filter(line => line.trim() !== '')

  t.ok(lines.length === 2, 'should have two lines in output')
  t.ok(lines[0].startsWith('ERR [ label1 ] error'), 'should format first label correctly')
  t.ok(lines[1].startsWith('ERR [ label2 ] error'), 'should format first label correctly')
})
