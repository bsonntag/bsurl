function generateRedirects(submissions) {
  return submissions
    .map((submission) => {
      let url = submission.data.url;
      if (!url.includes('://')) {
        url = 'https://' + url;
      }

      return `/${submission.data.code} ${url} 302`;
    })
    .join('\n');
}

function addBaseRedirect(redirects) {
  return [redirects, '/* /redirect.html 200'].filter(Boolean).join('\n');
}

exports.generateRedirects = generateRedirects;
exports.addBaseRedirect = addBaseRedirect;
