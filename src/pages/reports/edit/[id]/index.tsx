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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getReportById, updateReportById } from 'apiSdk/reports';
import { reportValidationSchema } from 'validationSchema/reports';
import { ReportInterface } from 'interfaces/report';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function ReportEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ReportInterface>(
    () => (id ? `/reports/${id}` : null),
    () => getReportById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ReportInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateReportById(id, values);
      mutate(updated);
      resetForm();
      router.push('/reports');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ReportInterface>({
    initialValues: data,
    validationSchema: reportValidationSchema,
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
              label: 'Reports',
              link: '/reports',
            },
            {
              label: 'Update Report',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Report
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="report_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Report Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.report_date ? new Date(formik.values?.report_date) : null}
              onChange={(value: Date) => formik.setFieldValue('report_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Total Entries"
            formControlProps={{
              id: 'total_entries',
              isInvalid: !!formik.errors?.total_entries,
            }}
            name="total_entries"
            error={formik.errors?.total_entries}
            value={formik.values?.total_entries}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_entries', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Exits"
            formControlProps={{
              id: 'total_exits',
              isInvalid: !!formik.errors?.total_exits,
            }}
            name="total_exits"
            error={formik.errors?.total_exits}
            value={formik.values?.total_exits}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_exits', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Revenue"
            formControlProps={{
              id: 'total_revenue',
              isInvalid: !!formik.errors?.total_revenue,
            }}
            name="total_revenue"
            error={formik.errors?.total_revenue}
            value={formik.values?.total_revenue}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_revenue', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'manager_id'}
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
              onClick={() => router.push('/reports')}
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
    entity: 'report',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ReportEditPage);
