const axios = require('axios');

const submissionsUrl =
  'https://api.netlify.com/api/v1/forms/' +
  process.env.FORM_ID +
  '/submissions?access_token=' +
  process.env.API_KEY;

exports.handler = async (event, context) => {
  const code = event.queryStringParameters.code;
  const response = await axios.get(submissionsUrl);

  const submission = response.data.find(submission => {
    return submission.data.code === code;
  });

  if (!submission) {
    return {
      statusCode: 302,
      headers: {
        Location: '/',
      },
    };
  }

  let url = submission.data.url;
  if (!url.includes('://')) {
    url = 'https://' + url;
  }

  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
  };
};
