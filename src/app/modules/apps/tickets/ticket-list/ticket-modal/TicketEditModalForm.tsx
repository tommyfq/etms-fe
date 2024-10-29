
import {FC, useState, useEffect, CSSProperties } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {TicketDetail, initialTicket} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {createTicket, updateTicket } from '../core/_request'
import {ModalResultForm} from '../../../../../components/ModalResultForm'
import {TableListLoading} from '../../../../../components/TableListLoading'
import ImageModal from '../../../../../components/ImageModal'
import { useAuth, AuthModelUser } from '../../../../auth'

type Props = {
  isUserLoading: boolean
  ticket: TicketDetail
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#f8f9fa',
    border: state.isFocused ? '0px solid #DBDFE9' : '0px solid #DBDFE9',
    boxShadow: 'none',
    fontFamily: 'Inter, Helvetica, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4B5675',
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
    color: '#4B5675',
  }),
  indicatorSeparator: () => ({
    display: 'none'  // Remove the vertical line before the dropdown arrow
  })
};

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
const editUserSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  asset_id: Yup.string().required('Asset is required'),
  due_date: Yup.string().required('Due Date is required'),
})

const TicketEditModalForm: FC<Props> = ({ticket, isUserLoading}) => {
  const {setItemIdForUpdate, setTicketNo} = useListView()
  const {refetch} = useQueryResponse()
  const {currentUser} = useAuth()
  
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  const [selectedImage, setSelectedImage] = useState<string>();
  const [user, setUser] = useState<AuthModelUser>();
  const [tab, setTab] = useState('Comments')

  const handleImageClick = (url:string) => {
    setSelectedImage(url); // Set the selected image URL
  };

  const closeModal = () => {
    setSelectedImage(""); // Clear the selected image to close the modal
  };
  
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
    console.log(ticket);
    console.log("TICKET EDIT MODAL FORM")
    console.log(currentUser)
    console.log(currentUser?.data)
    setUser(currentUser?.data)
    //setUser(currentUser.data)
  }, [])

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser.data);
    }
  }, [currentUser]);

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
        console.log(values);
        const response = await updateTicket(values);
        setShowCreateAppModal(true);
        setResultResponse(response);
      } catch (ex) {
        setSubmitting(false);
      }
    },
  })

  const handleStatusSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("change status")
    console.log(event.target.value)
    formik.setFieldValue('status', event.target.value || null);
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
                <div className='col-12 col-md-6'>
                    {ticket.priority == null ?
                    <div className='fv-row'>
                        <label className='required fw-bold fs-6 mb-2'>Priority</label>
                        <select
                            name='priority'
                            data-control='select2'
                            data-hide-search='true'
                            className='form-select form-select-white form-select-sm w-125px'
                            defaultValue='High'
                        >
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
                
                <div className="col-12 col-md-6">
                    <div className='fv-row mb-7'>
                        <label className='required fw-bold fs-6 mb-2'>Status</label>
                        {user?.role_name != "client" ? 
                        <select
                            name='status'
                            data-control='select2'
                            data-hide-search='true'
                            className='form-select form-select-white form-select-sm w-125px'
                            onChange={handleStatusSelectChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.status}
                        >
                            {ticket.status == "Open" && <option disabled={true} value="Open">Open</option>}
                            {ticket.status == "In Progress" && <option disabled={true} value="In Progress">In Progress</option>}
                            <option value='Rejected'>Rejected</option>
                            <option value='Complete'>Complete</option>
                        </select>
                        :
                        <div className='card-toolbar'>
                            <span className={`badge badge-light-${ticket.status === 'Open' ? 'info' : ticket.status === 'In Progress' ? 'warning' : ticket.status === 'Rejected' ? 'danger' : 'success'} fw-bolder me-auto px-4 py-3`}>
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
            {user?.role_name != "client" && 
            <div className="fv-row mb-7">
                <label className='required fw-bold fs-6 mb-2'>On Hold</label>
                <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        name='on_hold'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.on_hold}
                    />
                    <label className='form-check-label'>On Hold</label>
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
            
            <div className='fv-row mb-4'>
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

            <div className='fv-row mb-7'>
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
                { user?.role_name == "agent" && 
                    <ul
                    className='nav nav-stretch nav-line-tabs
                    fw-bold
                    border-transparent
                    flex-nowrap
                    '
                    role='tablist'
                    >
                        <li className='nav-item'>
                            <a
                            className={clsx(`nav-link cursor-pointer`, {active: tab === 'Comments'})}
                            onClick={() => setTab('Comments')}
                            role='tab'
                            >
                            Comments
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a
                            className={clsx(`nav-link cursor-pointer`, {active: tab === 'Tasks'})}
                            onClick={() => setTab('Tasks')}
                            role='tab'
                            >
                            Tasks
                            </a>
                        </li>
                    </ul>
                }
                <div className='tab-content pt-3'>
                    <div className={clsx('tab-pane', {active: tab === 'Comments'})}>
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

                    <div className={clsx('tab-pane', {active: tab === 'Tasks'})}>
                    <h1>Tasks</h1>
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
      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
      {(formik.isSubmitting || isUserLoading) && <TableListLoading />}
    </>
  )
}

export {TicketEditModalForm}
