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

function triggerBuild() {
  const parameters = qs.stringify({
    trigger_title: 'Update redirects',
  });
  return axios.post(process.env.BUILD_HOOK + '?' + parameters);
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

    await triggerBuild();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    };
  } catch (error) {
    return {
      statusCode: 500,
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
