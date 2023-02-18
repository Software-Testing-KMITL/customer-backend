import { ProductService } from './../src/product/product.service';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(productService, 'findAll').mockImplementation(() => result);

      expect(await productService.findAll()).toBe(result);
    });
  });
});
