const express = require('express')
const rateLimit = require('express-rate-limit')

// Import the desired sequelize models
const { Poll, Option } = require('../sequelize/index')

// Create the router instance
const router = express.Router()

// Get a poll
router.get('/get/:id', async (req, res) => {
  const { id } = req.params

  // Find the desired poll
  const poll = await Poll.findOne({
    where: { id },
    include: [
      {
        model: Option
      }
    ]
  })

  if (!poll) {
    return res.status(404).json({
      success: false,
      message: 'Could not find a poll with the specificied id.'
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Here is the requested poll.',
    poll
  })
})

const alreadyAnswered = {}

// Submit an answer
router.post('/:id/submit', async (req, res) => {
  if (!alreadyAnswered.hasOwnProperty(req.ip)) {
    alreadyAnswered[req.ip] = []
  }

  const id = req.body.optionId
  const PollId = req.params.id

  if (alreadyAnswered[req.ip].includes(PollId)) {
    return res.status(429).json({
      success: false,
      message: 'You have already answered this poll!'
    })
  }

  // Find the target answer
  const option = await Option.findOne({ where: { id, PollId } })

  if (!option) {
    return res.status(400).json({
      success: false,
      message: 'Could not submit your selected option.'
    })
  }

  try {
    await option.increment()
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while submitting your selected option.'
    })
  }

  alreadyAnswered[req.ip].push(PollId)

  return res.status(200).json({
    success: true,
    message: 'Successfully submitted your selected option.'
  })
})

// Create a poll
router.post('/create', async (req, res) => {
  try {
    const poll = await Poll.generate(req.body)

    if (!poll)
      return res.status(400).json({
        success: false,
        message: 'Something went wrong while creating the poll.'
      })

    return res.status(200).json({
      success: true,
      message: 'Poll created successfully.',
      poll
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Something went wrong while creating the poll.'
    })
  }
})

module.exports = router
