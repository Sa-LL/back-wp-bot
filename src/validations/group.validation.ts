import yup from 'yup';

const contactID = yup.object({
  server: yup.string().trim(),
  user: yup.string().trim(),
  _serialized: yup.string().trim(),
});

const group_id = contactID;
const name = yup.string().trim().min(1).max(100);
const description = yup.string().min(0).max(2048);
const participants = yup.array().of(
  yup.object({
    participant_id: contactID,
    isAdmin: yup.boolean(),
    isSuperAdmin: yup.boolean(),
  })
);

const createGroupSchemaYUP = yup.object({
  group_id: group_id.required(),
  name: name.required(),
  description: description.default(''),
  participants: participants.default([]),
});

const patchGroupSchemaYUP = yup.object({
  group_id,
  name,
  description,
  participants,
});

export default {
  createGroupSchemaYUP,
  patchGroupSchemaYUP,
};
