import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseCategoriesDto } from './dtos/category-response.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({
    description: 'Response all categories',
    type: ResponseCategoriesDto,
    isArray: true,
  })
  @Get()
  async getAllCategory() {
    const categories = await this.categoryService.findAll();
    return {
      status: {
        code: 200,
        message: 'get categories successfully',
      },
      categories: [categories],
    };
  }
}
