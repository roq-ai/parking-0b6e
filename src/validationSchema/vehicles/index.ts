import * as yup from 'yup';

export const vehicleValidationSchema = yup.object().shape({
  vehicle_number: yup.string().required(),
  entry_time: yup.date().required(),
  exit_time: yup.date().nullable(),
  parking_cost: yup.number().integer().nullable(),
  cashier_id: yup.string().nullable().required(),
});
