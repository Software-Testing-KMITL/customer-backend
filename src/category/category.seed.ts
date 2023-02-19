import { Command } from 'nestjs-command';

import { Injectable } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/category.dto';

@Injectable()
export class CategorySeed {
  constructor(private readonly categoryService: CategoryService) {}

  @Command({ command: 'create:category', describe: 'create category' })
  async create() {
    //TODO: seeding with multiple categories
    const category: CreateCategoryDto = {
      name: 'Category 1',
    };
    // const categories: CreateCategoryDto[] = [
    //   {
    //     name: 'Category 1',
    //   },
    //   {
    //     name: 'Category 2',
    //   },
    //   {
    //     name: 'Category 3',
    //   },
    //   {
    //     name: 'Category 4',
    //   },
    // ];

    // categories.forEach(async (category) => {
    await this.categoryService.create(category);
    // });
  }
}
