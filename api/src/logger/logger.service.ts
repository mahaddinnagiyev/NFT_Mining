import { Injectable } from '@nestjs/common';
import { LogLevels } from 'src/enums/logLevel.emun';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class LoggerService {
  constructor(private supabaseService: SupabaseService) {}

  private async log(
    level: LogLevels,
    message: string,
    module: string,
    details?: string,
    stack?: string,
  ) {
    const { error } = await this.supabaseService
      .getClient()
      .from('logs')
      .insert({
        level,
        message,
        module,
        details,
        stack,
        created_at: new Date().toISOString(),
      });

    if (error) {
      throw error;
    }
  }

  async emerg(
    message: string,
    module: string,
    details?: string,
    stack?: string,
  ) {
    return this.log(LogLevels.emerg, message, module, details, stack);
  }

  async alert(
    message: string,
    module: string,
    details?: string,
    stack?: string,
  ) {
    return this.log(LogLevels.alert, message, module, details, stack);
  }

  async crit(
    message: string,
    module: string,
    details?: string,
    stack?: string,
  ) {
    return this.log(LogLevels.crit, message, module, details, stack);
  }

  async error(
    message: string,
    module: string,
    details?: string,
    stack?: string,
  ) {
    return this.log(LogLevels.error, message, module, details, stack);
  }

  async warn(
    message: string,
    module: string,
    details?: string,
    stack?: string,
  ) {
    return this.log(LogLevels.warn, message, module, details, stack);
  }

  async notice(
    message: string,
    module: string,
    details?: string,
    stack?: string,
  ) {
    return this.log(LogLevels.notice, message, module, details, stack);
  }

  async info(
    message: string,
    module: string,
    details?: string,
    stack?: string,
  ) {
    return this.log(LogLevels.info, message, module, details, stack);
  }

  async debug(
    message: string,
    module: string,
    details?: string,
    stack?: string,
  ) {
    return this.log(LogLevels.debug, message, module, details, stack);
  }
}
