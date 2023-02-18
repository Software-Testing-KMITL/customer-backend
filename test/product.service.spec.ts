import { Product } from './../src/product/product.schema';
import { ProductDocument } from 'src/product/product.schema';
import { ProductService } from './../src/product/product.service';
import { Model } from 'mongoose';

describe('ProductService', () => {
    let productService: ProductService;
    let productModel: Model<ProductDocument>,

        beforeEach(() => {
        
    productModel = new Model<ProductDocument>,
    productService = new ProductService(productModel),
  });

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
