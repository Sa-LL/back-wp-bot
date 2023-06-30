import messageModel from 'src/models/message.model.js';
import { IMessage } from 'src/types/message.js';

function createMessage(message: IMessage) {
  const newMessage = new messageModel(message);
  return newMessage.save();
}

function getMessages(filters: Partial<IMessage>) {
  return messageModel.find(filters).exec();
}

export default {
  create: createMessage,
  get: getMessages,
};
