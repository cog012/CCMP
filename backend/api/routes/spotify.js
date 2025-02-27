const express = require('express')
const router = new express.Router


router.get('/create', (req, res) => {

})

router.get('/edit', (req, res) => {
    res.send('under developing')
})

router.post('/delete', (req, res) => {
    res.send('under developing')
})


module.exports = router