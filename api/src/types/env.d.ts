declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SESSION_SECRET_KEY: string;
    PORT: number;
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    CORS_ORIGINS: string;
  }
}
