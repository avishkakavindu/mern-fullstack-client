/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    //types of envs
    NODE_ENV: 'development' | 'production' | 'test';
    API_BASE_URL: string;
    ENCRYPT_STORAGE_SECRET_KEY: string;
  }
}
