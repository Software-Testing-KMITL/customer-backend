import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get()
  async getAllProducts(): Promise<string> {
    return 'all products';
  }
}
