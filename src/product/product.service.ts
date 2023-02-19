import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '../category/schemas/category.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll() {
    // populate category field with name and exclude _id
    const products: (Product & { _id: string })[] = await this.productModel.find().populate('category', 'name -_id');
    return products.map((product) => {
      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        amount: product.amount,
        description: product.description,
        category: product.category.map((category) => category.name),
        picture: product.picture,
      };
    });
  }

  async findById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async create(product: CreateProductDto) {
    const newProduct = new this.productModel({
      ...product,
    });

    await newProduct.save();

    return {
      newProduct,
    };
  }
}
