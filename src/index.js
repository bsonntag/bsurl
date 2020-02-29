import qs from 'qs';

const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });

if (query.code) {
  const shortUrl = 'bsurl.netlify.com/' + query.code;
  const successMessage = document.createElement('p');
  const link = document.createElement('a');

  link.textContent = shortUrl;
  link.href = shortUrl;
  link.target = '_blank';

  successMessage.appendChild(document.createTextNode('Your short URL: '));
  successMessage.appendChild(link);

  document.getElementById('success-message').appendChild(successMessage);
}
