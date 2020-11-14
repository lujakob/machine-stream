import { Status } from './types';

export interface FeedEvent {
  machine_id: string;
  id: string;
  timestamp: string;
  status: Status;
}
