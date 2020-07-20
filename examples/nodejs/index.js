const axios = require('axios').default;

const argv = process.argv.slice(2);
const token = argv[0];

if (!token) {
  console.log('Usage: node index.js <your_ocm_token>');
  process.exit(1);
}

const apiBaseUrl = 'https://communitymap.online/api/v0/object/';
// const apiBaseUrl =
//   'http://localhost:5001/community-map-dev/us-central1/object/api/v0/object';

axios
  .get(apiBaseUrl, {
    params: {
      token,
      // origin: 'testOrigin',
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => console.log(error));
