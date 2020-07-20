import axios from 'axios';

function updateSuccessMessage(originalUrl, code) {
  const originalLink = document.createElement('a');
  originalLink.textContent = originalUrl;
  originalLink.href = originalUrl;
  originalLink.target = '_blank';
  originalLink.rel = 'noopener noreferrer';
  originalLink.style.overflow = 'hidden';
  originalLink.style.textOverflow = 'ellipsis';

  const originalText = document.createElement('p');
  originalText.textContent = 'Original URL: ';
  originalText.appendChild(originalLink);

  const shortUrl = 'bsurl.pt/' + code;
  const shortLink = document.createElement('a');
  shortLink.textContent = shortUrl;
  shortLink.href = 'https://' + shortUrl;
  shortLink.target = '_blank';
  shortLink.rel = 'noopener noreferrer';

  const shortText = document.createElement('p');
  shortText.textContent = 'Short URL: ';
  shortText.appendChild(shortLink);

  const newResult = document.createElement('div');
  newResult.classList.add('box');
  newResult.classList.add('result');
  newResult.appendChild(originalText);
  newResult.appendChild(shortText);

  const [firstResult] = document.getElementsByClassName('result');
  document.getElementById('content').insertBefore(newResult, firstResult);
}

function setupForm() {
  const form = document.getElementById('generate-url');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    const url = form.elements.url.value;
    axios.post('/.netlify/functions/generate', { url }).then((response) => {
      submitButton.disabled = false;
      updateSuccessMessage(url, response.data.code);
    });
  });
}

setupForm();
