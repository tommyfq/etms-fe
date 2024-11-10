
import {FC, useState, useEffect, CSSProperties } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'

import {TicketDetail, initialTicket, Asset} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'
import { updateTicket, getListAsset } from '../core/_request'
import Select, { StylesConfig, ActionMeta, SingleValue }  from 'react-select'
import {ModalResultForm} from '../../../../../components/ModalResultForm'
import {TableListLoading} from '../../../../../components/TableListLoading'
import ImageModal from '../../../../../components/ImageModal'
import { useAuth, AuthModelUser } from '../../../../auth'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  isUserLoading: boolean
  ticket: TicketDetail
}

const MySwal = withReactContent(Swal);

type Option = { value: number; label: string };

const styles: { 
  dropzone: CSSProperties; 
  imagePreviewsContainer: CSSProperties; 
  imagePreview: CSSProperties; 
  deleteButton: CSSProperties;
  formControlDisabled: CSSProperties;
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
    display: 'inline-block',
    cursor: 'zoom-in',
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
  },
  formControlDisabled: {
    backgroundColor: '#e9ecef',
    cursor: 'not-allowed',
    opacity: 0.5,
  }
};

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
  title: Yup.string().required('Title is required'),
  asset_id: Yup.string().required('Asset is required'),
  due_date: Yup.string().required('Due Date is required'),
})

