const express = require('express')
const router = express.Router()

const Resources = require('./resources')

console.log(Resources)
// Create
// Single
// POST /resource
router.put('/:resource', async (req, res) =>
{
    try{
        let Model = Resources[req.params.resource]
        let updates = req.body.updates
        let id = req.body.id
        let document = await Model.findOne({"_id":id})
        if(document){
            for(let i=0; i<updates.length; i++)
            {
                document[updates[i]["name"]] = updates[i]["value"]
            }
            document = await document.save()
            res.json({status: true, data: document})
        }
        else
        {
            res.json({status: true, error: {message: "Not found"}})
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