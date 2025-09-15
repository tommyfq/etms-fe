
import {useState, useEffect} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {checkToken, changePassword} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import { useSearchParams } from 'react-router-dom'
import withReactContent from "sweetalert2-react-content";
import Swal, { SweetAlertIcon } from "sweetalert2";

const MySwal = withReactContent(Swal);

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  // UPDATE THIS PART
  confirm_password: Yup.string()
    .required('Password confirmation is required') // Corrected error message
    .oneOf([Yup.ref('password')], 'Passwords must match'), // Adds the validation rule
})

const initialValues = {
  password: '',
  confirm_password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function ResetPassword() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  
  

  useEffect(() => {

    const tokenParam = searchParams.get('token')

    if (!tokenParam) {
      handleAlert({is_ok:false,message:"No token found"})
      // Optional: redirect ke halaman error atau login
      // navigate('/login')
      return
    }

    const initCheckToken = async() => {
      const resp = await checkToken(tokenParam);
      console.log(resp.data);

      if(!resp.data.is_ok){
        console.log(resp.data)
        handleAlert(resp.data)
        //open modal and redirect to home page
      }
    }

    initCheckToken()

    // setTicketNo(ticket?.ticket_no ?? "")
    // if(ticket.priority){
    //   setPrioritySelected(true)
    // }

    // if(ticket.part_id){
    //   setIsPartSelected(true)
    // }

    // if(ticket.diagnostic_id){
    //   setIsDiagnosticSelected(true)
    // }

    // const fetchInitialData = async() => {
    //   const parts = await getListPart()
    //   const formattedPartOptions = parts.data?.map((part): Option => ({ 
    //     value: part.part_id || 0,
    //     label: part.part_name || "",
    //   })) || []
    //   setPartOptions(formattedPartOptions)

    //   const diagnostics = await getListDiagnostics()
    //   const formattedDiagnosticOptions = diagnostics.data?.map((part): Option => ({ 
    //     value: part.diagnostic_id || 0,
    //     label: part.diagnostic_name || "",
    //   })) || []
    //   setDiagnosticOptions(formattedDiagnosticOptions)
    // }
    
    // fetchInitialData();

    // setUser(currentUser)
    //setUser(currentUser.data)
  }, [searchParams])

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
          navigate('/auth/login')
          //cancel(response.is_ok)
        }
      })
    };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const tokenParam = searchParams.get('token')

        if(!tokenParam){
          handleAlert({is_ok:false,message:"Token is not provided"})
          setLoading(false); // Turn off loading before exiting
          return;
        }
        const {data: auth} = await changePassword(tokenParam, values.password)
        handleAlert(auth)
      } catch (error) {
        console.error(error)
        handleAlert({is_ok:false,message:"There is an error in the system, please try again"})
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div
        className='d-flex flex-lg-row-fluid bgi-size-cover bgi-position-center order-1 order-lg-2'
      >
        <div className='d-flex flex-column flex-center w-100'>
        <Link to='/' className='mb-12'>
              <img alt='Logo' src={toAbsoluteUrl('media/logos/epsindo-logo2.png')} className='h-75px' />
        </Link>
        </div>
      </div>
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-gray-900 fw-bolder mb-3'>Reset Password</h1>
      </div>
      {/* begin::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>Password</label>
        <input
          placeholder='Password'
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>Confirm Password</label>
        <input
          placeholder='Password'
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('confirm_password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.confirm_password && formik.errors.confirm_password,
            },
            {
              'is-valid': formik.touched.confirm_password && !formik.errors.confirm_password,
            }
          )}
        />
        {formik.touched.confirm_password && formik.errors.confirm_password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.confirm_password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}
