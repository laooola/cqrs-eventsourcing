import { StorableEvent } from './storable-event';

interface IEventData {
  value: string;
}

interface IEventMetaData {
  version: string;
}

class Event extends StorableEvent<IEventData, IEventMetaData> {
  constructor(streamName: string, data: IEventData, metadata: IEventMetaData) {
    super(streamName, data, metadata);
  }
}

describe('StorableEvent', () => {
  const raw = {
    id: '623cfc2f-f01c-4f80-8403-4efb90e9cfb0',
    stream_name: 'event-123',
    type: 'Event',
    data: { value: 'abc' },
    metadata: { version: '1.0' },
    time: '2020-09-01T12:26:19.089Z',
  };

  const event = new Event('event-123', { value: 'abc' }, { version: '1.0' });
  event.id = raw.id;
  event.time = new Date(raw.time);

  describe('fromRaw', () => {
    it('creates an event object from the raw event', () => {
      const e = Event.fromRaw<IEventData, IEventMetaData>(raw);
      expect(e).toBeInstanceOf(Event);
      expect(e).toEqual(event);
    });
  });

  describe('toRaw', () => {
    it('creates a raw event from the event object', () => {
      const r = event.toRaw();
      expect(r).toEqual(raw);
    });
  });
});
