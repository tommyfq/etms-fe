
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
import Select from 'react-select'
import {ModalResultForm} from '../../../../../components/ModalResultForm'

type Props = {
  isUserLoading: boolean
  store: Store
}

const customStyles = {
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
  store_code: Yup.string().required('Store Code is required'),
  store_name: Yup.string().required('Store Name is required')
})

const StoreModalForm: FC<Props> = ({store, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [dcOptions, setDCOptions] = useState<any[]>([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  
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
        const dcs = await getListDC()
        const formattedOptions = dcs.data?.map(dc => ({
          value: dc.dc_id,
          label: dc.dc_name,
        }))
        console.log(formattedOptions)
        setDCOptions(formattedOptions)

      } catch (error) {
        console.error('Error fetching agents:', error)
      }
    }

    fetchRole()
    console.log(store);
  }, [])

  const cancel = (withRefresh?: boolean) => {
    
    if (withRefresh) {
      refetch()
    }
    setShowCreateAppModal(false)
    setItemIdForUpdate(undefined)
  }

//   const blankImg = toAbsoluteUrl('media/svg/avatars/blank.svg')
//   const userAvatarImg = toAbsoluteUrl(`media/${userForEdit.avatar}`)

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      console.log("VALUES")
      console.log(values);
      setSubmitting(true)
      try {
        if (values.id != 0) {
          console.log("UPDATE")
          console.log(values);
          let response = await updateStore(values)
          console.log(response);
          
            setShowCreateAppModal(true)
            setResultResponse(response)
          
        } else {
          console.log("CREATE")
          console.log(values);
          let response = await createStore(values)
          
            setShowCreateAppModal(true)
            setResultResponse(response)
          
          

        //   console.log(response)
        }
      } catch (ex) {
        console.error(ex)
      }
    },
  })


  const handleSelectChange = (selectedOption: any) => {
    console.log("change role")
    formik.setFieldValue('dc_id', selectedOption ? selectedOption.value : null);

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
                {...formik.getFieldProps('store_cde')}
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
                placeholder='store_name'
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
            
            <label className='required fw-bold fs-6 mb-2'>Active</label>

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

            <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Address</label>
                <input
                placeholder='address'
                {...formik.getFieldProps('address')}
                type='text'
                name='address'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.address && formik.errors.address},
                    {
                    'is-valid': formik.touched.address && !formik.errors.address,
                    }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.address && formik.errors.address && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.address}</span>
                    </div>
                </div>
                )}
            </div>
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
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
          <ModalResultForm show={showCreateAppModal} resp={resultResponse} handleClose={() => cancel(true)} />
        )
      }
      {(formik.isSubmitting || isUserLoading) && <TableListLoading />}
    </>
  )
}

export {StoreModalForm}
