import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
   * @param {any} body The receipt data
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
    @Param('body') body: any,
    @Body() CreateReceiptDto: CreateReceiptDto,
  ): Promise<any> {
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

  /**
   * @description find a receipt of a user by receipt_no
   * @param {string} uid The user id
   * @param {string} receipt_no The receipt_no
   * @returns {Promise<string>} The receipts data from uid
   * @memberof ReceiptService
   *
   */
  @Get(':uid/:receipt_no')
  @ApiOperation({ summary: 'get a receipt of a user' })
  @ApiResponse({
    status: 200,
    description: 'The receipt has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized.' })
  async getReceiptByReceiptNumber(
    @Param('uid') uid: string,
    @Param('receipt_no') receipt_no: string,
  ): Promise<any> {
    JSON.stringify(CreateReceiptDto);
    const receipts = await this.receiptService.getReceiptByReceiptNumber(
      uid,
      receipt_no,
    );

    return JSON.stringify(receipts);
  }

  //
  //miscellaneous APIs For Receipts
  //

  // Delete a receipt with
  /**
   * @description delete a receipt of a user by receipt_no
   * @param {string} uid The user id
   * @param {string} receipt_no The receipt_no
   * @returns {Promise<string>} The success on deletion of the receipt from uid
   * @memberof ReceiptService
   *
   */
  @ApiOperation({ summary: 'delete a receipt of a user' })
  @ApiResponse({
    status: 200,
    description: 'The receipt has been successfully delete.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized.' })
  @Delete('/:uid/:receipt_no')
  async deleteAReceipt(
    @Param('uid') uid: string,
    @Param('receipt_no') receipt_no: string,
  ): Promise<any> {
    // Put your magic here
    const deleteReceipt = await this.receiptService.deleteAReceipt(
      uid,
      receipt_no,
    );
    return JSON.stringify(deleteReceipt);
  }

  // Update attributes in a receipt
  @Patch('/:uid/:receipt_no')
  async updateAReceipt(
    @Param('uid') uid: string,
    @Param('receipt_no') receipt_no: string,
    @Body() updateData: any,
  ): Promise<any> {
    const updateReceipt = await this.receiptService.updateAReceipt(
      uid,
      receipt_no,
      updateData.updateReceiptData,
    );

    return JSON.stringify(updateReceipt);
  }
}
