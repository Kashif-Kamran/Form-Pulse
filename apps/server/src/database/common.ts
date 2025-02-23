export const toJSONSchemaConfig = {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
  },
} as const;

export const toObjectSchemaConfig = {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
  },
} as const;
