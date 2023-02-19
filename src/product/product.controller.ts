import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseProductsProfileDto, ResponseProductProfileDto } from './dtos/product-response.dto';
import JwtAccessGuard from 'src/shared/guards/jwt-access.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //TODO: add api docs for query params
  @ApiOkResponse({
    description: 'Response all products',
    type: ResponseProductsProfileDto,
  })
  @Get()
  async getAllProducts(@Query() query: { page: number; perPage: number }) {
    const products = await this.productService.findAll();
    console.log(products[0]);
    const { page, perPage } = query;

    // check if page and perPage are provided
    if (page && perPage) {
      // check if there are enough products to display
      if ((page - 1) * perPage >= products.length) {
        //TODO: this response status code is still 200 but we can talk more about this
        return { status: { code: 404, message: 'no product to display' } };
      } else {
        // return products based on page and perPage
        return {
          status: {
            code: 200,
            message: 'get products successfully',
          },
          products: products.slice((page - 1) * perPage, page * perPage),
        };
      }
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
  @UseGuards(JwtAccessGuard)
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
