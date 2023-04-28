const express = require('express');
const router = express.Router();

const scenarioRouter = require('./scenario')
const answerRouter = require('./answer')
const homeRouter = require('./home')

router.use('/scenarios', scenarioRouter)
router.use('/ask', answerRouter)
router.use('/', homeRouter)

module.exports = router;