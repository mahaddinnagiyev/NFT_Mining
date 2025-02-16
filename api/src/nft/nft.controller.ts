import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { NftService } from './nft.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { StoreNftDTO } from './dto/store-nft.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post('/store')
  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: { ttl: 60, limit: 60, blockDuration: 90 },
  })
  @ApiOperation({ summary: 'Store NFT Data' })
  @ApiResponse({ status: 201, description: 'NFT data stored successfully.' })
  @ApiResponse({ status: 400, description: 'Failed to store NFT.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async storeNftData(@Body() data: StoreNftDTO) {
    return await this.nftService.storeNftData(data);
  }

  @Get('/get/:nftID')
  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: { ttl: 120, limit: 60, blockDuration: 90 },
  })
  @ApiOperation({ summary: 'Get NFT by ID' })
  @ApiResponse({ status: 200, description: 'NFT data fetched successfully.' })
  @ApiResponse({ status: 404, description: 'NFT not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getNftByID(@Param('nftID') id: number) {
    return await this.nftService.getNftByID(id);
  }

  @Get('/gallery/:userWalletAddress')
  @UseGuards(ThrottlerGuard)
  @Throttle({
    default: { ttl: 120, limit: 60, blockDuration: 90 },
  })
  @ApiOperation({ summary: 'Get NFT gallery by wallet address' })
  @ApiResponse({
    status: 200,
    description: 'NFT gallery fetched successfully.',
  })
  @ApiResponse({ status: 400, description: 'Failed to fetch NFT gallery.' })
  @ApiResponse({ status: 404, description: 'NFT gallery not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getNftGallery(@Param('userWalletAddress') userWalletAddress: string) {
    return await this.nftService.getNftGallery(userWalletAddress);
  }
}
