import { CreateReceiptDto } from './dto/create-receipt.dto';
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
// import axios from 'axios';
// import { format } from 'path';

@Injectable()
export class ReceiptService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly httpService: HttpService,
  ) {}

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
  }

  async searchForReceipt(uid: string, search: string): Promise<any | null> {
    const { data, error } = await this.supabaseService.client
      .from('receipt')
      .select()
      .eq('uid', uid)
      .or(
        `name_of_issuer.eq.${search},tin.eq.${search},receipt_no.eq.${search},receipt_verification_code.eq.${search},serial_no.eq.${search}`,
      );
    if (data) {
      return this.responseFunction(200, 'Receipts found', data, null);
    } else if (error) {
      return this.responseFunction(400, 'Error found', null, error);
    } else {
      return this.responseFunction(500, 'No receipt found', null, null);
    }
  }

  async getDataOfReceiptFromGoogleApi(
    formUnifiedData: any,
  ): Promise<any | null> {
    const formData = new FormData();
    formData.append('invoice', formUnifiedData);
    try {
      return axios
        .post('http://127.0.0.1:8000/extract-invoice', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data);
          return response;
        });
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
