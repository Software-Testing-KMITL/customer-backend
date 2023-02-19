import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';

const productModel = {
  find: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
};

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: productModel,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          price: 100,
          amount: 10,
          picture: 'image1.jpg',
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Description 2',
          price: 100,
          amount: 50,
          picture: 'image2.jpg',
        },
      ];
      productModel.find.mockResolvedValueOnce(mockProducts);

      const actual = await productService.findAll();

      expect(actual).toBe(mockProducts);
    });
  });
});
