// Cross Origin Resource Sharing
const whitelist = [
  'http://localhost:3001/',
  'http://localhost:5000/',
  'http://localhost:5050/',
  'http://localhost:5100/'
]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions