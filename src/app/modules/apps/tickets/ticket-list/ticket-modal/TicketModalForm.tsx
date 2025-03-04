
import {FC, useState, useEffect, CSSProperties } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import Select, { StylesConfig, ActionMeta, SingleValue }  from 'react-select'
import { useDropzone } from 'react-dropzone'
import {TicketDetail, initialTicket, Asset} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {createTicket, getListAsset } from '../core/_request'
import {ModalResultForm} from '../../../../../components/ModalResultForm'
import {TableListLoading} from '../../../../../components/TableListLoading'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  isUserLoading: boolean
  ticket: TicketDetail
}

const MySwal = withReactContent(Swal);

type Option = { value: number; label: string };

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

const styles: { 
  dropzone: CSSProperties; 
  imagePreviewsContainer: CSSProperties; 
  imagePreview: CSSProperties; 
  deleteButton: CSSProperties 
} = {
  dropzone: {
    padding: '1rem',
    border: '2px dashed #ccc',
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: '1rem'
  },
  imagePreviewsContainer: {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto',
    padding: '1rem 0',
    whiteSpace: 'nowrap',
    maxWidth: '100%'
  },
  imagePreview: {
    position: 'relative',
    display: 'inline-block'
  },
  deleteButton: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    width: '20px',
    height: '20px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const editUserSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  asset_id: Yup.string().required('Asset is required'),
})

