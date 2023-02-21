require('dotenv').config()

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log('connecting to', url, "...")
mongoose.connect(url)
    .then(result => {
        console.log("connected!")
    })
    .catch(error => {
        console.log('error connecting to DB: ', error.message)
    })

const contactSchema = new mongoose.Schema( {
    name: {
        type: String,
        minLength: [3,'Name must be at least 3 characters long'],
        required: [true, 'Name required']
    },
    number: {
        type: String,
        validate: {
            validator: v => {
              return /^(\d{2,3})(-)?(\d{2,3})-?(\d{3,})$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
        required: [true, 'Phone number required']
    }
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})

module.exports = mongoose.model('Contact', contactSchema)


