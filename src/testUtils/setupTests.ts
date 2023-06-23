import '@babel/polyfill';
import '@testing-library/jest-dom';

const firebaseMock = require('firebase-mock');

const mockAuth = new firebaseMock.MockAuthentication();
const mockDatabase = new firebaseMock.MockFirebase();
const mockFirestore = new firebaseMock.MockFirestore();
const mockStorage = new firebaseMock.MockStorage();

const mockSdk = new firebaseMock.MockFirebaseSdk(
  (path: string) => (path ? mockDatabase.child(path) : mockDatabase),
  () => mockAuth,
  () => mockFirestore,
  () => mockStorage,
  () => null
);

jest.mock('firebase/compat/app', () => mockSdk);
jest.mock('firebase/compat/auth');
