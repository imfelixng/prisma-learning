import { getFirstName, isValidPassword } from '../src/utils/user';

test('should return first name when given full name', () => {
  const firstName = getFirstName("An Nguyen");
  expect(firstName).toBe("An");
})

test('should return first name when given first name', () => {
  const firstName = getFirstName('An');
  expect(firstName).toBe('An');
})

test('should reject password shorter than 8 characters', () => {
  const isValid = isValidPassword('abc123');
  expect(isValid).toBe(false);
})

test('should reject password that contains word "password"', () => {
  const isValid = isValidPassword('abcpassword');
  expect(isValid).toBe(false);
})

test('should correctly validate a valid password', () => {
  const isValid = isValidPassword('abc123123');
  expect(isValid).toBe(true);
})




