import { PaginateModel, Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IGroup } from 'src/types/group.js';

export const groupSchema = new Schema<IGroup>(
  {
    group_id: {
      server: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
      _serialized: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    participants: [
      {
        participant_id: {
          server: String,
          user: String,
          _serialized: String,
        },
        isAdmin: Boolean,
        isSuperAdmin: Boolean,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
).plugin(mongoosePaginate);

const groupModel = model<IGroup, PaginateModel<IGroup>>('Group', groupSchema);

export default groupModel;
