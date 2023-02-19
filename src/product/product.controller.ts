import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseProductsProfileDto, ResponseProductProfileDto } from './dtos/product-response.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({
    description: 'Response all products',
    type: ResponseProductsProfileDto,
  })
  @Get()
  async getAllProducts(@Query() query: { page: number; perPage: number }) {
    const products = await this.productService.findAll();
    const { page, perPage } = query;

    // check if there are enough products to display
    if (page * perPage > products.length) {
      return { status: { code: 404, message: 'no product to display' } };
    }

    return {
      status: {
        code: 200,
        message: 'get products successfully',
      },
      products: [products],
    };
  }

  @ApiOkResponse({
    description: 'Response all products',
    type: ResponseProductProfileDto,
  })
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
