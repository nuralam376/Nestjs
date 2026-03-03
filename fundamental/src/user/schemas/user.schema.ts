import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from './address.schema';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ type: Address })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
