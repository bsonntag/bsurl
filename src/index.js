import axios from 'axios';

function updateSuccessMessage(code) {
  const shortUrl = 'bsurl.netlify.com/' + code;
  const successMessage = document.createElement('p');
  const link = document.createElement('a');

  link.textContent = shortUrl;
  link.href = shortUrl;
  link.target = '_blank';

  successMessage.appendChild(document.createTextNode('Your short URL: '));
  successMessage.appendChild(link);

  document.getElementById('success-message').appendChild(successMessage);
}

function setupForm() {
  const form = document.getElementById('urls-form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    axios
      .post('/.netlify/functions/generate', {
        url: form.elements.url.value,
      })
      .then(response => {
        updateSuccessMessage(response.data.code);
      });
  });
}

setupForm();
