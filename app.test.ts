import {request} from 'supertest';
import mongoose from 'mongoose';
import app from './index';
import Product from './model'
import {test,expect,describe,beforeAll,afterAll,afterEach} from '@jest/globals'



describe('Book Api Endpoints',()=>{
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://vaibhav7193:Shiv7397844034@vaibhav0.kprze0e.mongodb.net/mycontacts-backend?retryWrites=true&w=majority');
      });
      afterAll(async () => {
        // Disconnect from the test database after all tests are complete
        await mongoose.connection.close();
      });
      afterEach(async () => {
        // Clear the Product collection after each test
        await Product.deleteMany({});
      });
      
      test('should retrieve the list of products', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });
    
   test("should respond with status code 201",async()=>{
    const new_Product = {
        name: 'New Product',
        description: 'New Description',
        author:'author',
        price: 19.99,
    }
    const response = await request(app).post('/api/products').send(new_Product)
     expect(response.status).toBe(201);
    expect(response.body.name).toBe('New Product');
    
   });
   it('should handle validation error for creating a new product with missing fields', async () => {
    const invalidProduct = {
      // Missing the 'name' field
      description: 'Invalid Description',
      //missing a author field
      price: 19.99,
    };

    const response = await request(app)
      .post('/api/products')
      .send(invalidProduct);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Product validation failed');
  });

})