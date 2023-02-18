import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':productId')
  async getProductById(
    @Param('productId') productId: string,
  ): Promise<Product> {
    console.log(productId);
    return await this.productService.findById(productId);
  }
}
