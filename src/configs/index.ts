const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000';

/**
 * Get base url from configs
 * @returns
 */
export const getAPIBaseURL = () => API_BASE_URL;
