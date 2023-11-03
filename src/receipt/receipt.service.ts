import { CreateReceiptDto } from './dto/create-receipt.dto';
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ReceiptService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getReceiptByUid(uid: string): Promise<any | null> {
    const { data, error } = await this.supabaseService.client
      .from('receipt')
      .select('*')
      .eq('uid', uid);

    if (data) {
      return data;
    }
    if (error) {
      return 'Error';
    }
    return null;
  }

  async getReceiptByReceiptNumber(
    uid: string,
    receipt_no: string,
  ): Promise<any | null> {
    const { data, error } = await this.supabaseService.client
      .from('receipt')
      .select('*')
      .eq('uid', uid)
      .eq('receipt_no', receipt_no);

    if (data) {
      return data;
    }
    if (error) {
      return 'Error';
    }
    return null;
  }

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

  /**
   * Create a new receipt.
   *
   * @param {CreateReceiptDto} CreateReceiptDto - Object of the receipt information.
   * @returns {Receipt} - Object of the receipt information.
   *
   */
  async createReceipt(CreateReceiptDto: CreateReceiptDto): Promise<any | null> {
    const { data, error } = await this.supabaseService.client
      .from('receipt')
      .insert(CreateReceiptDto);

    if (data) {
      return data;
    }
    if (error) {
      return error;
    }
    return null;
  }

  async deleteAReceipt(uid: string, receipt_no: string): Promise<any | null> {
    const { error } = await this.supabaseService.client
      .from('receipt')
      .delete()
      .eq('uid', uid)
      .eq('receipt_no', receipt_no);

    if (error) {
      return error;
    } else {
      return 'The receipt has been successfully delete.';
    }
  }

  async updateAReceipt(
    uid: string,
    receipt_no: string,
    updateData: any,
  ): Promise<any | null> {
    const { data, error } = await this.supabaseService.client
      .from('receipt')
      .update(updateData)
      .eq('uid', uid)
      .eq('receipt_no', receipt_no);

    if (data) {
      return data;
    }
    if (error) {
      return error;
    }
    return null;
  }
}
