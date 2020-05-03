const express = require('express')
const router = express.Router()

const Resources = require('./resources')

console.log(Resources)
// Create
// Single
// POST /resource
router.get('/:resource', async (req, res) =>
{
    try{

        let Model = Resources[req.params.resource]
        let searchParams = req.query
        console.log(searchParams)
        let readData = await Model.find(searchParams)
        res.json({status: true, data: readData})
    }
    catch
    {
        res.json({status: false})
    }
})

// Batch
// TODO


module.exports = router