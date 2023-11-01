import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ReceiptService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getReceipts(): Promise<any | null> {
    const { data, error } = await this.supabaseService.client
      .from('receipt')
      .select('*');

    if (data) {
      return data;
    }
    if (error) {
      console.log(error);
    }
    return null;
  }
}
