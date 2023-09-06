import axios from 'axios';
import queryString from 'query-string';
import { TicketInterface, TicketGetQueryInterface } from 'interfaces/ticket';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTickets = async (query?: TicketGetQueryInterface): Promise<PaginatedInterface<TicketInterface>> => {
  const response = await axios.get('/api/tickets', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTicket = async (ticket: TicketInterface) => {
  const response = await axios.post('/api/tickets', ticket);
  return response.data;
};

export const updateTicketById = async (id: string, ticket: TicketInterface) => {
  const response = await axios.put(`/api/tickets/${id}`, ticket);
  return response.data;
};

export const getTicketById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tickets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTicketById = async (id: string) => {
  const response = await axios.delete(`/api/tickets/${id}`);
  return response.data;
};
