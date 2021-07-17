const axios = require('axios');

exports.instance = axios.create({
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
