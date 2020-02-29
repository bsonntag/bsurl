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
    const { url } = qs.parse(event.body);
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
      statusCode: 302,
      headers: {
        Location: '/?' + qs.stringify({ code }),
        'Cache-Control': 'no-cache',
      },
      body: '',
    };
  } catch (error) {
    return {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rootUrl,
        request: {
          httpMethod: event.httpMethod,
          body: event.body,
        },
        error: {
          message: error.message,
        },
      }),
    };
  }
};
