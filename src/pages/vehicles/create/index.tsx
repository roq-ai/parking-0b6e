import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createVehicle } from 'apiSdk/vehicles';
import { vehicleValidationSchema } from 'validationSchema/vehicles';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { VehicleInterface } from 'interfaces/vehicle';

function VehicleCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VehicleInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVehicle(values);
      resetForm();
      router.push('/vehicles');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VehicleInterface>({
    initialValues: {
      vehicle_number: '',
      entry_time: new Date(new Date().toDateString()),
      exit_time: new Date(new Date().toDateString()),
      parking_cost: 0,
      cashier_id: (router.query.cashier_id as string) ?? null,
    },
    validationSchema: vehicleValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Vehicles',
              link: '/vehicles',
            },
            {
              label: 'Create Vehicle',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Vehicle
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.vehicle_number}
            label={'Vehicle Number'}
            props={{
              name: 'vehicle_number',
              placeholder: 'Vehicle Number',
              value: formik.values?.vehicle_number,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="entry_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Entry Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.entry_time ? new Date(formik.values?.entry_time) : null}
              onChange={(value: Date) => formik.setFieldValue('entry_time', value)}
            />
          </FormControl>
          <FormControl id="exit_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Exit Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.exit_time ? new Date(formik.values?.exit_time) : null}
              onChange={(value: Date) => formik.setFieldValue('exit_time', value)}
            />
          </FormControl>

          <NumberInput
            label="Parking Cost"
            formControlProps={{
              id: 'parking_cost',
              isInvalid: !!formik.errors?.parking_cost,
            }}
            name="parking_cost"
            error={formik.errors?.parking_cost}
            value={formik.values?.parking_cost}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('parking_cost', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'cashier_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/vehicles')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'vehicle',
    operation: AccessOperationEnum.CREATE,
  }),
)(VehicleCreatePage);
