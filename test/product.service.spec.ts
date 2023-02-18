import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './../src/product/product.service';
import { ProductController } from './../src/product/product.controller';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ProductSchema } from './../src/product/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './../src/product/product.schema';

// import { Model } from 'mongoose';
const mappingModel = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
};
describe('ProductService', () => {
  let productService: ProductService;
  let productController: ProductController;
  let model: typeof mappingModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: mappingModel,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productController = module.get<ProductController>(ProductController);
    model = module.get(getModelToken('Product'));
  });
  describe('findById', () => {
    it('should return a product by Id', async () => {
      const result = 1;

      console.log(await productService.findById('63f05aa5e65ef13bf7d706f6'));
      console.log(result);

      expect(
        (await productService.findById('63f05aa5e65ef13bf7d706f6')).amount,
      ).toBe(result);
    });
  });
});
