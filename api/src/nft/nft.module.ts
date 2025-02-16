import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [SupabaseModule, LoggerModule],
  providers: [NftService],
  controllers: [NftController],
})
export class NftModule {}
