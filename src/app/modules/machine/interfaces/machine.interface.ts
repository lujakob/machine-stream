import { Status } from './types';

export interface Machine {
  id: string;
  status: string;
  machine_type: string;
  longitude: number;
  latitude: number;
  last_maintenance: string;
  install_date: string;
  floor: number;
  events?: MachineEvent[];
}

export interface MachineEvent {
  timestamp: string;
  status: Status;
  is_highlighted?: boolean;
}
