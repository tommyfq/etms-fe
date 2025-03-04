
import {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
// import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {User, initialUser} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {TableListLoading} from '../../../../../components/TableListLoading'
import {createUser, getListRole, getListDC, updateUser, getListCompany } from '../core/_request'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Select, { StylesConfig, ActionMeta, SingleValue, MultiValue } from 'react-select'
import {ModalResultForm} from '../../../../../components/ModalResultForm'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  isUserLoading: boolean
  user: User
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

const customDCStyles: StylesConfig<Option, boolean> = {
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
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required').matches(/^\S*$/, 'Username cannot contain spaces'),
  password: Yup.string().when('id', {
    is: 0, // Password required if `id` is 0
    then: (schema) => schema.required('Password is required').min(8, 'Password must be at least 8 characters'),
    otherwise: (schema) => schema.notRequired(), // Password not required if `id` is not 0
  }),
  email: Yup.string().required('Email is required').email('Invalid email format'),
  role_id: Yup.number().required('Role is required'),
})

const UserModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [companyOptions, setCompanyOptions] = useState<Option[]>([])
  const [roleOptions, setRoleOptions] = useState<Option[]>([])
  const [dcOptions, setDCOptions] = useState<Option[]>([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  const [role, setRole] = useState<string>()
  const [selectedDC, setSelectedDC] = useState<SingleValue<Option> | MultiValue<Option> | null>(null);
  const [isMultiDC, setIsMultiDC] = useState<boolean>(false)
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)

  const [userForEdit] = useState<User>({
    ...user,
    id: user.id || initialUser.id,
    name: user.name || initialUser.name,
    username: user.username || initialUser.username,
    password: user.password || initialUser.password,
    email: user.email || initialUser.email,
    role_id: user.role_id || initialUser.role_id,
    is_active: user.is_active ?? initialUser.is_active ?? false,
    dcs: user.dcs || initialUser.dcs,
    company_id: user.company_id || initialUser.company_id
  })

  useEffect(() => {
    const fetchRole = async () => {
      try {
 
        const companies = await getListCompany()
        const formattedOptions = companies.data?.map((c): Option => { 
          return { 
            value: c.company_id || 0,
            label: c.company_name|| "",
          }
        }) || []
        setCompanyOptions(formattedOptions) 

        if(user.company_id != 0 && user.company_id !== undefined){
          const formattedSelectedDC: Option[] = []
          const dcList = await getListDC(user.company_id)
          const formattedDCOptions = dcList.data?.map((d): Option => { 
            
            if(user?.dcs){
              for(const udc of user.dcs){
                if(udc == d.dc_id){
                  formattedSelectedDC.push({
                    value: d.dc_id || 0,
                    label: d.dc_name || ""
                  })
                }
              }
            }

            return {
              value: d.dc_id || 0,
              label: d.dc_name || "" 
            }
          }) || []
          
          setDCOptions(formattedDCOptions)
          setSelectedDC(formattedSelectedDC)
        }

        const roles = await getListRole()
        const formattedRoleOptions = roles.data?.map((r): Option => {
          
          if(user.role_id == r.role_id){
            setRole(r.role_name)
            if(r.role_name == "agent"){
              setIsMultiDC(true)
            }
          }
          
          return {
            value: r.role_id || 0,
            label: r.role_name || "",
          }
        }) || []
        setRoleOptions(formattedRoleOptions)
        setIsLoadingData(false)

      } catch (error) {
        console.error('Error fetching agents:', error)
      }
    }

    fetchRole()
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

  const formik = useFormik<User>({
    initialValues: userForEdit,
    validationSchema: (values: User) => editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const response = values.id !== 0 ? await updateUser(values) : await createUser(values);
        setResultResponse(response);
        handleAlert(response)
      } catch (ex) {
        console.error(ex)
      }
    },
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


  const handleSelectChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
    ) => {
    console.log(actionMeta)
    formik.setFieldValue('role_id', selectedOption ? selectedOption.value : null);
    setRole(selectedOption?.label || "")
    setSelectedDC(null)
    if(selectedOption?.label == "client"){
      setIsMultiDC(false)
    }else if(selectedOption?.label == "agent"){
      setIsMultiDC(true)
    }else if(selectedOption?.label == "super_client"){
      formik.setFieldValue('dcs', []);
    }
  };

  const handleSelectDCChange = (
    selectedOption: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta);
    setSelectedDC(selectedOption);
    
    
    if (Array.isArray(selectedOption)) {
      // Multiple values for agents
      formik.setFieldValue(
        'dcs',
        selectedOption.map((option) => option.value)
      );
    } else if (selectedOption){
      // Single value for clients
      formik.setFieldValue(
        'dcs',
        [(selectedOption as Option).value]
      );
    } else {
      // No selection
      formik.setFieldValue('dcs', []);
    }
  };

  const handleSelectCompanyChange = async (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)
    setSelectedDC(null)
    formik.setFieldValue('dcs', []);
    formik.setFieldValue('company_id', selectedOption ? selectedOption.value : null);

    const formattedSelectedDC: Option[] = []
    const dcList = await getListDC(selectedOption?.value ?? 0)
    const formattedDCOptions = dcList.data?.map((d): Option => { 
      
      if(user?.dcs){
        for(const udc of user.dcs){
          if(udc == d.dc_id){
            formattedSelectedDC.push({
              value: d.dc_id || 0,
              label: d.dc_name || ""
            })
          }
        }
      }

      return {
        value: d.dc_id || 0,
        label: d.dc_name || "" 
      }
    }) || []
    
    setDCOptions(formattedDCOptions)
    
  }

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
                <label className='required fw-bold fs-6 mb-2'>Name</label>
                <input
                placeholder='Name'
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
                <label className='required fw-bold fs-6 mb-2'>Username</label>
                <input
                placeholder='Username'
                {...formik.getFieldProps('username')}
                type='text'
                name='username'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.username && formik.errors.username},
                    {
                    'is-valid': formik.touched.username && !formik.errors.username,
                    }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.username && formik.errors.username && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.username}</span>
                    </div>
                </div>
                )}
            </div>

            <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Email</label>
                <input
                placeholder='Email'
                {...formik.getFieldProps('email')}
                type='email'
                name='email'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.email && formik.errors.email},
                    {
                    'is-valid': formik.touched.email && !formik.errors.email,
                    }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.email}</span>
                    </div>
                </div>
                )}
            </div>

            {user.id == 0 && 
              <div className='fv-row mb-7'>
                <label className='fw-bold fs-6 mb-2'>Password</label>
              <input
              placeholder='Password'
              {...formik.getFieldProps('password')}
              type='password'
              name='password'
              className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.password && formik.errors.password},
                  {
                  'is-valid': formik.touched.password && !formik.errors.password,
                  }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                  </div>
              </div>
              )}
            </div>
            }
            

            <div className='fv-row mb-7'>
                <label className='required form-label fw-bold'>Role</label>
                <Select 
                styles={customStyles} 
                name="role_id" 
                options={roleOptions}
                value={roleOptions.find(option => option.value === formik.values.role_id) || null}
                onChange={handleSelectChange}
                />
                {formik.touched.role_id && formik.errors.role_id && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.role_id}</span>
                    </div>
                </div>
                )}
            </div>
            
              {
                role != "admin" && (
                  <>
                    <div className='fv-row mb-7'>
                      <label className='required form-label fw-bold'>Company</label>
                      <Select 
                        styles={customStyles} 
                        name="company_id" 
                        options={companyOptions}
                        onChange={handleSelectCompanyChange}
                        value={companyOptions?.find(option => option.value === formik.values.company_id) || null}
                      />
                      {formik.touched.company_id && formik.errors.company_id && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.company_id}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {
                      !["admin", "super_client", ""].includes(role ?? "") && (
                        <div className='fv-row mb-7'>
                          <label className='form-label fw-bold'>DC</label>
                          <Select<Option, boolean> 
                          styles={customDCStyles} 
                          name="dcs"
                          isMulti={isMultiDC}
                          options={dcOptions}
                          value={selectedDC}
                          onChange={handleSelectDCChange}
                          />
                      </div>
                      )
                    }
                  </>
                )
              }

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
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched || isLoadingData || !role || ((Array.isArray(selectedDC) ? selectedDC.length === 0 : !selectedDC) && !["admin", "super_client"].includes(role))}
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

export {UserModalForm}
