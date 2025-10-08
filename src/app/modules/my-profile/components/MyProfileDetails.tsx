import {useState, FC, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {MyProfile, initialMyProfile as initialValues} from '../core/ProfileModel'
import {getAccountDetail, updateProfile} from '../core/_request'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useAuth} from '../../../../app/modules/auth'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const profileDetailsSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  username: Yup.string().required('Username is required'),
})

const MySwal = withReactContent(Swal);

const MyProfileDetails: FC = () => {
  const {setCurrentUser} = useAuth()
  const [data, setData] = useState<MyProfile>(initialValues)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setFetchLoading(true)
        setError(null)
        const profileData = await getAccountDetail()
        if (profileData) {
          const mergedData = {...initialValues, ...profileData}
          setData(mergedData)
          formik.setValues(mergedData)
        }
      } catch (err) {
        console.error('Error fetching profile data:', err)
        setError('Failed to load profile data. Please try again.')
      } finally {
        setFetchLoading(false)
      }
    }

    fetchProfileData()
  }, [])
  const formik = useFormik<MyProfile>({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const formData = new FormData()
        
        // Add profile data to FormData
        Object.keys(values).forEach(key => {
          const value = values[key as keyof MyProfile]
          if (value !== undefined && value !== null) {
            formData.append(key, String(value))
          }
        })

        // Add avatar file if selected
        if (avatarFile) {
          formData.append('avatar', avatarFile)
        }

        const response = await updateProfile(formData)
        if (response && response.data) {
          // Update data with response from server
          const updatedData = {...initialValues, ...response.data}
          setData(updatedData)
          formik.setValues(updatedData)

          // Update currentUser avatar
          setCurrentUser(prev => prev ? {...prev, avatar: updatedData.avatar || 'media/avatars/300-3.jpg'} : undefined)

          // Clear avatar file after successful upload
          setAvatarFile(null)
          setAvatarPreview(null)
          handleAlert({is_ok: true, message: 'Profile updated successfully!'})
        } else {
          // If no response data, just update with form values
          const updatedData = {...initialValues, ...values}
          setData(updatedData)
          setAvatarFile(null)
          setAvatarPreview(null)
          handleAlert({is_ok: true, message: 'Profile updated successfully!'})
        }
      } catch (err) {
        console.error('Error updating profile:', err)
        handleAlert({is_ok: false, message: 'Failed to update profile. Please try again.'})
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

  // Handle avatar file selection
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.')
        return
      }

      setAvatarFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }


  // Remove avatar preview
  const handleRemoveAvatar = () => {
    setAvatarFile(null)
    setAvatarPreview(null)
  }

  // Show loading state while fetching data
  if (fetchLoading) {
    return (
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body border-top p-9'>
          <div className='d-flex align-items-center justify-content-center' style={{minHeight: '200px'}}>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            <span className='ms-3'>Loading profile data...</span>
          </div>
        </div>
      </div>
    )
  }

  // Show error state if data fetching failed
  if (error) {
    return (
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body border-top p-9'>
          <div className='alert alert-danger d-flex align-items-center p-5'>
            <i className='ki-duotone ki-shield-cross fs-2hx text-danger me-4'>
              <span className='path1'></span>
              <span className='path2'></span>
            </i>
            <div className='d-flex flex-column'>
              <h4 className='mb-1 text-danger'>Error Loading Profile</h4>
              <span>{error}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div
                    className='image-input-wrapper w-125px h-125px'
                    style={{
                      backgroundImage: `url(${
                        avatarPreview ||
                        (data.avatar ? (data.avatar.startsWith('http') ? data.avatar : toAbsoluteUrl(data.avatar)) : toAbsoluteUrl('media/avatars/blank.png'))
                      })`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  ></div>

                  <label
                    className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                    data-kt-image-input-action='change'
                    data-bs-toggle='tooltip'
                    title='Change avatar'
                  >
                    <i className='ki-duotone ki-pencil fs-7'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                    </i>
                    <input
                      type='file'
                      name='avatar'
                      accept='image/*'
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                    />
                  </label>

                  {(avatarPreview || avatarFile) && (
                    <span
                      className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='cancel'
                      data-bs-toggle='tooltip'
                      title='Cancel avatar'
                      onClick={handleRemoveAvatar}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className='ki-duotone ki-cross fs-2'>
                        <span className='path1'></span>
                        <span className='path2'></span>
                      </i>
                    </span>
                  )}
                </div>


                <div className='form-text'>Allowed file types: png, jpg, jpeg. Max file size: 5MB.</div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-12 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Name'
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.name}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Email'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.email}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Username</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Username'
                  {...formik.getFieldProps('username')}
                  disabled={true}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.username}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Role</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Role'
                  value={data.role || ''}
                  disabled={true}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Company</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Company'
                  value={data.company_name || ''}
                  disabled={true}
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>DC</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='DC'
                  value={data.dcs || ''}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && 'Save Changes'}
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

export {MyProfileDetails}