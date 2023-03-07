const express = require('express')
const router = express.Router()

router.get('/questions', (req, res) => {
   res.json({
     id: 1,
     user_id: 1,
     question:
       'What is the average experience needed to be a Principal Software Engineer?',
     answers: [
       {
         id: 1,
         user_id: 2,
         answer: "I'd say 5 years on the job",
       },
       {
         id: 2,
         user_id: 3,
         answer: "I'd say 5 years on the job",
       },
       {
         id: 3,
         user_id: 2,
         answer: "Correction, Indeed suggests 7 years",
       },
     ],
   });
})

module.exports = router