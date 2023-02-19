import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from '../category/schemas/category.schema';

const productModel = {
  find: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
};

const categoryModel = {
  find: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
}

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
        {
          provide: getModelToken(Category.name),
          useValue: categoryModel
        }
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      // Given
      const mockProducts = [
        {
          id: '1',
          name: 'Product 1',
          category: [
            {
              name: 'Category 1'
            },
            {
              name: 'Category 2'
            }
          ],
          description: 'Description 1',
          price: 100,
          amount: 10,
          picture: 'image1.jpg',
        },
        {
          id: '2',
          name: 'Product 2',
          category: [
            {
              name: 'Category 1'
            }
          ],
          description: 'Description 2',
          price: 100,
          amount: 50,
          picture: 'image2.jpg',
        },
      ];
      productModel.find.mockReturnValueOnce({
        populate: (_1: never, _2: never) => mockProducts
      });

      // When
      const actual = await productService.findAll();

      // Then
      const excepted = [
        {
          ...mockProducts[0],
          category: ['Category 1', 'Category 2']
        },
        {
          ...mockProducts[1],
          category: ['Category 1']
        }
      ]

      expect(actual).toEqual(excepted);
    });
  });

  describe('findById', () => {
    it('should return product of the given id', async () => {
      // Given
      const mockProduct = {
        id: '1',
        name: 'Product 1',
        category: [
          {
            name: 'Category 1'
          },
          {
            name: 'Category 2'
          }
        ],
        description: 'Description 1',
        price: 100,
        amount: 10,
        picture: 'image1.jpg',
      }

      productModel.findById.mockReturnValueOnce({
        populate: (_1: never, _2: never) => mockProduct
      })
      const id = '1'

      // When
      const actual = await productService.findById(id)

      // Then
      const excepted = {
        ...mockProduct,
        category: ['Category 1']
      }

      expect(actual).toEqual(excepted)
    })
  })
});
