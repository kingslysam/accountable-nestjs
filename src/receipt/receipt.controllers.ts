import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateReceiptDto } from './dto/create-receipt.dto';

// const receiptData = {
//   uid: '12345',
//   name_of_issuer: 'John Doe',
//   mobile_number: '123-456-7890',
//   tin: 'ABC123',
//   vrn: 'XYZ456',
//   serial_no: '789',
//   uin: '4567890',
//   tax_office: 'City Tax Office',
//   customer: {
//     name: 'Alice',
//     email: 'alice@example.com',
//   },
//   receipts_item: {
//     item1: {
//       description: 'Product A',
//       price: 25.99,
//     },
//     item2: {
//       description: 'Product B',
//       price: 19.99,
//     },
//   },
//   receipt_no: 'R123456789',
//   z_number: 'Z-7890',
//   date: '2023-11-02',
//   time: '10:30 AM',
//   tax_from_item: {
//     item1: 2.50,
//     item2: 1.90,
//   },
//   cash: '50.00',
//   items_number: '2',
//   receipt_verification_code: 'V7890',
//   qr_code_link: 'https://example.com/receipt/qrcode',
// };

@ApiTags('Receipts')
@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  /**
   * @description Create a receipt
   * @param {string} body The receipt data
   * @returns {Promise<string>} The receipt created
   * @memberof ReceiptService
   *
   */
  @Post('create')
  @ApiOperation({ summary: 'Create a receipt' })
  @ApiResponse({
    status: 200,
    description: 'The receipt has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized.' })
  async createReceipt(
    @Body() CreateReceiptDto: CreateReceiptDto,
  ): Promise<any> {
    console.log('body', CreateReceiptDto);
    JSON.stringify(CreateReceiptDto);
    const receipt = await this.receiptService.createReceipt(
      CreateReceiptDto.receiptData,
    );

    return JSON.stringify(receipt);
  }

  /**
   * @description get all receipts
   * @returns {Promise<string>} The receipts data
   * @memberof ReceiptService
   *
   */
  @Get('all')
  @ApiOperation({ summary: 'Admin Use only Pulling all receipt' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The Data has been successfully pull.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized.' })
  async getReceipts() {
    return this.receiptService.getReceipts();
  }
}
