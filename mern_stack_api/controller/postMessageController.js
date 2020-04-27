const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { PostMessage } = require('../models/postMessage')

// Fetching Record
router.get('/', (req, res) => {
    PostMessage.find((err, docs) => {
        if(!err) res.send(docs)
        else console.log("Error While Fetching All Records", JSON.stringify(err, undefined, 2))
    })
})

// Creating New Record
router.post('/', (req, res) =>{
    var newRecord = new PostMessage ({
        title: req.body.title,
        message: req.body.message
    })

    newRecord.save((err, doc) => {
        if(!err) res.send(doc)
        else console.log("Error While Creating New Record", JSON.stringify(err, undefined, 2))
    })
})

// Updating Record
router.put('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No Record With Given Id: ', req.params.id)
    
    var updatedRecord = {
        title: req.body.title,
        message: req.body.message
    }

    PostMessage.findByIdAndUpdate(req.params.id, {$set: updatedRecord}, {new: true}, (err, doc) => {
        if(!err) res.send(doc)
        else console.log("Error While Updating The Record", JSON.stringify(err, undefined, 2))
    })
})

// Deleting Record
router.delete('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('No Record With Given Id: ', req.params.id)

    PostMessage.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) res.send(doc)
        else console.log("Error While Deleting The Record", JSON.stringify(err, undefined, 2))
    })
})

module.exports = router;