const TicketModalForm: FC<Props> = ({ticket, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()

  const {refetch} = useQueryResponse()
  const [assetOptions, setAssetOptions] = useState<Option[]>([])
  const [assetList, setAssetList] = useState<Asset[]>()
  const [selectedAsset, setSelectedAsset] = useState<Asset>()
  
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // State to store uploaded files
  
  const [userForEdit] = useState<TicketDetail>({
    ...ticket,
    id: ticket.id || initialTicket.id,
    title: ticket.title || initialTicket.title,
    asset_id: ticket.asset_id || initialTicket.asset_id,
    status: ticket.status || initialTicket.status,
    description: ticket.description || initialTicket.description,
    cc: ticket.cc || initialTicket.cc,
    customer_reference_no: ticket.customer_reference_no || initialTicket.customer_reference_no
  })

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const assets = await getListAsset()
        const formattedOptions = assets.data?.map((asset): Option => ({ 
          value: asset.asset_id || 0,
          label: asset.brand + " " + asset.model + " | "+asset.serial_number,
        })) || []
        setAssetOptions(formattedOptions)
        setAssetList(assets.data)

      } catch (error) {
        console.error('Error fetching agents:', error)
      }
    }

    fetchAsset()
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

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const formData = new FormData();
        formData.append("title", values.title || '');
        formData.append("asset_id", values.asset_id?.toString() || '');
        formData.append("cc",values.cc || '')
        formData.append("description",values.description || '')
        formData.append("customer_reference_no",values.customer_reference_no || '')
        uploadedFiles.forEach((file) => formData.append("images", file)); // Append each file to formData
        const response = await createTicket(formData);
        setResultResponse(response);
        handleAlert(response)
      } catch (ex) {
        setSubmitting(false);
      }
    },
  })

  const handleSelectChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)
    formik.setFieldValue('asset_id', selectedOption ? selectedOption.value : null);
    const selected = assetList?.find((a) => {
      return a.asset_id == selectedOption?.value
    })

    setSelectedAsset(selected)
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (uploadedFiles.length + acceptedFiles.length > 10) {
      alert('You can only upload a maximum of 10 images.');
      return;
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 10,
  });

   // Delete image function
  const handleDeleteImage = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
        <div className="row mb-7">
          <div className="col-12">
            <div className='fv-row'>
                <label className='required fw-bold fs-6 mb-2'>Title</label>
                <input
                placeholder='Title'
                {...formik.getFieldProps('title')}
                type='text'
                name='title'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {'is-invalid': formik.touched.title && formik.errors.title},
                    {
                    'is-valid': formik.touched.title && !formik.errors.title,
                    }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.title && formik.errors.title && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.title}</span>
                    </div>
                </div>
                )}
            </div>
          </div>
        </div>
            
            
            <div className='row mb-7'>
                <div className="col-12 col-md-6">
                  <div className="fv-row">
                    <label className='required form-label fw-bold'>Asset</label>
                    <Select 
                    styles={customStyles} 
                    name="dc_id" 
                    options={assetOptions}
                    value={assetOptions.find(option => option.value === formik.values.asset_id) || null}
                    onChange={handleSelectChange}
                    />
                    {formik.touched.asset_id && formik.errors.asset_id && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.asset_id}</span>
                        </div>
                    </div>
                    )}
                    { selectedAsset && 
                      <div className='card-body p-3'>
                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>Serial Number</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-gray-900'>{selectedAsset.serial_number}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>Brand</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-gray-900'>{selectedAsset.brand}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>Model</label>
                            <div className='col-lg-8 fv-row'>
                                <span className='fw-bold fs-6'>{selectedAsset.model}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>DC</label>
                            <div className='col-lg-8 fv-row'>
                                <span className='fw-bold fs-6'>{selectedAsset.dc_name}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <label className='col-lg-4 fw-bold text-muted'>Store</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-gray-900'>{selectedAsset.store_name}</span>
                            </div>
                        </div>
                      </div>
                    }
                    
                  </div>
                  
                </div>
                <div className="col-12 col-md-6">
                  <div className="fv-row">
                    <label className='required fw-bold fs-6 mb-2'>Description</label>
                    <textarea
                        placeholder='Description'
                        {...formik.getFieldProps('description')} // corrected the name here to 'description'
                        name='description' // corrected name to match field
                        className={clsx(
                        'form-control form-control-solid mb-3 mb-lg-0',
                        {'is-invalid': formik.touched.description && formik.errors.description},
                        {'is-valid': formik.touched.description && !formik.errors.description}
                        )}
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.description}</span>
                            </div>
                        </div>
                    )}
                  </div>
                  
                </div>
            </div>

            <div className='fv-row mb-7'>
                
            </div>

            <div className="row mb-7">
              <div className="col-12 col-lg-6">
                <div className='fv-row'>
                  <label className='fw-bold fs-6 mb-2'>Customer Reference Number</label>
                  <input
                  placeholder='Customer Reference Number'
                  {...formik.getFieldProps('customer_reference_no')}
                  type='text'
                  name='customer_reference_no'
                  className={clsx(
                      'form-control form-control-solid mb-3 mb-lg-0',
                      {'is-invalid': formik.touched.customer_reference_no && formik.errors.customer_reference_no},
                      {
                      'is-valid': formik.touched.customer_reference_no && !formik.errors.customer_reference_no,
                      }
                  )}
                  autoComplete='off'
                  disabled={formik.isSubmitting || isUserLoading}
                  />
                  {formik.touched.customer_reference_no && formik.errors.customer_reference_no && (
                  <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.customer_reference_no}</span>
                      </div>
                  </div>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-6">
                  <div className='fv-row'>
                    <label className='fw-bold fs-6 mb-2'>CC</label>
                    <input
                    placeholder='example@mail.com, example2@mail.com'
                    {...formik.getFieldProps('cc')}
                    type='text'
                    name='cc'
                    className={clsx(
                        'form-control form-control-solid mb-3 mb-lg-0',
                        {'is-invalid': formik.touched.cc && formik.errors.cc},
                        {
                        'is-valid': formik.touched.cc && !formik.errors.cc,
                        }
                    )}
                    autoComplete='off'
                    disabled={formik.isSubmitting || isUserLoading}
                    />
                    {formik.touched.cc && formik.errors.cc && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.cc}</span>
                        </div>
                    </div>
                    )}
                </div>
              </div>
            </div>

            <div className="row mb-7">
             
            </div>
            
            <div className='fv-row mb-7'>
                <label className='fw-bold fs-6 mb-2'>Attachments</label>
                <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                  You can upload up to 10 image files
                </div>
                {/* Dropzone for multiple images */}
                  <div {...getRootProps()} style={styles.dropzone}>
                    <input {...getInputProps()} />
                    <p>Drag and drop images here, or click to select files</p>
                  </div>

                  {/* Scrollable image previews with delete option */}
                  <div style={styles.imagePreviewsContainer}>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} style={styles.imagePreview}>
                        <img src={URL.createObjectURL(file)} alt="Preview" width="100" />
                        <button
                          type="button"
                          style={styles.deleteButton}
                          onClick={() => handleDeleteImage(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
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

export {TicketModalForm}
