import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StoreNftDTO } from './dto/store-nft.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class NftService {
  constructor(
    private supabaseService: SupabaseService,
    private readonly logger: LoggerService,
  ) {}

  // Store NFT data
  async storeNftData(
    data: StoreNftDTO,
  ): Promise<{ success: boolean; statusCode: number; data: any }> {
    try {
      const supabase = this.supabaseService.getClient();
      const { data: insertedData, error } = await supabase
        .from('nfts')
        .insert(data)
        .single();

      if (error) {
        throw new BadRequestException({
          success: false,
          error: `Failed to store NFT data - ${error.message}`,
          statusCode: 400,
        });
      }

      await this.logger.info('NFT data stored successfully', 'NftService');

      return {
        success: true,
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      await this.logger.error(
        error.message,
        'NftService',
        'There was an error storing NFT data',
        error.stack,
      );
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to store NFT data - Due To Internal Server Error`,
      );
    }
  }

  // Get NFT by ID
  async getNftByID(
    id: number,
  ): Promise<{ success: boolean; statusCode: number; data: any }> {
    try {
      const supabase = this.supabaseService.getClient();
      const { data: nft, error } = await supabase
        .from('nfts')
        .select('*')
        .eq('nftID', id)
        .single();

      if (error || !nft) {
        throw new NotFoundException({
          success: false,
          message: `NFT Does not found with ID: ${id}`,
          statusCode: 404,
        });
      }

      await this.logger.info('NFT data fetched successfully', 'NftService');
      return {
        success: true,
        statusCode: 200,
        data: nft,
      };
    } catch (error) {
      await this.logger.error(
        error.message,
        'NftService',
        'There was an error fetching NFT data',
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException(
        `Failed to fetch NFT data - Due To Internal Server Error`,
      );
    }
  }

  // Get NFT gallery by user's wallet address
  async getNftGallery(
    userWalletAddress: string,
  ): Promise<{ success: boolean; statusCode: number; data: any[] }> {
    try {
      const supabase = this.supabaseService.getClient();
      const { data: nfts, error } = await supabase
        .from('nfts')
        .select('*')
        .eq('userWalletAddress', userWalletAddress);

      if (error) {
        throw new BadRequestException({
          success: false,
          error: `Failed to fetch NFT gallery - ${error.message}`,
          statusCode: 400,
        });
      }

      if (!nfts || nfts.length === 0) {
        throw new NotFoundException({
          success: false,
          message: `NFT gallery not found for userWalletAddress: ${userWalletAddress}`,
          statusCode: 404,
        });
      }

      await this.logger.info('NFT gallery fetched successfully', 'NftService');
      return {
        success: true,
        statusCode: 200,
        data: nfts,
      };
    } catch (error) {
      await this.logger.error(
        error.message,
        'NftService',
        'There was an error fetching NFT gallery',
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException(
        `Failed to fetch NFT gallery - Due To Internal Server Error`,
      );
    }
  }
}
