require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
console.log(url)
mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    console.log("connected")
})

const contactSchema = new mongoose.Schema( {
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)


if(process.argv.length === 2) {
    //display all entries
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact)
        })
        mongoose.connection.close()
    })
} 


if(process.argv.length == 4) {
    const contact = new Contact({
        name: process.argv[2],
        number: process.argv[3]
    })
    
    contact.save().then(result => {
        console.log(`added ${process.argv[2]} number ${process.argv[3]} to contacts`)
        mongoose.connection.close()
    })
}








