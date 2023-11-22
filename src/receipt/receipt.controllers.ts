import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { SupabaseGuard } from 'src/supabase/supabase-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';

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
  @UseGuards(SupabaseGuard)
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
  @UseGuards(SupabaseGuard)
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
  @UseGuards(SupabaseGuard)
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
  @UseGuards(SupabaseGuard)
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
  @UseGuards(SupabaseGuard)
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
  /**
   * @description delete a receipt of a user by receipt_no
   * @param {string} uid The user id
   * @param {string} receipt_no The receipt_no
   * @param {any} updateData The update data
   * @returns {Promise<string>} The success on deletion of the receipt from uid
   * @memberof ReceiptService
   *
   */
  @ApiOperation({ summary: 'Update a receipt of a user' })
  @ApiResponse({
    status: 200,
    description: 'All updates have been successfully made.',
  })
  @ApiResponse({
    status: 201,
    description: 'No Error in updating the receipts.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized.' })
  @Patch('/:uid/:receipt_no')
  @UseGuards(SupabaseGuard)
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

  // Filter by attributes in a receipt
  /**
   * @description filter a receipt of by date range and type
   * @param {string} uid The user id
   * @param {string} startDate The start date
   * @param {string} endDate The end date
   * @param {string} receiptType The receipt type
   * @returns {Promise<string>} The All receipts that match the filter
   * @memberof ReceiptService
   *
   */
  @ApiOperation({ summary: 'filter a receipt of by date range and type' })
  @ApiResponse({
    status: 200,
    description: 'All receipt that meet the criterias.',
  })
  @ApiResponse({
    status: 201,
    description: 'No receipt found.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized.' })
  @Get('filter/:uid/:startDate&:endDate/:receiptType')
  @UseGuards(SupabaseGuard)
  async filterReceipts(
    @Param('uid') uid: string,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @Param('receiptType') receiptType: string,
  ): Promise<any> {
    const filterReceipts = await this.receiptService.filterReceipts(
      uid,
      startDate,
      endDate,
      receiptType,
    );

    return JSON.stringify(filterReceipts);
  }

  // Search by attributes in a receipt
  /**
   * @description search a receipt
   * @param {string} uid The user id
   * @param {string} search The search string
   * @returns {Promise<string>} The All receipts that match the search
   * @memberof ReceiptService
   *
   */
  @ApiOperation({ summary: 'search a receipt' })
  @ApiResponse({
    status: 200,
    description: 'All receipt that match the search.',
  })
  @ApiResponse({
    status: 201,
    description: 'No receipt found.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized.' })
  @Get('search/:uid/:search')
  @UseGuards(SupabaseGuard)
  async searchForReceipt(
    @Param('uid') uid: string,
    @Param('search') search: string,
  ): Promise<any> {
    const searchReceipt = await this.receiptService.searchForReceipt(
      uid,
      search,
    );
    return JSON.stringify(searchReceipt);
  }

  // Retreive data of a receipt
  /**
   * @description google ai a receipt
   * @param {string} _formData The search string
   * @returns {Promise<string>} The All receipts that match the search
   * @memberof ReceiptService
   *
   */
  @ApiOperation({ summary: 'get data from receipt' })
  @ApiResponse({
    status: 200,
    description: 'Data From Google AI Document.',
  })
  @ApiResponse({
    status: 201,
    description: 'No Data found.',
  })
  @ApiResponse({ status: 403, description: 'Unauthorized.' })
  // @Post('upload')
  // @UseGuards(SupabaseGuard)
  // async getDataOfReceiptFromGoogleApi(
  //   @Param('FormData') FormData: any,
  //   @Body() _formData: any,
  // ): Promise<any> {
  //   console.log('Formdata got from ', FormData);
  //   console.log('Form data got from ', _formData);
  //   const DataFromGoogleAI =
  //     await this.receiptService.getDataOfReceiptFrocmGoogleApi(FormData);
  //   return JSON.stringify(DataFromGoogleAI);
  // }
  @Post('upload')
  @UseInterceptors(FileInterceptor('invoice'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    console.log(file);
    try {
      // Perform authorization checks here using the authorization header
      if (!file) {
        return { success: false, message: 'No file uploaded' };
      }
      const fileBlob = Buffer.from(file.buffer);
      const blobFile = new Blob([fileBlob], { type: file.mimetype });

      const formData = new FormData();
      formData.append('invoice', blobFile);

      const response = await axios.post(
        'http://localhost:8000/extract-invoice',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(response);
      // Process the uploaded file (e.g., save to disk or perform other operations)
      // const DataFromGoogleAI =
      //   await this.receiptService.getDataOfReceiptFromGoogleApi(file);
      // return JSON.stringify(DataFromGoogleAI);
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error uploading file' };
    }
  }
}
