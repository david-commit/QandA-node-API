const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
 res.json({
   name: 'Muhammad Ishaq',
   gender: 'Male',
   age: 23,
   address: {
     street: '87',
     city: 'Gultari Matyal Skardu',
     state: 'Gilgit Baltistan',
     postalCode: '16350',
   },
   phoneNumber: [{ type: 'personal', number: '116263747' }],
 });
})

module.exports = router