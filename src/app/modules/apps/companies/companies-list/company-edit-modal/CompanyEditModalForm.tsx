import {FC, useState, useEffect} from 'react'

import clsx from 'clsx'
import * as Yup from 'yup'
import Swal, { SweetAlertIcon } from "sweetalert2";
import {useFormik} from 'formik'
import Select, {StylesConfig, ActionMeta, SingleValue} from 'react-select'
import withReactContent from "sweetalert2-react-content";

import {useListView} from '../core/ListViewProvider'
import {Company, initialCompany} from '../core/_models'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {ModalResultForm} from '../../../../../components/ModalResultForm'
import {TableListLoading} from '../../../../../components/TableListLoading'
import {createCompany, getListAgent, updateCompany } from '../core/_request'


type Props = {
  isUserLoading: boolean
  company: Company
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
  company_code: Yup.string()
    .required('Company Code is required'),
  company_name: Yup.string()
    .required('Company Name is required'),
  default_agent_id: Yup.number()
    .required('Default Agent is required')
    .nullable(),
})

const CompanyEditModalForm: FC<Props> = ({company, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [agentsOptions, setAgentsOptions] = useState<Option[]>([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  
    const [userForEdit] = useState<Company>({
    ...company,
    id: company.id || initialCompany.id,
    company_code: company.company_code || initialCompany.company_code,
    company_name: company.company_name || initialCompany.company_name,
    contact_name: company.contact_name || initialCompany.contact_name,
    contact_number: company.contact_number || initialCompany.contact_number,
    default_agent_id: company.default_agent_id || initialCompany.default_agent_id,
    is_active: company.is_active ?? initialCompany.is_active ?? false
  })

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agents = await getListAgent()
        const formattedOptions = agents.data?.map((agent): Option => ({ 
          value: agent.id || 0,
          label: agent.name || "",
        })) || []
        setAgentsOptions(formattedOptions)
      } catch (error) {
        console.error('Error fetching agents:', error)
      }
    }

    fetchAgents()
    console.log(company);
  }, [])

  const cancel = (withRefresh?: boolean) => {
    
    if (withRefresh) {
      refetch()
      setItemIdForUpdate(undefined)
    }else{
      setShowCreateAppModal(false)
    }
  }

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
        const response = values.id !== 0 ? await updateCompany(values) : await createCompany(values);
        setResultResponse(response);
        handleAlert(response)
        console.log(response)
      } catch (ex) {
        console.error(ex)
        setSubmitting(false);
      }
    },
  })

  const handleSelectChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)
    formik.setFieldValue('default_agent_id', selectedOption ? selectedOption.value : null);
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
            <label className='required fw-bold fs-6 mb-2'>Company Code</label>
            <input
              placeholder='Company code'
              {...formik.getFieldProps('company_code')}
              type='text'
              name='company_code'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.company_code && formik.errors.company_code},
                {
                  'is-valid': formik.touched.company_code && !formik.errors.company_code,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.company_code && formik.errors.company_code && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.company_code}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Company Name</label>
            <input
              placeholder='Company name'
              {...formik.getFieldProps('company_name')}
              type='text'
              name='company_name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.company_name && formik.errors.company_name},
                {
                  'is-valid': formik.touched.company_name && !formik.errors.company_name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.company_name && formik.errors.company_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.company_name}</span>
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
            <label className='fw-bold fs-6 mb-2'>Contact Name</label>
            <input
              placeholder='Contact name'
              {...formik.getFieldProps('contact_name')}
              type='text'
              name='contact_name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.contact_name && formik.errors.contact_name},
                {
                  'is-valid': formik.touched.contact_name && !formik.errors.contact_name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.contact_name && formik.errors.contact_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.contact_name}</span>
                </div>
              </div>
            )} 
          </div>

          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>Contact Number</label>
            <input
              placeholder='Contact number'
              {...formik.getFieldProps('contact_number')}
              type='text'
              name='contact_number'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.contact_number && formik.errors.contact_number},
                {
                  'is-valid': formik.touched.contact_number && !formik.errors.contact_number,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.contact_number && formik.errors.contact_number && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.contact_number}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
          <label className='required form-label fw-bold'>Default Agent</label>
            <Select 
              styles={customStyles} 
              name="default_agent_id" 
              options={agentsOptions}
              value={agentsOptions.find(option => option.value === formik.values.default_agent_id) || null}
              onChange={handleSelectChange}
            />
            {formik.touched.default_agent_id && formik.errors.default_agent_id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.default_agent_id}</span>
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

export {CompanyEditModalForm}
