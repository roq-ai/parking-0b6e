import * as yup from 'yup';

export const reportValidationSchema = yup.object().shape({
  report_date: yup.date().required(),
  total_entries: yup.number().integer().nullable(),
  total_exits: yup.number().integer().nullable(),
  total_revenue: yup.number().integer().nullable(),
  manager_id: yup.string().nullable().required(),
});
