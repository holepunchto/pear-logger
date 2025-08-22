'use strict'

const { test } = require('brittle')
const Logger = require('..')

const consoleLog = console.log
const consoleError = console.error

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
  console.log = (...args) => { logOutput += args.join(' ') + '\n' }
  t.teardown(() => { console.log = consoleLog })

  let errorOutput = ''
  console.error = (...args) => { errorOutput += args.join(' ') + '\n' }
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

test('logger format with array labels', async function (t) {
  t.plan(3)

  const Logger = require('..')
  const logger = new Logger({ labels: ['label1', 'label2'], level: Logger.INF })

  const output = logger.format('ERR', ['label1', 'label2', 'label3'], 'error')
  const lines = output.split('\n').filter(line => line.trim() !== '')

  t.ok(lines.length === 2, 'should have two lines in output')
  t.ok(lines[0].startsWith('ERR [ label1 ] error'), 'should format first label correctly')
  t.ok(lines[1].startsWith('ERR [ label2 ] error'), 'should format first label correctly')
})

test('logger should show/hide fields', async function (t) {
  t.plan(4)

  const Logger = require('..')

  const output1 = new Logger({ labels: ['label1'], level: Logger.INF, fields: ['time'] })
    .format('INF', 'label1', 'info')
  t.is(/^INF [\d:.]+ \[ label1 ] info \[[\d.+]+ms]$/.test(output1.trim()), true, 'should show time field')

  const output2 = new Logger({ labels: ['label1'], level: Logger.INF, fields: ['h:delta'] })
    .format('INF', 'label1', 'info')
  t.is(output2.trim(), 'INF [ label1 ] info', 'should hide delta field')

  const output3 = new Logger({ labels: ['label1'], level: Logger.INF, fields: ['time,h:delta'] })
    .format('INF', 'label1', 'info')
  t.is(/^INF [\d:.]+ \[ label1 ] info$/.test(output3.trim()), true, 'should support multiple fields')

  const output4 = new Logger({ labels: ['label1'], level: Logger.INF, fields: ['delta,h:delta'] })
    .format('INF', 'label1', 'info')
  t.is(output4.trim(), 'INF [ label1 ] info', 'should override with hide')
})

test('logger should print stack trace', async function (t) {
  t.plan(4)

  let logOutput = ''
  console.log = (...args) => { logOutput += args.join(' ') + '\n' }
  t.teardown(() => { console.log = consoleLog })

  let errorOutput = ''
  console.error = (...args) => { errorOutput += args.join(' ') + '\n' }
  t.teardown(() => { console.error = consoleError })

  const Logger = require('..')
  const logger = new Logger({ labels: ['label1'], level: Logger.TRC, stacks: true })

  logger.trace('label1', 'trace')
  t.ok(/\s+at\s+/.test(errorOutput), 'should include stack trace in trace output')

  logger.info('label1', 'info')
  t.ok(/\s+at\s+/.test(logOutput), 'should include stack trace in info output')

  errorOutput = ''
  logger.error('label1', 'error')
  t.ok(/\s+at\s+/.test(errorOutput), 'should include stack trace in error output')

  const formatOutput = logger.format('ERR', 'label1', 'error')
  t.ok(/\s+at\s+/.test(formatOutput), 'should include stack trace in format output')
})

test('logger should accept string parse level', async function (t) {
  t.plan(4)

  const Logger = require('..')

  const logger1 = new Logger({ labels: ['label1'], level: 'ERR' })
  t.ok(logger1.format('ERR', 'label1', 'error').startsWith('ERR [ label1 ] error'), 'should format error message correctly')
  t.is(logger1.format('INF', 'label1', 'info').trim(), '', 'should not format info message at ERR level')

  const logger2 = new Logger({ labels: ['label1'], level: 'inf' })
  t.ok(logger2.format('ERR', 'label1', 'error').startsWith('ERR [ label1 ] error'), 'should format error message correctly')
  t.ok(logger2.format('INF', 'label1', 'info').startsWith('INF [ label1 ] info'), 'should format error message correctly')
})
