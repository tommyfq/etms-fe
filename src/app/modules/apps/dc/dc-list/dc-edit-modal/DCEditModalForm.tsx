import {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
// import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {DC, initialDC } from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {TableListLoading} from '../../../../../components/TableListLoading'
import {createDC, getListCompany, updateDC } from '../core/_request'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Select, { StylesConfig, ActionMeta, SingleValue } from 'react-select'
import {ModalResultForm} from '../../../../../components/ModalResultForm'
// import {KTIcon} from '../../../../../../_metronic/helpers'
// import {StoreModalForm} from './StoreModalForm'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  isUserLoading: boolean
  dc: DC
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
    fontWeight: '500',
    color:'#4B5675',
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
  dc_code: Yup.string()
    .required('DC Code is required'),
  dc_name: Yup.string()
    .required('DC Name is required'),
  company_id: Yup.number()
    .required('Company is required'),
  // stores: Yup.array().of(
  //   Yup.object().shape({
  //     store_name: Yup.string().required('Store name is required'),
  //   })
  // ),
})

const DCEditModalForm: FC<Props> = ({dc, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [companyOptions, setCompanyOptions] = useState<Option[]>([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  // const [stores, setStores] = useState<Store[]>([]);
  // const [showStoreModal, setShowStoreModal] = useState<boolean>(false)
  // const [editStore, setEditStore] = useState<Store>()
  
  const [userForEdit] = useState<DC>({
    ...dc,
    id: dc.id || initialDC.id,
    dc_code: dc.dc_code || initialDC.dc_code,
  dc_name: dc.dc_name || initialDC.dc_name,
  address: dc.address || initialDC.address,
  company_id: dc.company_id || initialDC.company_id,
  is_active: dc.is_active ?? initialDC.is_active ?? false,
  })

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const companies = await getListCompany()
        const formattedOptions = companies.data?.map((c): Option => ({ 
          value: c.company_id || 0,
          label: c.company_name|| "",
        })) || []
        setCompanyOptions(formattedOptions)
      } catch (error) {
        console.error('Error fetching agents:', error)
      }
    }

    fetchAgents()

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
      console.log("VALUES")
      console.log(values);
      setSubmitting(true)
      try {
        const response = values.id !== 0 ? await updateDC(values) : await createDC(values);
        setResultResponse(response);
        handleAlert(response)
        console.log(response)
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
    formik.setFieldValue('company_id', selectedOption ? selectedOption.value : null);
  };

  // const handleRemoveFields = (index:number) => {
  //   const values = [...stores];
  //   values.splice(index, 1);
  //   setStores(values);
  // };

  // const addStore = async (newStore:Store) => {
  //   console.log("add store")
  //   console.log(stores)
  //   newStore.id = stores.length + 100000
  //   await setStores([...stores, newStore]); // Append new store to the existing list
  //   setShowStoreModal(false); // Close Store Modal after adding the store
  //   const updatedStores = [...(formik.values.stores || []), newStore];
  //   formik.setFieldValue('stores', updatedStores);
  // };

  // const updateStore = (updatedStore: Store) => {
  //   setStores((prevStores) => {
  //     const updatedStores = prevStores.map((store) =>
  //       store.id === updatedStore.id ? updatedStore : store
  //     );
      
  //     // Update Formik's field value
  //     formik.setFieldValue('stores', updatedStores);
      
  //     return updatedStores;
  //   });
  //   setShowStoreModal(false);
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
          <label className='required form-label fw-bold'>Company</label>
            <Select 
              styles={customStyles} 
              name="company_id" 
              options={companyOptions}
              value={companyOptions.find(option => option.value === formik.values.company_id) || null}
              onChange={handleSelectChange}
              onBlur={() => formik.setFieldTouched('company_id')}
            />
            {formik.touched.company_id && formik.errors.company_id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.company_id}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>DC Code</label>
            <input
              placeholder='DC code'
              {...formik.getFieldProps('dc_code')}
              type='text'
              name='dc_code'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.dc_code && formik.errors.dc_code},
                {
                  'is-valid': formik.touched.dc_code && !formik.errors.dc_code,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.dc_code && formik.errors.dc_code && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.dc_code}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>DC Name</label>
            <input
              placeholder='DC name'
              {...formik.getFieldProps('dc_name')}
              type='text'
              name='dc_name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.dc_name && formik.errors.dc_name},
                {
                  'is-valid': formik.touched.dc_name && !formik.errors.dc_name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.dc_name && formik.errors.dc_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.dc_name}</span>
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
            <label className='fw-bold fs-6 mb-2'>Address</label>
            <input
              placeholder='Address'
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
            {/* <div className='fv-row mb-7'>
              <div className='d-flex justify-content-between align-items-center mb-2'>
                <label className='required fw-bold fs-6 mb-2 mr-2'>Stores</label>
                <button type="button" className='btn btn-primary btn-sm' onClick={() => {setEditStore(undefined);setShowStoreModal(true)}}> Add Store</button>
              </div>
              {stores.length > 0 ? (
                <div>
                  <p>{stores.length} Store</p>
                {stores.map((store, index) => (
                  <div>
                    <div className='form-group d-grid mb-2' style={{ gridTemplateColumns: '80% 20%'}}>
                      <div>
                        <h5>{store.store_name}</h5>
                        <p className="m-0">{store.is_active ? 'Active' : 'Not Active'}</p>
                      </div>
                    <div className="d-flex justify-content-end">
                    
                      <button type="button" className="btn btn-icon btn-sm btn-info" onClick={()=>{setEditStore(store); setShowStoreModal(true)}}>
                        <KTIcon iconName='pencil' iconType="solid"/>
                      </button>
                      <button type="button" className="btn btn-icon btn-sm btn-danger" onClick={()=>handleRemoveFields(index)}>
                        <KTIcon iconName='abstract-11' iconType="solid"/>
                      </button>
                    </div>
                    </div>
                    <hr className="mb-3 mt-3 ml-0 mr-0" style={{ borderColor: '#87898d' }}/>
                  </div>
                ))}
              </div>
              ) : (
                <p>No stores added yet.</p>
              )}
              
            </div> */}
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
      {/* {
        showStoreModal && (
          <StoreModalForm show={showStoreModal} handleClose={() => setShowStoreModal(false) } addStore={addStore} updateStore={updateStore} store={editStore}/>
        )
      } */}
      {(formik.isSubmitting || isUserLoading) && <TableListLoading />}
    </>
  )
}

export {DCEditModalForm}
