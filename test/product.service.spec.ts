import { Test,TestingModule } from '@nestjs/testing';
import { ProductDocument } from 'src/product/product.schema';
import { ProductService } from './../src/product/product.service';
import { Model } from 'mongoose';

describe('ProductService', () => {
  let productService: ProductService;
  let productModel: Model<ProductDocument>,
  
    beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });
    //   productService = new ProductService(productModel);
// productModel = new Model<ProductDocument>();

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest
        .spyOn(productService, 'getAllProducts')
        .mockImplementation(() => result);

      expect(await productService.getAllProducts()).toBe(result);
    });
  });
});
