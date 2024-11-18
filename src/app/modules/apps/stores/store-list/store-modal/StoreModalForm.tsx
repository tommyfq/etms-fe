
import {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
// import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {Store, initialStore} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {TableListLoading} from '../../../../../components/TableListLoading'
import {createStore, getListDC, updateStore } from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Select, { StylesConfig, ActionMeta, SingleValue } from 'react-select'
import {ModalResultForm} from '../../../../../components/ModalResultForm'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from '../../../../../modules/auth'

type Props = {
  isUserLoading: boolean
  store: Store
}

type Option = { value: number; label: string };

const MySwal = withReactContent(Swal);

const customStyles: StylesConfig<Option, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#f8f9fa',
    border: state.isFocused ? '0px solid #DBDFE9' : '0px solid #DBDFE9',
    boxShadow: 'none',
    fontFamily: 'Inter, Helvetica, sans-serif',
    fontSize: '14px',
    fontWeight: '600',
    color:'#99a1b7',
  }),
  menu: (provided) => ({
    ...provided,
    position: 'absolute',
    zIndex: 9999,
    borderRadius: '4px',
    border: '1px solid #ced4da',
    marginTop: '0',
    fontFamily: 'Inter, Helvetica, sans-serif',
    fontSize: '13px',
    fontWeight: '400',
    //color:'#99a1b7',
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
    position: 'fixed', // Make the dropdown menu fixed
    top: `${provided.top}px`, // Use calculated position from react-select
    left: `${provided.left}px`, // Use calculated position from react-select
    width: provided.width,  // Ensure the width matches the control
    //color:'#99a1b7',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: 'Inter, Helvetica, sans-serif',
    fontSize: '13px',
    fontWeight: '400',
    color:'#99a1b7',
  }),
  indicatorSeparator: () => ({
    display: 'none'  // Remove the vertical line before the dropdown arrow
  })
};

const editUserSchema = Yup.object().shape({
  // email: Yup.string()
  //   .email('Wrong email format')
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')s
  //   .required('Email is required'),
  store_code: Yup.string().required('Store Code is required')
  .matches(/^\S*$/, 'Store Code cannot contain spaces'),
  store_name: Yup.string().required('Store Name is required')
})

const StoreModalForm: FC<Props> = ({store, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [dcOptions, setDCOptions] = useState<Option[]>([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  const {currentUser} = useAuth()
  const [readOnly, setReadOnly] = useState<boolean>(true) 
  
  const [userForEdit] = useState<Store>({
    ...store,
    id: store.id || initialStore.id,
  store_code: store.store_code || initialStore.store_code,
  store_name: store.store_name || initialStore.store_name,
  address: store.address || initialStore.address,
  dc_id: store.dc_id || initialStore.dc_id,
  is_active: store.is_active ?? initialStore.is_active ?? false
  })

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const companyId = currentUser?.company_id ?? 0
        const dcs = await getListDC(companyId)
        const formattedOptions = dcs.data?.map((dc): Option => ({
          value: dc.dc_id || 0,
          label: dc.dc_name || "",
        })) || []
        console.log(formattedOptions)
        setDCOptions(formattedOptions)

      } catch (error) {
        console.error('Error fetching agents:', error)
      }
    }

    fetchRole()
    if(currentUser?.role_name == "admin"){
      setReadOnly(false)
    }
    console.log(store);
  }, [])

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
        const response = values.id !== 0 ? await updateStore(values) : await createStore(values);
        setResultResponse(response);
        handleAlert(response)
      } catch (ex) {
        console.error(ex)
      }
    },
  })


  const handleSelectChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
    ) => {
    console.log(actionMeta)
    formik.setFieldValue('dc_id', selectedOption ? selectedOption.value : null);
  };

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
                <label className='required form-label fw-bold'>DC</label>
                <Select 
                styles={customStyles} 
                name="dc_id" 
                options={dcOptions}
                value={dcOptions.find(option => option.value === formik.values.dc_id) || null}
                onChange={handleSelectChange}
                isDisabled={readOnly}
                />
                {formik.touched.dc_id && formik.errors.dc_id && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.dc_id}</span>
                    </div>
                </div>
                )}
            </div>

            <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Store Code</label>
                <input
                placeholder='Store Code'
                {...formik.getFieldProps('store_code')}
                type='text'
                name='store_code'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.store_code && formik.errors.store_code},
                    {
                    'is-valid': formik.touched.store_code && !formik.errors.store_code,
                    }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                readOnly={readOnly}
                />
                {formik.touched.store_code && formik.errors.store_code && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.store_code}</span>
                    </div>
                </div>
                )}
            </div>

            <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Store Name</label>
                <input
                placeholder='Store Name'
                {...formik.getFieldProps('store_name')}
                type='text'
                name='store_name'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.store_name && formik.errors.store_name},
                    {
                    'is-valid': formik.touched.store_name && !formik.errors.store_name,
                    }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                readOnly={readOnly}
                />
                {formik.touched.store_name && formik.errors.store_name && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.store_name}</span>
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
                disabled={readOnly}
              />
              <label className='form-check-label'>Active</label>
            </div>
            
          </div>

            <div className='fv-row mb-7'>
                <label className='fw-bold fs-6 mb-2'>Address</label>
                <input
                placeholder='address'
                {...formik.getFieldProps('address')}
                type='text'
                name='address'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0'
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                readOnly={readOnly}
                />
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

          {!readOnly && 
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
          }
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

export {StoreModalForm}
