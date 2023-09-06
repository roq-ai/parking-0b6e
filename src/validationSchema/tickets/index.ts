import * as yup from 'yup';

export const ticketValidationSchema = yup.object().shape({
  ticket_number: yup.string().required(),
  issue_time: yup.date().required(),
  vehicle_id: yup.string().nullable().required(),
  cashier_id: yup.string().nullable().required(),
});
