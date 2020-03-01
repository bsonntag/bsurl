import qs from 'qs';

const pathname = document.location.pathname;

function getCodeFromPath(path) {
  const match = path.match(/^\/([a-zA-Z0-9_-]+)$/);
  return !match ? null : match[1];
}

if (pathname.match(/^\/redirect(.html)?$/)) {
  window.location.href = '/';
} else {
  const code = getCodeFromPath(pathname);

  if (code) {
    window.location.href =
      '/.netlify/functions/redirect?' + qs.stringify({ code });
  }
}
