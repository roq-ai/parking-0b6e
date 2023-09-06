import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReportInterface {
  id?: string;
  report_date: any;
  total_entries?: number;
  total_exits?: number;
  total_revenue?: number;
  manager_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ReportGetQueryInterface extends GetQueryInterface {
  id?: string;
  manager_id?: string;
}
