import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreNftDTO {
  @ApiProperty({ description: 'NFT Name', example: 'CryptoArt' })
  @IsNotEmpty({ message: 'NFT name is required' })
  @IsString({ message: 'NFT name must be a string' })
  @MaxLength(255, { message: 'NFT name must be at most 255 characters long' })
  nftName: string;

  @ApiProperty({
    description: 'NFT Description',
    example: 'Exclusive digital artwork',
  })
  @IsNotEmpty({ message: 'NFT description is required' })
  @IsString({ message: 'NFT description must be a string' })
  @MaxLength(255, {
    message: 'NFT description must be at most 255 characters long',
  })
  nftDescription: string;

  @ApiProperty({
    description: 'NFT Logo URL',
    example: 'https://example.com/image.png',
  })
  @IsNotEmpty({ message: 'NFT logo URL is required' })
  @IsString({ message: 'NFT logo URL must be a string' })
  @MaxLength(255, {
    message: 'NFT logo URL must be at most 255 characters long',
  })
  nftLogoUrl: string;

  @ApiProperty({ description: 'NFT ID', example: 1010101010 })
  @IsNotEmpty({ message: 'NFT ID is required' })
  @IsNumber({}, { message: 'NFT ID must be a number' })
  nftID: number;

  @ApiProperty({ description: 'User Wallet Address', example: '0x123...' })
  @IsNotEmpty({ message: 'User wallet address is required' })
  @IsString({ message: 'User wallet address must be a string' })
  userWalletAddress: string;
}
