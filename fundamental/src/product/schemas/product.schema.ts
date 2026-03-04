import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tag } from './tag.schema';

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop({ type: [Tag] })
  tags: Tag[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
