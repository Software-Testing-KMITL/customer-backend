import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './create-product.dto';

export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
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
