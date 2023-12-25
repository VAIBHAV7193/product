import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  author:string;
  price: number;
}

const productSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    author:{type:String,required:true},
    price: { type: Number, required: true },
  });

  export default mongoose.model<Product>('Product', productSchema);

