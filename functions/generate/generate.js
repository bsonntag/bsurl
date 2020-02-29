const qs = require('qs');
const axios = require('axios');

const rootUrl = process.env.URL;

function createCode() {
  let hexDate = Date.now().toString(16);

  if (hexDate.length % 2 !== 0) {
    hexDate = '0'.concat(hexDate);
  }

  return Buffer.from(hexDate, 'hex').toString('base64');
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 404,
      body: 'Not found',
    };
  }

  try {
    const { url } = JSON.parse(event.body);
    const code = createCode();

    await axios.post(
      rootUrl,
      qs.stringify({
        'form-name': 'urls',
        url,
        code,
      })
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    };
  } catch (error) {
    return {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: {
          message: error.message,
        },
      }),
    };
  }
};
