import { TicketInterface } from 'interfaces/ticket';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VehicleInterface {
  id?: string;
  vehicle_number: string;
  entry_time: any;
  exit_time?: any;
  parking_cost?: number;
  cashier_id: string;
  created_at?: any;
  updated_at?: any;
  ticket?: TicketInterface[];
  user?: UserInterface;
  _count?: {
    ticket?: number;
  };
}

export interface VehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
  vehicle_number?: string;
  cashier_id?: string;
}
