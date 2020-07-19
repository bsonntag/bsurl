const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');
const { generateRedirects, addBaseRedirect } = require('./utils/redirects');

const writeFile = promisify(fs.writeFile);

const submissionsUrl =
  'https://api.netlify.com/api/v1/forms/' +
  process.env.FORM_ID +
  '/submissions?access_token=' +
  process.env.API_KEY;

axios.get(submissionsUrl).then((response) => {
  const redirects = addBaseRedirect(generateRedirects(response.data));
  return writeFile('./dist/_redirects', redirects);
});
