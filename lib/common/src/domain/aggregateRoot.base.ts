import { Entity } from './entity.base';
import { ID } from './valueObject';
import { DomainEvents, IDomainEvent } from './events';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents = [];

  get id(): ID {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
