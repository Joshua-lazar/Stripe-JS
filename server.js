const expres = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const path = require('path')

const Stripe = require('stripe')(process.env.SECERT_KEY)
var cors  = require('cors')

const app = expres()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

const port = process.env.PORT || 9000  

app.listen(port, error => { 
    if(error) throw  error ; 
    console.log('Your server is running on 5000')
})

app.post('/payment' , async(req,res) => {
    let status  , error ; 
    const {token , amount }  = req.body
    console.log(token , amount)
    try{

        await Stripe.charges.create(
            {
                source : token.id,
                amount ,
                currency : 'usd'
            }
        )
    }
    catch(error)
    {

        console.log(error)
        status = 'Failurse'
    }
    res.json({res,status})
})