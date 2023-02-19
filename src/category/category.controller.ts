import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({
    description: 'Response all categories',
    type: Category,
    isArray: true,
  })
  @Get()
  async getAllCategory(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }
}
