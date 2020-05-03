const express = require('express')
const router = express.Router()

const Resources = require('./resources')

console.log(Resources)
// Create
// Single
// POST /resource
router.delete('/:resource/:id', async (req, res) =>
{
    try{
        let Model = Resources[req.params.resource]
        let id = req.params.id
        let result = await Model.deleteOne({"_id":id})

        if(result.deletedCount > 0){
            res.json({status: true})
        }
        else
        {
            res.json({status: false, error: {message: "Not found"}})
        }
        
    }
    catch (error)
    {
        console.log(error)
        res.json({status: false, error: error})
    }
})

// Batch
// TODO


module.exports = router