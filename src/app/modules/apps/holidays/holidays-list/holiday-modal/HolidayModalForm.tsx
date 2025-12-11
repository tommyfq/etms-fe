import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Holiday, initialHoliday} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {TableListLoading} from '../../../../../components/TableListLoading'
import {createHoliday, updateHoliday } from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  isUserLoading: boolean
  holiday: Holiday
}

const MySwal = withReactContent(Swal);

const editHolidaySchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  date: Yup.string().required('Date is required'),
})

const HolidayModalForm: FC<Props> = ({holiday, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [holidayForEdit] = useState<Holiday>({
    ...holiday,
    id: holiday.id || initialHoliday.id,
    name: holiday.name || initialHoliday.name,
    date: holiday.date || initialHoliday.date,
    is_active: holiday.is_active ?? initialHoliday.is_active ?? false
  })

  const handleAlert = (response:{is_ok:boolean, message:string}) => {
    let title = "Error!";
    let icon:SweetAlertIcon= "error";
    const buttonText = 'Close'
    if(response.is_ok){
      title = "Success!"
      icon = "success"
    }

    MySwal.fire({
      title: title,
      text: response.message,
      icon: icon,
      confirmButtonText: buttonText,
    }).then((result) => {
      if (result.isConfirmed) {
        cancel(response.is_ok)
      }
    })
  };

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
      setItemIdForUpdate(undefined)
    }
  }

  const formik = useFormik({
    initialValues: holidayForEdit,
    validationSchema: editHolidaySchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const response = values.id !== 0 ? await updateHoliday(values) : await createHoliday(values);
        handleAlert({is_ok: response.is_ok, message: response.message});
      } catch (ex) {
        console.error(ex);
        handleAlert({is_ok: false, message: "Failed to save holiday"});
      } finally {
        setSubmitting(false);
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_holiday_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_holiday_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_holiday_header'
          data-kt-scroll-wrappers='#kt_modal_add_holiday_scroll'
          data-kt-scroll-offset='300px'
        >
            <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Name</label>
                <input
                placeholder='Holiday name'
                {...formik.getFieldProps('name')}
                type='text'
                name='name'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.name && formik.errors.name},
                    {
                    'is-valid': formik.touched.name && !formik.errors.name,
                    }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.name}</span>
                    </div>
                </div>
                )}
            </div>

            <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Date</label>
                <input
                placeholder='Holiday date'
                {...formik.getFieldProps('date')}
                type='date'
                name='date'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.date && formik.errors.date},
                    {
                    'is-valid': formik.touched.date && !formik.errors.date,
                    }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.date && formik.errors.date && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.date}</span>
                    </div>
                </div>
                )}
            </div>


          <div className="fv-row mb-7">
            <label className='required fw-bold fs-6 mb-2'>Status</label>
            <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
              <input
                className='form-check-input'
                type='checkbox'
                name='is_active'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.is_active}
              />
              <label className='form-check-label'>Active</label>
            </div>
          </div>
        </div>

        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel(true)}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isUserLoading) && <TableListLoading />}
    </>
  )
}

export {HolidayModalForm}