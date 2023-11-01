import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    // Create a single supabase client for interacting with the database
    this.client = createClient(
      'https://temlyqdfvdujiilwiwof.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlbWx5cWRmdmR1amlpbHdpd29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY2NTgzNDEsImV4cCI6MjAxMjIzNDM0MX0.pS0bdksPkHzRXPbYrMjNw0ULyORw8Z_GLeZ5mhR9u08',
    );
  }
}
