import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({
    description: 'Response all products',
    type: Product,
    isArray: true
  })
  @Get()
  async getAllProducts() {
    const products = await this.productService.findAll();
    return {
      status: {
        code: 200,
        message: 'get products successfully',
      },
      products: [products],
    };
  }

  @Get(':productId')
  async getProductById(@Param('productId') productId: string) {
    const product = await this.productService.findById(productId);
    return {
      status: {
        code: 200,
        message: 'get specific product successfully',
      },
      product,
    };
  }
}
