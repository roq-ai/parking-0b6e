import * as yup from 'yup';

export const parkingSpaceValidationSchema = yup.object().shape({
  space_number: yup.string().required(),
  is_available: yup.boolean().required(),
  organization_id: yup.string().nullable().required(),
});
