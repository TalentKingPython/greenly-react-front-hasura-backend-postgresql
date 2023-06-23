import { renderHook } from '@testing-library/react-hooks';
import { usePagination } from './usePagination';

const render = () => {
  const { result } = renderHook(() =>
    usePagination({
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      pageSize: 3,
    })
  );
  return result;
};

describe('usePagination', () => {
  it('should return the correct data for the current page', () => {
    const result = render();
    expect(result.current.currentData).toEqual([1, 2, 3]);
  });

  describe('when the next page is called', () => {
    it('should return the correct data for the next page', () => {
      const result = render();
      result.current.next();
      expect(result.current.currentData).toEqual([4, 5, 6]);
    });
  });

  describe('when the previous page is called', () => {
    it('should return the correct data for the previous page', () => {
      const result = render();
      result.current.next();
      result.current.prev();
      expect(result.current.currentData).toEqual([1, 2, 3]);
    });
  });

  describe('when the jump page is called', () => {
    it('should return the correct data for the jump page', () => {
      const result = render();
      result.current.jump(2);
      expect(result.current.currentData).toEqual([4, 5, 6]);
    });
  });

  describe('when the jump page is called with a page number greater than the max page', () => {
    it('should return the correct data for the max page', () => {
      const result = render();
      result.current.jump(4);
      expect(result.current.currentData).toEqual([10]);
    });
  });
});
