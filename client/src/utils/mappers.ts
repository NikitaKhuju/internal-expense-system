// src/utils/mappers.ts
/**
 * Maps MongoDB documents with _id to frontend objects with id
 */
export const mapMongoDocument = <T extends { _id?: string; id?: string }>(
  doc: T
): T & { id: string } => {
  return {
    ...doc,
    id: doc._id || doc.id || "",
  };
};

/**
 * Maps array of MongoDB documents
 */
export const mapMongoDocuments = <T extends { _id?: string; id?: string }>(
  docs: T[]
): (T & { id: string })[] => {
  return docs.map(mapMongoDocument);
};

/**
 * Gets the ID from either _id or id field
 */
export const getId = (obj: { _id?: string; id?: string }): string => {
  return obj._id || obj.id || "";
};
