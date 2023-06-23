import { renderHook } from '@testing-library/react-hooks';
import { useIsMobileUserAgent } from './useIsMobileUserAgent';

const render = () => {
  const { result } = renderHook(() => useIsMobileUserAgent());
  return result;
};

describe('useIsMobileUserAgent', () => {
  describe('when the user agent is mobile', () => {
    beforeAll(() => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
        configurable: true,
      });
    });
    afterAll(() => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: '',
        writable: true,
      });
    });
    it('should return true', () => {
      const result = render();
      expect(result.current.isMobile).toBe(true);
    });
  });
  describe('when the user agent is not mobile', () => {
    beforeAll(() => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:90.0) Gecko/20100101 Firefox/90.0',
        configurable: true,
      });
    });
    afterAll(() => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: '',
        writable: true,
      });
    });
    it('should return false', () => {
      const result = render();
      expect(result.current.isMobile).toBe(false);
    });
  });
});
