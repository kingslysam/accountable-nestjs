//TODO: Search APIS by name of issuer, customer name, serial number, date, tin, customer name, receipt verification code
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ReceiptService {
  constructor(private readonly supabaseService: SupabaseService) {}

  responseFunction(
    statusCode: number,
    message: string,
    data: any,
    error: any,
  ): any {
    const responseMessage = {
      statusCode: statusCode,
      message: message,
      data: data,
      error: error,
    };
    return responseMessage;
  }

  async getReceiptByUid(uid: string): Promise<any | null> {
    const { data, error } = await this.supabaseService.client
      .from('receipt')
      .select('*')
      .eq('uid', uid);

    if (data) {
      return this.responseFunction(200, 'Receipt found', data, null);
    }
    if (error) {
      return this.responseFunction(400, 'Error found', null, error);
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
      return this.responseFunction(200, 'Receipt found', data, null);
    }
    if (error) {
      return this.responseFunction(400, 'Error found', null, error);
    }
    return null;
  }

  async getReceipts(): Promise<any | null> {
    const { data, error } = await this.supabaseService.client
      .from('receipt')
      .select('*');

    if (data) {
      return this.responseFunction(200, 'Receipts found', data, null);
    }
    if (error) {
      return this.responseFunction(
        400,
        'Error found can not get receipts',
        null,
        error,
      );
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
      return this.responseFunction(200, 'Receipt created', data, null);
    }
    if (error) {
      return this.responseFunction(400, 'Error found', null, error);
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
      return this.responseFunction(400, 'Error found', null, error);
    } else {
      return this.responseFunction(200, 'Receipt deleted', null, null);
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
      return this.responseFunction(200, 'Receipt updated', data, null);
    }
    if (error) {
      return this.responseFunction(400, 'Error found', null, error);
    }
    return null;
  }

  async filterReceipts(
    uid: string,
    startDate: string,
    endDate: string,
    receiptType: string,
  ): Promise<any | null> {
    if (receiptType !== 'null') {
      const { data, error } = await this.supabaseService.client
        .from('receipt')
        .select('*')
        .eq('uid', uid)
        .gte('date', startDate)
        .lte('date', endDate)
        .eq('type', receiptType);

      if (data) {
        if (data.length === 0) {
          return this.responseFunction(201, 'No receipt found', null, null);
        } else {
          return this.responseFunction(200, 'Receipts found', data, null);
        }
      } else if (error) {
        return this.responseFunction(400, 'Error found', null, error);
      }
      return null;
    } else {
      const { data, error } = await this.supabaseService.client
        .from('receipt')
        .select('*')
        .eq('uid', uid)
        .gte('date', startDate)
        .lte('date', endDate);

      if (data) {
        if (data.length === 0) {
          return this.responseFunction(201, 'No receipt found', null, null);
        } else {
          return this.responseFunction(200, 'Receipts found', data, null);
        }
      } else if (error) {
        return this.responseFunction(400, 'Error found', null, error);
      }
      return null;
    }

    // if (filterData.date !== '') {
    //   const { data, error } = await query
    //     .gte('date', filterData.dateFrom)
    //     .lte('date', filterData.dateTo);

    //   if (data) {
    //     return data;
    //   }
    //   if (error) {
    //     return error;
    //   }
    //   return null;
    // } else if (filterData.type !== '') {
    //   const { data, error } = await query.eq('type', filterData.type);

    //   if (data) {
    //     return data;
    //   }
    //   if (error) {
    //     return error;
    //   }
    //   return null;
    // }
  }
}
