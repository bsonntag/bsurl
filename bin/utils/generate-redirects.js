function generateRedirects(submissions) {
  return submissions
    .map(submission => `/${submission.data.code} ${submission.data.url}`)
    .join('\n');
}

exports.generateRedirects = generateRedirects;
