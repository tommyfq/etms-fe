import {useState, FC} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {changePassword} from '../core/_request'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface ChangePasswordFormData {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .notOneOf([Yup.ref('oldPassword')], 'New password must be different from current password')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
})

const initialValues: ChangePasswordFormData = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

const MySwal = withReactContent(Swal);

const ChangePassword: FC = () => {
  const [loading, setLoading] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const formik = useFormik<ChangePasswordFormData>({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, {resetForm}) => {
      setLoading(true)
      try {
        const response = await changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        })
        
        if (response && response.data) {
          handleAlert(response.data)
          if(response.data.is_ok){
            resetForm()
          }
        }
      } catch (err) {
        console.error('Error changing password:', err)
        handleAlert({is_ok: false, message: 'Failed to change password. Please try again.'})
      } finally {
        setLoading(false)
      }
    },
  })

  const handleAlert = (response: {is_ok: boolean, message: string}) => {
    let title = "Error!";
    let icon: SweetAlertIcon = "error";
    const buttonText = 'Close'
    if (response.is_ok) {
      title = "Success!"
      icon = "success"
    }

    MySwal.fire({
      title: title,
      text: response.message,
      icon: icon,
      confirmButtonText: buttonText,
    })
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Change Password</h3>
        </div>
      </div>

      <div id='kt_account_change_password' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-1'>
              <div className='col-lg-4'>
                <div className='fv-row mb-0'>
                  <label className='form-label fs-6 fw-bolder mb-3'>Current Password</label>
                  <div className='position-relative mb-3'>
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Current password'
                      autoComplete='current-password'
                      {...formik.getFieldProps('oldPassword')}
                    />
                    <span
                      className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      style={{cursor: 'pointer'}}
                    >
                      <i className={`ki-duotone ${showOldPassword ? 'ki-eye-slash' : 'ki-eye'} fs-2`}>
                        <span className='path1'></span>
                        <span className='path2'></span>
                        <span className='path3'></span>
                      </i>
                    </span>
                  </div>
                  {formik.touched.oldPassword && formik.errors.oldPassword && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.oldPassword}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='col-lg-4'>
                <div className='fv-row mb-0'>
                  <label className='form-label fs-6 fw-bolder mb-3'>New Password</label>
                  <div className='position-relative mb-3'>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      className='form-control form-control-lg form-control-solid'
                      placeholder='New password'
                      autoComplete='new-password'
                      {...formik.getFieldProps('newPassword')}
                    />
                    <span
                      className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{cursor: 'pointer'}}
                    >
                      <i className={`ki-duotone ${showNewPassword ? 'ki-eye-slash' : 'ki-eye'} fs-2`}>
                        <span className='path1'></span>
                        <span className='path2'></span>
                        <span className='path3'></span>
                      </i>
                    </span>
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.newPassword}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='col-lg-4'>
                <div className='fv-row mb-0'>
                  <label className='form-label fs-6 fw-bolder mb-3'>Confirm New Password</label>
                  <div className='position-relative mb-3'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Confirm new password'
                      autoComplete='new-password'
                      {...formik.getFieldProps('confirmPassword')}
                    />
                    <span
                      className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{cursor: 'pointer'}}
                    >
                      <i className={`ki-duotone ${showConfirmPassword ? 'ki-eye-slash' : 'ki-eye'} fs-2`}>
                        <span className='path1'></span>
                        <span className='path2'></span>
                        <span className='path3'></span>
                      </i>
                    </span>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.confirmPassword}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='form-text mb-5'>
              Password must be at least 6 characters and contain uppercase, lowercase, numbers and symbols
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='reset'
              className='btn btn-light btn-active-light-primary me-2'
              onClick={() => formik.resetForm()}
              disabled={loading}
            >
              Discard
            </button>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && 'Change Password'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ChangePassword}