import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReceiptDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The Receipt Data.' })
  receiptData: any;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The UID of the receipt.' })
  uid: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The name of the issuer.' })
  name_of_issuer: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The mobile number associated with the receipt.',
  })
  mobile_number: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'The Tax Identification Number (TIN) associated with the receipt.',
  })
  tin: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'The Value-Added Tax Registration Number (VRN) associated with the receipt.',
  })
  vrn: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The serial number of the receipt.' })
  serial_no: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'The unique identification number (UIN) associated with the receipt.',
  })
  uin: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The tax office associated with the receipt.' })
  tax_office: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description:
      'Details about the customer associated with the receipt in JSON format.',
  })
  customer: any;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: 'Details about the items in the receipt in JSON format.',
  })
  receipts_item: any;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The receipt number.' })
  receipt_no: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The Z number associated with the receipt.' })
  z_number: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The date of the receipt.' })
  date: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The time of the receipt.' })
  time: string;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: 'Details about the tax from items in JSON format.',
  })
  tax_from_item: any;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The cash amount associated with the receipt.' })
  cash: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The number of items in the receipt.' })
  items_number: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The receipt verification code.' })
  receipt_verification_code: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The QR code link associated with the receipt.' })
  qr_code_link: string;
}
