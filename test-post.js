const axios = require('axios');

// async function testPostRequest() {
//   try {
//     const response = await axios.post('http://localhost:3000/user', {
//       name: 'Alice Johnson',
//       email: 'alice@example.com'
//     });
//     console.log('Response data:', response.data);
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//   }
// }

// testPostRequest();

async function testPatchRequest() {
  try {
    const response = await axios.patch('http://localhost:3000/user/1/update-university', {
      universityId: 2
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testPatchRequest();

async function testPatchRequest2() {
  try {
    const response = await axios.patch('http://localhost:3000/user/1/subjects', {
      subjects: ['it', 'mayT']
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testPatchRequest2();
