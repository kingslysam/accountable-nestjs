/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Injectable()
export class SupabaseGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return false;
    }
    try {
      const {data: { user }, error} = await this.supabaseService.client.auth.getUser(token);

      if (!user && error) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
