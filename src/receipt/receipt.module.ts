import { ReceiptService } from './receipt.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReceiptController } from './receipt.controllers';
// import { JwtSupabaseAuthGuard } from './guards/jwt-supabase-auth.guard';
// import { LocalSupabaseAuthGuard } from './guards/local-supabase-auth.guard';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { SupabaseStrategy } from './strategies/supabase.strategy';
import { SupabaseModule } from '../supabase/supabase.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, SupabaseModule, HttpModule],
  controllers: [ReceiptController],
  providers: [
    ReceiptService,
    // SupabaseStrategy,
    // JwtStrategy,
    // LocalSupabaseAuthGuard,
    // JwtSupabaseAuthGuard,
  ],
  exports: [
    ReceiptService,
    // SupabaseStrategy,
    // JwtStrategy,
    // LocalSupabaseAuthGuard,
    // JwtSupabaseAuthGuard,
  ],
})
export class ReceiptModule {}
