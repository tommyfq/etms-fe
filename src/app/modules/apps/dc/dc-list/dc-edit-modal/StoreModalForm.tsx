import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {Store} from '../core/_models'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'

type Props = {
    show: boolean
    handleClose: () => void,
    addStore: (store?:Store) => void,
    updateStore: (updatedStore: Store) => void,
    store?: Store
}

const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email('Wrong email format')
    //   .min(3, 'Minimum 3 symbols')
    //   .max(50, 'Maximum 50 symbols')s
    //   .required('Email is required'),
    store_name: Yup.string()
      .required('Store Name is required')
  })

const StoreModalForm = ({show, handleClose, addStore, updateStore, store}: Props) => {


const [formData] = useState<Store>({
    ...store,
    id: store?.id ?? 0, 
  store_name: store?.store_name ?? '',
  address: store?.address,
  dc_id: store?.dc_id ?? 0,
  is_active: store?.is_active ?? false
  })


    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
          console.log("VALUES")
          console.log(values);
          setSubmitting(true)
          try {
            if(store !== undefined){
              console.log(values)
              console.log("UPDATE")
              updateStore({ ...values, id: store.id });
            }else{
              console.log("ADD")
              addStore(values)
            }
            
          } catch (ex) {
            console.error(ex)
          }
        },
      })

      return (
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={false}
        >
            <form id='kt_modal_add_store_form' className='form' onSubmit={formik.handleSubmit} noValidate>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Store
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
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
              disabled={formik.isSubmitting}
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
              disabled={formik.isSubmitting}
            />
            {formik.touched.address && formik.errors.address && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.address}</span>
                </div>
              </div>
            )}
          </div>
             
          </Modal.Body>
          <Modal.Footer>
          <button
                    type='button'
                    className='btn btn-lg btn-light'
                    onClick={handleClose}
                  >
                    Close 
            </button>

            <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          </Modal.Footer>
          </form>
        </Modal>
      );
  }

  export {StoreModalForm}