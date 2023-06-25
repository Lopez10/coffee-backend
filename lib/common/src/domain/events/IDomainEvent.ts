import { ID } from '../valueObject';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): ID;
}
