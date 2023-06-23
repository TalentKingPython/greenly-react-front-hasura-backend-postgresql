import dateCalculator, { ONE_MONTH, ONE_YEAR } from './dateCalculator';

describe('dateCalculator', () => {
  it('returns the correct string for less than one hour ago', () => {
    const createdAt = new Date().toString();
    const result = dateCalculator(createdAt);
    expect(result).toBe('Just now');
  });

  it('returns the correct string for less than one day ago', () => {
    const createdAt = new Date(Date.now() - 60 * 60 * 1000).toString();
    const result = dateCalculator(createdAt);
    expect(result).toBe('1 hour ago');
  });

  it('returns the correct string for less than one month ago', () => {
    const createdAt = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toString();
    const result = dateCalculator(createdAt);
    expect(result).toBe('4 days ago');
  });

  it('returns the correct string for less than one year ago', () => {
    const createdAt = new Date(
      Date.now() - 3 * 30 * 24 * 60 * 60 * 1000
    ).toString();
    const result = dateCalculator(createdAt);
    expect(result).toBe('3 months ago');
  });

  it('returns the correct string for more than one year ago', () => {
    const createdAt = new Date(Date.now() - 2 * ONE_YEAR).toString();
    const result = dateCalculator(createdAt);
    expect(result).toBe('2 years ago');
  });

  it('returns the correct string for more than one year and one month ago', () => {
    const createdAt = new Date(
      Date.now() - (2 * ONE_YEAR + ONE_MONTH)
    ).toString();
    const result = dateCalculator(createdAt);
    expect(result).toBe('2 years 1 month ago');
  });

  it('returns the correct string for more than one year and more than one month ago', () => {
    const createdAt = new Date(
      Date.now() - (2 * ONE_YEAR + 2 * ONE_MONTH)
    ).toString();
    const result = dateCalculator(createdAt);
    expect(result).toBe('2 years 2 months ago');
  });
});
