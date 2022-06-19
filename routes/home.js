const express = require('express')
const router = express.Router()
const conn = require('../lib/database')

router.get('/',(req,res)=>{
    let proQuery = `SELECT * FROM programmes`
    conn.query(proQuery,(err,rows)=>{
        if(err) throw err
        res.render('home',{
          programme: rows
        })

        console.log(rows)
    }) 
})

module.exports = router