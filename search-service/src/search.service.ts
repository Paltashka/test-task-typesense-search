import { Injectable } from '@nestjs/common';
import * as Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SearchService {
  private client: Typesense.Client;

  constructor() {
    this.client = new Typesense.Client({
      nodes: [
        {
          host: 'localhost',
          port: 8108,
          protocol: 'http',
        },
      ],
      apiKey: 'ABC123XYZ789qwertiop456',
    });
  }

  async createProductsCollection(): Promise<void> {
    const collectionName = 'products';
    try {
      await this.client.collections(collectionName).retrieve();
      console.log(`Collection "${collectionName}" already exists.`);
    } catch (error) {
        const schema: CollectionCreateSchema = {
          name: collectionName,
          fields: [
            { name: 'id', type: 'string' },
            { name: 'name', type: 'string', index: true },
          ],
        };

        await this.client.collections().create(schema);
        console.log(`Collection created: ${collectionName}`);
    }
  }

  async indexProducts(): Promise<void> {
    try {
      const retrievedProducts = await this.client.collections("products").retrieve();
      if(retrievedProducts) return;
      const jsonFilePath = path.join('src/openfoodfacts.json');
      const rawData = fs.readFileSync(jsonFilePath, 'utf8');
      const jsonData = JSON.parse(rawData);
      const products = jsonData.products;

      const documents = products.map((product: any) => ({
        id: product._id,
        name: product.product_name,
      }));

      await this.client.collections('products').documents().import(documents);
      console.log('Products indexed successfully.');
    } catch (error) {
      console.error('Error indexing products:', error);
      throw error;
    }
  }

  async searchProducts(query: string): Promise<any> {
    await this.createProductsCollection();
    await this.indexProducts();
    try {
      const searchParameters = {
        q: query,
        query_by: 'name',
      };
      const typesenseResults = await this.client
        .collections('products')
        .documents()
        .search(searchParameters);
      return {
        typesenseResults: typesenseResults.hits,
      };
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  }
}
