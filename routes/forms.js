const express = require('express');
const router = express.Router();



router.post('/reg-giaform', (req,res) => {
    res.send('Button clicked');
    console.log(req.body);
    
})





module.exports = router;