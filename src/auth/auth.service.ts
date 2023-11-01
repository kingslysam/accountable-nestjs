import { Injectable } from '@nestjs/common';
// import { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async login(email: string, password: string): Promise<any | null> {
    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword({
        email,
        password,
      });

    if (data) {
      return data;
    }
    if (error) {
      console.log(error);
    }
    return null;
  }

  async register(email: string, password: string): Promise<any | null> {
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
    });

    if (data) {
      return data;
    }
    if (error) {
      console.log(error);
    }
    return data;
  }

  async logout(): Promise<null> {
    const { error } = await this.supabaseService.client.auth.signOut();
    return null;
  }

  // async logout(token: string): Promise<null> {
  //   const { error } = await this.supabaseService.client.auth.signOut(token);
  //   return null;
  // }
}
