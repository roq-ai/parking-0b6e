import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ParkingSpaceInterface {
  id?: string;
  space_number: string;
  is_available: boolean;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface ParkingSpaceGetQueryInterface extends GetQueryInterface {
  id?: string;
  space_number?: string;
  organization_id?: string;
}
