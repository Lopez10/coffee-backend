export interface Mapper<T> {
  toPersistence(entity: T);
  toDomain(record: any): T;
  toResponse(entity: T);
}
