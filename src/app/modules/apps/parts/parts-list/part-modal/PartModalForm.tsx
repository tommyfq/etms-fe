
import {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
// import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {Part, initialPart} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {TableListLoading} from '../../../../../components/TableListLoading'
import {createPart, updatePart } from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {ModalResultForm} from '../../../../../components/ModalResultForm'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  isUserLoading: boolean
  item: Part
}

const MySwal = withReactContent(Swal);

// const customStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     backgroundColor: '#f8f9fa',
//     border: state.isFocused ? '0px solid #DBDFE9' : '0px solid #DBDFE9',
//     boxShadow: 'none',
//     fontFamily: 'Inter, Helvetica, sans-serif',
//     fontSize: '14px',
//     fontWeight: '600',
//     color:'#99a1b7',
//   }),
//   menu: (provided) => ({
//     ...provided,
//     position: 'absolute',
//     zIndex: 9999,
//     borderRadius: '4px',
//     border: '1px solid #ced4da',
//     marginTop: '0',
//     fontFamily: 'Inter, Helvetica, sans-serif',
//     fontSize: '13px',
//     fontWeight: '400',
//     //color:'#99a1b7',
//   }),
//   menuPortal: (provided) => ({
//     ...provided,
//     zIndex: 9999,
//     position: 'fixed', // Make the dropdown menu fixed
//     top: `${provided.top}px`, // Use calculated position from react-select
//     left: `${provided.left}px`, // Use calculated position from react-select
//     width: provided.width,  // Ensure the width matches the control
//     //color:'#99a1b7',
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     fontFamily: 'Inter, Helvetica, sans-serif',
//     fontSize: '13px',
//     fontWeight: '400',
//     color:'#99a1b7',
//   }),
//   indicatorSeparator: () => ({
//     display: 'none'  // Remove the vertical line before the dropdown arrow
//   })
// };

const editUserSchema = Yup.object().shape({
  // email: Yup.string()
  //   .email('Wrong email format')
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')s
  //   .required('Email is required'),
  part_name: Yup.string().required('Part Name is required')
})

const CaseCategoryModalForm: FC<Props> = ({item, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  // const [roleOptions, setRoleOptions] = useState<any[]>([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  
  const [userForEdit] = useState<Part>({
    ...item,
    id: item.id || initialPart.id,
  part_name: item.part_name || initialPart.part_name,
  is_active: item.is_active ?? initialPart.is_active ?? false
  })

  useEffect(() => {
    
  }, [])

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
    }else{
      setShowCreateAppModal(false)
    }
  }

//   const blankImg = toAbsoluteUrl('media/svg/avatars/blank.svg')
//   const userAvatarImg = toAbsoluteUrl(`media/${userForEdit.avatar}`)

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const response = values.id !== 0 ? await updatePart(values) : await createPart(values);
        setResultResponse(response);
        handleAlert(response)
      } catch (ex) {
        console.error(ex)
      }
    },
  })


  // const handleSelectChange = (selectedOption: any) => {
  //   console.log("change role")
  //   formik.setFieldValue('role_id', selectedOption ? selectedOption.value : null);

  // };

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
      {/* <form id='kt_modal_add_user_form' className='form' noValidate> */}
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
            <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Part Name</label>
                <input
                placeholder='Part Name'
                {...formik.getFieldProps('part_name')}
                type='text'
                name='part_name'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.part_name && formik.errors.part_name},
                    {
                    'is-valid': formik.touched.part_name && !formik.errors.part_name,
                    }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.part_name && formik.errors.part_name && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.part_name}</span>
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
        {/* end::Scroll */}

        {/* begin::Actions */}
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
        {/* end::Actions */}
      </form>
      {
        showCreateAppModal && (
          <ModalResultForm show={showCreateAppModal} resp={resultResponse} handleClose={() => cancel(resultResponse.is_ok)} />
        )
      }
      {(formik.isSubmitting || isUserLoading) && <TableListLoading />}
    </>
  )
}

export {CaseCategoryModalForm}
