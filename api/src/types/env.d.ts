declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SESSION_SECRET_KEY: string;
    PORT: number;
  }
}
