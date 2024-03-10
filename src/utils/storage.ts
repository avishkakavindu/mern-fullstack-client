import { EncryptStorage } from 'encrypt-storage';
import { EncryptStorageOptions } from 'encrypt-storage/dist/types';

const SECRET_KEY = process.env.ENCRYPT_STORAGE_SECRET_KEY;

// Define options for EncryptStorage instance
const options: EncryptStorageOptions = {
  prefix: '@mern_auth', // Prefix for keys stored in storage
  storageType: 'localStorage', // Type of storage (localStorage or sessionStorage)
  encAlgorithm: 'AES', // Encryption algorithm to use (AES or Rabbit)
};

// Create an instance of EncryptStorage with the provided secret key and options
export const encryptStorage = new EncryptStorage(SECRET_KEY, options);
