import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private databaseUrl: string;
  private databaseApiKey: string;

  constructor() {
    this.databaseUrl = process.env.DATABASE_URL;
    this.databaseApiKey = process.env.DATABASE_API_KEY;

    this.supabase = createClient(this.databaseUrl, this.databaseApiKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
