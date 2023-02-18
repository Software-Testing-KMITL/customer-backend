import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryModel: Model<CategoryDocument>) {}

  //TODO: add api docs
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async create(category: CreateCategoryDto) {
    const newCategory = new this.categoryModel(category);
    await newCategory.save();
    return newCategory;
  }
}
