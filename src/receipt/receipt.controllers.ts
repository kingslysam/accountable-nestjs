import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateReceiptDto } from './dto/create-receipt.dto';

@ApiTags('Receipts')
@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  //
  //Post APIs For Receipts
  //

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

  //
  //Get APIs For Receipts
  //

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

  /**
   * @description find a receipt by uid
   * @param {string} uid The user id
   * @returns {Promise<string>} The receipts data from uid
   * @memberof ReceiptService
   *
   */
  @Get(':uid')
  @ApiOperation({ summary: 'get receipts by a user' })
  @ApiResponse({
    status: 200,
    description: 'The receipt has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized.' })
  async getReceiptByUid(@Param('uid') uid: string): Promise<any> {
    JSON.stringify(CreateReceiptDto);
    const receipts = await this.receiptService.getReceiptByUid(uid);

    return JSON.stringify(receipts);
  }
}
