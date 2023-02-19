import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find();
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
