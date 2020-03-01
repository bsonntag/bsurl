const { generateRedirects, addBaseRedirect } = require('./redirects');

describe('redirect utilities', () => {
  describe('generateRedirects', () => {
    it('should create a valid _redirects file from form submissions', () => {
      const submissions = [
        { data: { url: 'http://example.com/foo', code: 'foo' } },
        { data: { url: 'example.com/bar', code: 'bar' } },
      ];
      const result = generateRedirects(submissions);
      expect(result).toEqual(
        '/foo http://example.com/foo 302\n/bar https://example.com/bar 302'
      );
    });

    it('should return an empty string when there are no submissions', () => {
      const result = generateRedirects([]);
      expect(result).toEqual('');
    });
  });

  describe('addBaseRedirect', () => {
    it('should add the base redirect to the bottom of the _redirects file', () => {
      const result = addBaseRedirect('/foo http://example.com 302');
      expect(result).toEqual(
        '/foo http://example.com 302\n/* /redirect.html 200'
      );
    });
  });
});
