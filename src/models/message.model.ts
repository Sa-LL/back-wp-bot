import { model, Schema } from 'mongoose';
import { IMessage, IOptions } from 'src/types/message.js';

const optionsSubSchema = new Schema<IOptions>({
  is_random: {
    type: Boolean,
    required: false,
  },
  reading_type: {
    type: Number,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
});

export const messageSchema = new Schema<IMessage>({
  trigger: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  options: {
    type: optionsSubSchema,
    required: false,
    default: {},
  },
});

const messageModel = model<IMessage>('Message', messageSchema);

export default messageModel;
