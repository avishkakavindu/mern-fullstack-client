import { ITokens } from '@interfaces/auth.interface';
import { encryptStorage } from './storage';

/**
 * Stores the authentication tokens securely using encryption.
 * @param {ITokens} tokens - The authentication tokens containing access token and refresh token.
 */
export const storeAuthTokens = (tokens: ITokens) => {
  const { accessToken, refreshToken } = tokens;

  // Store the tokens securely using encryption
  encryptStorage.setMultipleItems([
    ['accessToken', accessToken],
    ['refreshToken', refreshToken],
  ]);
};

/**
 * Retrieves the authentication tokens securely using encryption.
 * @returns {ITokens | null} The authentication tokens containing access token and refresh token, or null if not found.
 */
export const getAuthTokens = (): ITokens | null => {
  // Retrieve the tokens securely using encryption
  const accessToken = encryptStorage.getItem('accessToken');
  const refreshToken = encryptStorage.getItem('refreshToken');

  // Return the tokens if both are present, otherwise return null
  if (accessToken && refreshToken) {
    return { accessToken, refreshToken };
  } else {
    return null;
  }
};

/**
 * Removes the authentication tokens from storage.
 */
export const removeAuthTokens = (): void => {
  // Remove the tokens from storage
  encryptStorage.removeItem('accessToken');
  encryptStorage.removeItem('refreshToken');
};
