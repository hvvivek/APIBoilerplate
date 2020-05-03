const express = require('express')
const router = express.Router()

const Resources = require('./resources')

console.log(Resources)
// Create
// Single
// POST /resource
router.post('/:resource', async (req, res) =>
{
    try{
        const body = req.body
        let Model = Resources[req.params.resource]
        let newData = await Model(body).save()
        res.json({status: true, data: newData})
    }
    catch
    {
        res.json({status: false})
    }
    
})

// Batch
// TODO


module.exports = router