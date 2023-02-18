import { Test, TestingModule } from '@nestjs/testing';
import { ProductDocument } from 'src/product/product.schema';
import { ProductService } from './../src/product/product.service';
import { Model } from 'mongoose';

describe('ProductService', () => {
  let productService: ProductService;
  let productModel: Model<ProductDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });
  //   productService = new ProductService(productModel);
  // productModel = new Model<ProductDocument>();

  describe('findAll', () => {
    it('should return an array of product', async () => {
      const result = [
        {
          _id: '63f05aa5e65ef13bf7d706f6',
          name: 'Burger',
          price: 5.99,
          amount: 1,
          description: 'A delicious burger',
          category: '1',
          picture: 'some-picture-here',
        },
        {
          _id: '63f05aa5e65ef13bf7d706f7',
          name: 'Water',
          price: 5.99,
          amount: 1,
          description: 'A delicious burger',
          category: '1',
          picture: 'some-picture-here',
        },
        {
          _id: '63f05aa5e65ef13bf7d706f8',
          name: 'Burger',
          price: 5.99,
          amount: 1,
          description: 'A delicious burger',
          category: '1',
          picture: 'some-picture-here',
        },
      ];
      jest
        .spyOn(productService, 'findAll')
        .mockImplementation(async () => result);

      expect(await productService.findAll()).toBe(result);
    });
  });
});
