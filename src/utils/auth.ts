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
