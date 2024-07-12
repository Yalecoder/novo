import type { Config, defineConfig } from 'drizzle-kit';
export default {
  schema: './src/database/schema.ts',
  out: './src/database/drizzle',
  driver: 'expo', 
  dialect: 'sqlite',
  
  
} satisfies Config;