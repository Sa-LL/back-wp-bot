import groupModel from '../models/group.model.js';
import { IGroup } from '../types/group.js';

function createGroup(group: IGroup) {
  const newGroup = new groupModel(group);
  return newGroup.save();
}

function getGroup(filters: IGroup, options: Record<string, unknown>) {
  return groupModel.paginate(filters, options);
}

function getGroupById(id: string) {
  return new Promise((resolve, reject) => {
    groupModel
      .findById(id)
      .exec()
      .then((result) => {
        if (result == null) {
          reject(new Error('Group not found', { cause: { type: 404 } }));
        }
        resolve(result);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

function updateGroup(id: string, group: IGroup) {
  return groupModel.findByIdAndUpdate(id, group, { new: true }).exec();
}

function deleteGroup(id: string) {
  return groupModel.findByIdAndDelete(id).exec();
}

export default {
  create: createGroup,
  get: getGroup,
  getById: getGroupById,
  update: updateGroup,
  delete: deleteGroup,
};