const TicketEditModalForm: FC<Props> = ({ticket, isUserLoading}) => {
  const {setItemIdForUpdate, setTicketNo} = useListView()
  const {refetch} = useQueryResponse()
  const {currentUser} = useAuth()
  const [statusSelected, setStatusSelected] = useState<string>("")
  const [prioritySelected, setPrioritySelected] = useState<boolean>(false)
  const [assetOptions, setAssetOptions] = useState<Option[]>([])
  const [selectedOptionAsset, setSelectedOptionAsset] = useState<Option | null>()
  const [assetList, setAssetList] = useState<Asset[]>()
  const [selectedSwapAsset, setSelectedSwapAsset] = useState<Asset>()
  const [isSwapAsset, setIsSwapAsset] = useState<boolean>(false)
  
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  const [selectedImage, setSelectedImage] = useState<string>();
  const [user, setUser] = useState<AuthModelUser>();

  const handleImageClick = (url:string) => {
    setSelectedImage(url); // Set the selected image URL
  };

  const closeModal = () => {
    setSelectedImage(""); // Clear the selected image to close the modal
  };

  const openOptionStatus = [
    "In Progress",
    "Rejected",
  ]

  const inProgressOptionStatus = [
    "On Hold",
    "Rejected",
    "Closed"
  ]

  const onHoldOptionStatus = [
    "In Progress",
    "Rejected",
    "Closed"
  ]
  
  const [userForEdit] = useState<TicketDetail>({
    ...ticket,
    id: ticket.id || initialTicket.id,
    title: ticket.title || initialTicket.title,
    asset_id: ticket.asset_id || initialTicket.asset_id,
    status: ticket.status || initialTicket.status,
    description: ticket.description || initialTicket.description,
    cc: ticket.cc || initialTicket.cc,
    due_date: ticket.due_date || initialTicket.due_date
  })

  useEffect(() => {
    setTicketNo(ticket?.ticket_no ?? "")
    if(ticket.priority){
      setPrioritySelected(true)
    }
    console.log(ticket);
    console.log("TICKET EDIT MODAL FORM")
    console.log(currentUser)
    setUser(currentUser)
    //setUser(currentUser.data)
  }, [])

  // useEffect(() => {
  //   if (currentUser) {
  //     setUser(currentUser);
  //   }
  // }, [currentUser]);

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

  const handleCancel = () => {

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      confirmButtonColor: "#F8285A",
      cancelButtonText: "Close",
    }).then(async (result) => {
      if (result.isConfirmed) {
        ticket.status = "Cancel"
        const response = await updateTicket(ticket)
        handleAlert(response)
      }else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ){
        console.log("Dismiss")
      }
    })

  }

  const handleIsSwapAsset = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the checkbox value (whether checked or not)
    const { checked } = event.target;
    if(checked){
      const assets = await getListAsset()
      const formattedOptions = assets.data?.map((asset): Option => ({ 
        value: asset.asset_id || 0,
        label: asset.brand + " " + asset.model + " | "+asset.serial_number,
      })) || []
      console.log(formattedOptions)
      setAssetOptions(formattedOptions)
      setAssetList(assets.data)
      setIsSwapAsset(true)

    }else{
      setIsSwapAsset(false)
      setSelectedOptionAsset(null)
      setSelectedSwapAsset(undefined)
    }
    //console.log(checked)
  };

  const cancel = (withRefresh?: boolean) => {
    
    if (withRefresh) {
      refetch()
      setItemIdForUpdate(undefined)
    }else{
      setShowCreateAppModal(false)
    }
  }

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        console.log("===VALUES===")
        if(isSwapAsset){
          values.swap_asset_id = selectedSwapAsset?.asset_id
        }
        console.log(values);
        const response = await updateTicket(values);
        setResultResponse(response);
        handleAlert(response)
      } catch (ex) {
        setSubmitting(false);
      }
    },
  })

  const handleStatusSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("change status")
    console.log(event.target.value)
    setStatusSelected(event.target.value)
    formik.setFieldValue('status', event.target.value || null);
    console.log(statusSelected,!selectedSwapAsset,!isSwapAsset)
    console.log(statusSelected == "Closed" && !selectedSwapAsset && !isSwapAsset)
    if(event.target.value != "Closed"){
      setSelectedOptionAsset(null)
      setIsSwapAsset(false)
      setSelectedSwapAsset(undefined)
    }
  };

  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("change priority")
    console.log(event.target.value)
    setPrioritySelected(true)
    formik.setFieldValue('priority', event.target.value || null);
  };

  const handleSelectAsset = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)
    console.log("change asset")
    //formik.setFieldValue('asset_id', selectedOption ? selectedOption.value : null);
    const selected = assetList?.find((a) => {
      return a.asset_id == selectedOption?.value
    })
    setSelectedSwapAsset(selected)
    setSelectedOptionAsset(selectedOption)
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
            <div className='row mb-7'>
                {ticket.status != "Cancel" && 
                  <div className='col-12 col-md-6'>
                    {ticket.priority == null ?
                    <div className='fv-row'>
                        <label className='required fw-bold fs-6 mb-2'>Priority</label>
                        <select
                            name='priority'
                            data-control='select2'
                            data-hide-search='true'
                            className='form-select form-select-white form-select-sm w-125px'
                            value={formik.values.priority}
                            onChange={handlePriorityChange}
                        >
                            <option selected={true} disabled={true}></option>
                            <option value='High'>High</option>
                            <option value='Medium'>Medium</option>
                            <option value='Low'>Low</option>
                        </select>
                    </div>
                    : 
                    <div className='fv-row'>
                        <label className='required fw-bold fs-6 mb-2'>Priority</label> 
                        <div className='card-toolbar'>
                            <span className={`badge badge-light-${ticket.priority === 'High' ? 'danger' : ticket.priority === 'Medium' ? 'warning' : 'success'} fw-bolder me-auto px-4 py-3`}>
                                {ticket.priority}
                            </span>
                        </div>
                    </div>                  
                  }
                </div>
                }
                
                <div className="col-12 col-md-6">
                    <div className='fv-row mb-7'>
                        <label className='required fw-bold fs-6 mb-2'>Status</label>
                        {user?.role_name != "client" && !["Rejected", "Closed", "Cancel"].includes(ticket.status ?? "") ? 
                        <select
                            name='status'
                            data-control='select2'
                            data-hide-search='true'
                            className='form-select form-select-white form-select-sm w-125px'
                            onChange={handleStatusSelectChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                        >
                          <option value={ticket.status} disabled={true}>{ticket.status}</option>
                          {ticket.status === "Open" && 
                              openOptionStatus.map((o, index) => (
                                <option key={index} value={o}>
                                  {o}
                                </option>
                              ))
                          }
                          {ticket.status === "In Progress" && 
                              inProgressOptionStatus.map((o, index) => (
                                <option key={index} value={o}>
                                  {o}
                                </option>
                              ))
                          }
                          {ticket.status === "On Hold" && 
                              onHoldOptionStatus.map((o, index) => (
                                <option key={index} value={o}>
                                  {o}
                                </option>
                              ))
                          }
                          
                            {/* <option disabled={true} value="Open">Open</option>
                            {ticket.status == "In Progress" && <option disabled={true} value="In Progress">In Progress</option>}
                            <option value='Rejected'>Rejected</option>
                            <option value='Complete'>Complete</option> */}
                        </select>
                        :
                        <div className='card-toolbar'>
                            <span className={`badge badge-light-${ticket.status === 'Open' ? 'info' : ticket.status === 'In Progress' ? 'warning' : ticket.status === 'Closed' ? 'success' : 'danger'} fw-bolder me-auto px-4 py-3`}>
                                {ticket.status}
                            </span>
                            {user?.role_name == "client" && ticket.on_hold && 
                            <span className={`badge badge-light-danger fw-bolder me-auto px-4 py-3`}>
                                On Hold
                            </span>
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
            { statusSelected == "Closed" && 
              <div className="row mb-7">
                <div className="col-12 col-lg-4">
                  <div className="fv-row">
                    <label className='fw-bold fs-6 mb-2'>Swap Asset</label>
                    <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='change_asset'
                          onChange={handleIsSwapAsset}
                          onBlur={formik.handleBlur}
                        />
                        <label className='form-check-label'>Swap Asset</label>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8">
                  <div className="fv-row">
                    <label className='form-label fw-bold'>List Swap Asset</label>
                    <Select 
                    styles={customStyles} 
                    name="asset_id" 
                    options={assetOptions}
                    value={selectedOptionAsset}
                    onChange={handleSelectAsset}
                    isDisabled={!isSwapAsset}
                    />
                    {formik.touched.asset_id && formik.errors.asset_id && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.asset_id}</span>
                        </div>
                    </div>
                    )}
                    { selectedSwapAsset && 
                      <div className='card-body p-3'>
                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>Serial Number</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-gray-900'>{selectedSwapAsset.serial_number}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>Brand</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-gray-900'>{selectedSwapAsset.brand}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>Model</label>
                            <div className='col-lg-8 fv-row'>
                                <span className='fw-bold fs-6'>{selectedSwapAsset.model}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>DC</label>
                            <div className='col-lg-8 fv-row'>
                                <span className='fw-bold fs-6'>{selectedSwapAsset.dc_name}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <label className='col-lg-4 fw-bold text-muted'>Store</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-gray-900'>{selectedSwapAsset.store_name}</span>
                            </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
            
            <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Title</label>
                <input
                placeholder='Title'
                {...formik.getFieldProps('title')}
                type='text'
                name='title'
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                )}
                autoComplete='off'
                readOnly={true}
                //style={styles.formControlDisabled}
                />
            </div>
            <div className="row mb-7">
              <div className="col-12 col-md-6">
                <div className='fv-row'>
                    <label className='required form-label fw-bold'>Asset</label>
                    <div className='card-body p-3'>
                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>Serial Number</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-gray-900'>{ticket.serial_number}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>Brand</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-gray-900'>{ticket.brand}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>Model</label>
                            <div className='col-lg-8 fv-row'>
                                <span className='fw-bold fs-6'>{ticket.model}</span>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='col-lg-4 fw-bold text-muted'>DC</label>
                            <div className='col-lg-8 fv-row'>
                                <span className='fw-bold fs-6'>{ticket.dc_name}</span>
                            </div>
                        </div>

                        <div className='row'>
                            <label className='col-lg-4 fw-bold text-muted'>Store</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-gray-900'>{ticket.store_name}</span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className='fv-row'>
                    <label className='required fw-bold fs-6 mb-2'>Description</label>
                    <textarea
                        placeholder='Description'
                        {...formik.getFieldProps('description')} // corrected the name here to 'description'
                        name='description' // corrected name to match field
                        className={clsx(
                        'form-control form-control-solid mb-3 mb-lg-0'
                        )}
                        autoComplete='off'
                        readOnly={true}
                    />
                </div>
              </div>
            </div>
            
            <div className="row mb-7">
              <div className="col-12 col-md-6">
                <div className='fv-row mb-7'>
                  <label className='required fw-bold fs-6 mb-2'>CC</label>
                  <input
                  placeholder='cc'
                  {...formik.getFieldProps('cc')}
                  type='text'
                  name='cc'
                  className={clsx(
                      'form-control form-control-solid mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                  readOnly={true}
                  />
                </div>

              </div>
              <div className="col-12 col-md-6">
                <div className='fv-row mb-7'>
                  <label className='required fw-bold fs-6 mb-2'>Due Date</label>
                  <input
                  placeholder='Due Date'
                  {...formik.getFieldProps('due_date')}
                  type='date'
                  name='due_date'
                  className={clsx(
                      'form-control form-control-solid mb-3 mb-lg-0',
                  )}
                  autoComplete='off'
                  readOnly={true}
                  />
                </div>
              </div>
            </div>
            <div className='fv-row mb-7'>
                <label className='required fw-bold fs-6 mb-2'>Attachments</label>
                  {/* Scrollable image previews with delete option */}
                  <div style={styles.imagePreviewsContainer}>
                    {ticket.attachments?.map((attach, index) => (
                      <div key={index} style={styles.imagePreview} onClick={() => handleImageClick(attach.full_url)}>
                        <img src={attach.full_url} alt="Preview" width="100" />
                      </div>
                    ))}
                  </div>
            </div>
            <div className='fv-row mb-7'>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className='row mb-3'>
                    <label className='col-lg-3 fw-bold text-muted'>Comments {user?.role_name == "agent" && "(to Client)"} </label>
                    <div className='col-lg-9'>
                      <textarea
                          placeholder='Comments'
                          {...formik.getFieldProps('comment_client')} // corrected the name here to 'description'
                          name='comment_client' // corrected name to match field
                          className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0'
                          )}
                          autoComplete='off'
                          readOnly={user?.role_name == "client"}
                      />
                    </div>
                  </div>
                  { user?.role_name == "agent" && 
                    <div className='row mb-3'>
                        <label className='col-lg-3 fw-bold text-muted'>Comments (to Internal)</label>
                        <div className='col-lg-9'>
                        <textarea
                            placeholder='Comments'
                            {...formik.getFieldProps('comment_internal')} // corrected the name here to 'description'
                            name='comment_internal' // corrected name to match field
                            className={clsx(
                            'form-control form-control-solid mb-3 mb-lg-0'
                            )}
                            autoComplete='off'
                        />
                        </div>
                    </div>
                    } 
                </div>
                <div className="col-12 col-lg-6">
                  <label className='col-lg-3 fw-bold text-muted mb-3'>Ticket Logs</label>
                  <div className='timeline-label'>
                    {
                      ticket.ticket_logs?.map((log)=>(
                        <div className='timeline-item'>
                          {/* begin::Label */}
                          <div className='timeline-label fw-bold text-gray-800 fs-6'></div>
                          {/* end::Label */}
                          {/* begin::Badge */}
                          <div className='timeline-badge'>
                            <i className={`fa fa-genderless fs-1 ${log.status === 'Complete' ? 'text-success' : log.status === 'Open' ? 'text-primary' : log.status === 'In Progress' ? 'text-warning' : 'text-danger'}`}></i>
                          </div>
                          {/* end::Badge */}
                          {/* begin::Text */}
                          <div className='fw-bold timeline-content text-muted ps-3'>
                          {log.text}
                          </div>
                          {/* end::Text */}
                        </div>
                        )
                      )
                    }
                  </div>
                </div>
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

          {
            !["Rejected", "Closed", "Cancel"].includes(ticket.status ?? "") && 
            <button
              type='submit'
              className='btn btn-primary me-3'
              data-kt-users-modal-action='submit'
              disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched || statusSelected == "" || !prioritySelected || (statusSelected == "Closed" && !selectedSwapAsset && isSwapAsset)}
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
          {
            (user?.role_name == "client" && ticket.status == "Open") && 
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleCancel}
            >
              <span className='indicator-label'>Cancel</span>
              {isUserLoading && (
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
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
      {(formik.isSubmitting || isUserLoading) && <TableListLoading />}
    </>
  )
}

export {TicketEditModalForm}
