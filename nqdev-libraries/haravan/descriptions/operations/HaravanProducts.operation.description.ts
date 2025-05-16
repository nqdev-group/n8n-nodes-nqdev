import type { INodeProperties } from "n8n-workflow";

export const haravanProductsOperationModel: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'products'
        ]
      }
    },
    options: [
      {
        name: 'Get All Products',
        value: 'getAllProducts',
        description: 'Retrieve a list of products',
        action: 'Get all products',
      },
      {
        name: 'Get Product Count',
        value: 'getProductCount',
        description: 'Retrieve a count of the products',
        action: 'Get product count',
      },
      {
        name: 'Get Product',
        value: 'getProduct',
        description: 'Retrieves the details of a single product',
        action: 'Get a product by ID',
      },
      {
        name: 'Create Product',
        value: 'createProduct',
        description: 'Create a new product',
        action: 'Create a product',
      },
      {
        name: 'Update Product',
        value: 'updateProduct',
        description: 'Update a product',
        action: 'Update an existing product',
      },
      {
        name: 'Delete Product',
        value: 'deleteProduct',
        description: 'Delete a product along with all its variants and images',
        action: 'Delete a product',
      },
      {
        name: 'Get All Collects',
        value: 'getAllCollects',
        description: 'Retrieve a list of collects',
        action: 'Get all collects',
      },
      {
        name: 'Get Collect Count',
        value: 'getCollectCount',
        description: 'Retrieve a count of all collects',
        action: 'Get collect count',
      },
      {
        name: 'Get Collect',
        value: 'getCollect',
        description: 'Retrieve detail of a collect',
        action: 'Get a collect by ID',
      },
      {
        name: 'Create Collect',
        value: 'createCollect',
        description: 'Create a new collect',
        action: 'Create collect',
      },
      {
        name: 'Delete Collect',
        value: 'deleteCollect',
        description: 'Delete a collect',
        action: 'Delete a collect by ID',
      },
    ],
    default: 'getAllProducts',
  }
];
