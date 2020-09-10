const axios = require('axios')

url = 'http://localhost:3003/exercises'
data = {
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}

axios.post(url, data)
    .then((res) => console.log('res',res.data)) 
    .catch( error => console.log('error',error.response.data))
