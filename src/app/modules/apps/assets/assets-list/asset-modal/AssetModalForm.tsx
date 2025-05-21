
import {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Link} from 'react-router-dom'
// import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {Asset, initialAsset, AssetLog} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {TableListLoading} from '../../../../../components/TableListLoading'
import {createAsset, getListDC, updateAsset, getListStore, getListBrand, getListModel, getAssetLogById } from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import Select, { StylesConfig, ActionMeta, SingleValue }  from 'react-select'
import {ModalResultForm} from '../../../../../components/ModalResultForm'
import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from '../../../../../modules/auth'

type Props = {
  isUserLoading: boolean
  asset: Asset
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
  serial_number: Yup.string()
    .required('Serial Number is required')
    .matches(/^\S*$/, 'Serial Number cannot contain spaces'),
  dc_id: Yup.number().required('DC ID is required'),
  store_id: Yup.number().required('Store ID is required'),
  delivery_date: Yup.string().required('Delivery Date is required'),
})

const AssetModalForm: FC<Props> = ({asset, isUserLoading}) => {
  const [tab, setTab] = useState('Sidebar')
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [dcOptions, setDCOptions] = useState<Option[]>()
  const [storeOptions, setStoreOptions] = useState<Option[]>([])
  const [brandOptions, setBrandOptions] = useState<Option[]>([])
  const [modelOptions, setModelOptions] = useState<Option[]>([])
  const [assetLog, setAssetLog] = useState<AssetLog[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string>()
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [selectedDCId, setSelectedDCId] = useState<number>()
  const [resultResponse, setResultResponse] = useState<{is_ok:boolean, message:string}>({is_ok:false,message:""})
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true)
  const {currentUser} = useAuth()
  const [readOnly, setReadOnly] = useState<boolean>(true) 
  
  const [userForEdit] = useState<Asset>({
    ...asset,
    id: asset.id || initialAsset.id,
  serial_number: asset.serial_number || initialAsset.serial_number,
  delivery_date: asset.delivery_date || initialAsset.delivery_date,
  dc_id: asset.dc_id || initialAsset.dc_id,
  store_id: asset.store_id || initialAsset.store_id,
  is_active: asset.is_active ?? initialAsset.is_active ?? false,
  item_id: asset.item_id || initialAsset.item_id
  })

  function hashStringToNumber(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return hash;
  }

  useEffect(() => {
    const fetchDC = async () => {
      try {
        const dcs = await getListDC(0)
        const formattedDCOptions = dcs.data?.map((dc): Option => ({ 
          value: dc?.dc_id || 0,
          label: dc?.dc_name || "",
        }));
        setDCOptions(formattedDCOptions)

        if(asset?.dc_id != 0){
            
            const logs = await getAssetLogById(asset.id)
            const formattedLogs = logs.data?.map((log:AssetLog) => ({
              ticket_id: log.ticket_id,
              ticket_no: log.ticket_no,
              complain_at: log.complain_at,
              diagnostic_name: log.diagnostic_name,
              part_name: log.part_name,
              serial_number: log.serial_number,
              status: log.status,
            })) || []

            setAssetLog(formattedLogs)

            const fetchStore = async () => {
                try {
                  const stores = await getListStore(asset.dc_id ?? 0)
                  const formattedStoreOptions = stores.data?.map((store): Option => ({ 
                    value: store.store_id || 0,
                    label: store.store_name || "",
                  })) || []
                  setStoreOptions(formattedStoreOptions)
                } catch (error) {
                  console.error('Error fetching agents:', error)
                }
              }
          
              fetchStore()
        }

        const brands = await getListBrand()
        const formattedBrandOptions = brands.data?.map((brand): Option => ({ 
          value: hashStringToNumber(brand),
          label: brand
        })) || []
        setBrandOptions(formattedBrandOptions)

        if(asset?.item_id != 0){
          const fetchModel = async () => {
              try {
                const models = await getListModel(asset.brand ?? "")

                const formattedModeloptions = models.data?.map((model): Option => ({ 
                  value: model.item_id || 0,
                  label: model.model || "",
                })) || []
                setModelOptions(formattedModeloptions)
              } catch (error) {
                console.error('Error fetching agents:', error)
              }
            }
        
            fetchModel()
      }
      } catch (error) {
        console.error('Error fetching agents:', error)
      }
      setIsLoadingData(false)
    }

    fetchDC()
    //setUser(currentUser)
    if(currentUser?.role_name == "admin" || currentUser?.role_name == "super_client"){
      setReadOnly(false)
    }
  
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

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {

      setSubmitting(true)
      try {
        const response = values.id !== 0 ? await updateAsset(values) : await createAsset(values);
        setResultResponse(response);
        handleAlert(response)
      } catch (ex) {
        console.error(ex)
      }
    },
  })

  const handleSelectDCChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)
    formik.setFieldValue('dc_id', selectedOption ? selectedOption.value : null);
    setSelectedDCId(selectedOption?.value)
    const fetchStore = async () => {
        try {
          const stores = await getListStore(selectedOption?.value ?? 0)
          const formattedOptions = stores.data?.map((store): Option => ({ 
            value: store.store_id || 0,
            label: store.store_name || "",
          })) || []
          setStoreOptions(formattedOptions)
        } catch (error) {
          console.error('Error fetching agents:', error)
        }
      }
  
      fetchStore()
  };

  const handleSelectBrandChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)

    formik.setFieldValue('brand', selectedOption ? selectedOption.label : null);
    setSelectedBrand(selectedOption?.label)

    // Reset 'item_id' and 'modelOptions'
    formik.setFieldValue("item_id", null); // Reset item_id in Formik
    setModelOptions([]); // Clear model options

    const fetchModel = async () => {
        try {
          const models = await getListModel(selectedOption?.label || "")

          const formattedModelOptions = models.data?.map((model): Option => ({
            value: model.item_id || 0,
            label: model.model || "",
          })) || []
          setModelOptions(formattedModelOptions)

        } catch (error) {
          console.error('Error fetching agents:', error)
        }
      }
  
      if(selectedOption?.label != ""){
        fetchModel()
      }
  };

  const handleSelectChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)
    formik.setFieldValue('store_id', selectedOption ? selectedOption.value : null);

  };

  const handleSelectItemChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)
    formik.setFieldValue('item_id', selectedOption ? selectedOption.value : null);
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
          <div className='card' style={{border:'none',boxShadow:'none'}}>
            <div className='card-header card-header-stretch overflow-auto' style={{padding:'0px'}}>
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
                    className={clsx(`nav-link cursor-pointer`, {active: tab === 'Sidebar'})}
                    onClick={() => setTab('Sidebar')}
                    role='tab'
                  >
                    Detail
                  </a>
                </li>
                {
                  asset.id != 0 &&
                  <li className='nav-item'>
                    <a
                      className={clsx(`nav-link cursor-pointer`, {active: tab === 'Header'})}
                      onClick={() => setTab('Header')}
                      role='tab'
                    >
                      Logs
                    </a>
                  </li>
                }
                
              </ul>
            </div>
  

            <div className='card-body p-0'>
              <div className='tab-content pt-3'>
                <div className={clsx('tab-pane', {active: tab === 'Sidebar'})}>
                  <div className='form-group'>

                      <div className='fv-row mb-7'>
                        <label className='required form-label fw-bold'>DC</label>
                        <Select 
                        styles={customStyles} 
                        name="dc_id" 
                        options={dcOptions}
                        value={dcOptions?.find(option => option.value === formik.values.dc_id) || null}
                        onChange={handleSelectDCChange}
                        isDisabled={readOnly}
                        />
                        {formik.touched.dc_id && formik.errors.dc_id && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.dc_id}</span>
                            </div>
                        </div>
                        )}
                      </div>

                      <div className='fv-row mb-7'>
                        <label className='required form-label fw-bold'>Store</label>
                          <Select 
                            styles={customStyles} 
                            name="store_id" 
                            options={storeOptions}
                            value={storeOptions?.find(option => option.value === formik.values.store_id) || null}
                            onChange={handleSelectChange}
                            isDisabled={readOnly}
                          />
                          {formik.touched.store_id && formik.errors.store_id && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.store_id}</span>
                              </div>
                            </div>
                          )}
                      </div>

                    <div className='fv-row mb-7'>
                          <label className='required form-label fw-bold'>Brand</label>
                          <Select 
                          styles={customStyles} 
                          name="brand" 
                          options={brandOptions}
                          value={brandOptions?.find(option => option.label === formik.values.brand) || null}
                          onChange={handleSelectBrandChange}
                          isDisabled={readOnly}
                          />
                          {formik.touched.dc_id && formik.errors.dc_id && (
                          <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.dc_id}</span>
                              </div>
                          </div>
                          )}
                      </div>

                    <div className='fv-row mb-7'>
                      <label className='required form-label fw-bold'>Model</label>
                        <Select 
                          styles={customStyles} 
                          name="item_id" 
                          options={modelOptions}
                          value={modelOptions?.find(option => option.value === formik.values.item_id) || null}
                          onChange={handleSelectItemChange}
                          isDisabled={readOnly}
                        />
                        {formik.touched.item_id && formik.errors.item_id && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.item_id}</span>
                            </div>
                          </div>
                        )}
                    </div>

                    <div className='fv-row mb-7'>
                      <label className='required fw-bold fs-6 mb-2'>Serial Number</label>
                      <input
                        placeholder='Serial Number'
                        {...formik.getFieldProps('serial_number')}
                        type='text'
                        name='serial_number'
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          {'is-invalid': formik.touched.serial_number && formik.errors.serial_number},
                          {
                            'is-valid': formik.touched.serial_number && !formik.errors.serial_number,
                          }
                        )}
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                        readOnly={readOnly}
                      />
                      {formik.touched.serial_number && formik.errors.serial_number && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.serial_number}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
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
                          disabled={readOnly}
                        />
                        <label className='form-check-label'>Active</label>
                      </div>
                      
                    </div>

                    <div className='fv-row mb-7'>
                      <label className='required fw-bold fs-6 mb-2'>Delivery Date</label>
                      <input
                        placeholder='Delivery Date'
                        {...formik.getFieldProps('delivery_date')}
                        type='date'
                        name='delivery_date'
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          {'is-invalid': formik.touched.delivery_date && formik.errors.delivery_date},
                          {
                            'is-valid': formik.touched.delivery_date && !formik.errors.delivery_date,
                          }
                        )}
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                        readOnly={readOnly}
                      />
                      {formik.touched.delivery_date && formik.errors.delivery_date && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.delivery_date}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="row mb-7">
                      {/* <div className="col-12 col-lg-6">
                        <div className="fv-row">
                          <label className='required fw-bold fs-6 mb-2'>Warranty Status</label>
                          <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              name='waranty_status'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={formik.values.waranty_status}
                              disabled={readOnly}
                            />
                            <label className='form-check-label'>Active</label>
                          </div>
                        </div>
                      </div> */}
                      {
                        asset.id != 0 && 
                        <div className="col-12 col-lg-6">
                          <div className='fv-row'>
                            <label className='col-12 fw-bold fs-6 mb-2'>Warranty Expired</label>
                            <label className='col-12 fw-bold text-muted'>{asset.warranty_expired} 
                              {asset.warranty_status && <div className='badge badge-light-success fw-bolder'>Active</div>}
                              {!asset.warranty_status && <div className='badge badge-light-danger fw-bolder'>Non Active</div>}
                            </label>
                          </div>
                        </div>
                      }
                      
                    </div> 
                  </div>
                </div>

                <div className={clsx('tab-pane', {active: tab === 'Header'})}>
                  <div className='form-group'>
                  <div className='card-body py-3' style={{paddingRight:'0px',paddingLeft:'0px'}}>
                  {/* begin::Table container */}
                  <div className='table-responsive'>
                    {/* begin::Table */}
                    <table className='table align-middle gs-0 gy-4'>
                      {/* begin::Table head */}
                      <thead>
                        <tr className='fw-bold text-muted bg-light'>
                          <th className='min-w-125px'>Ticket No</th>
                          <th className='min-w-125px'>Complain At</th>
                          <th className='min-w-125px'>Case Category</th>
                          <th className='min-w-200px'>Part</th>
                          <th className='min-w-200px'>Status</th>
                          <th className='min-w-150px'>Replace s/n</th>
                        </tr>
                      </thead>
                      {/* end::Table head */}
                      {/* begin::Table body */}
                      <tbody>
                        {assetLog.map((log, index) => {
                          let statusClass = 'badge badge-light-secondary fw-bolder'; // Default case
                          let statusLabel = 'Unknown';
                          console.log(log.status)
                          switch (log.status?.toLowerCase()) {
                            case 'cancel':
                              statusClass = 'badge badge-light-danger fw-bolder';
                              statusLabel = 'Cancel';
                              break;
                            case 'in progress':
                              statusClass = 'badge badge-light-warning fw-bolder';
                              statusLabel = 'In Progress';
                              break;
                            case 'closed':
                              statusClass = 'badge badge-light-success fw-bolder';
                              statusLabel = 'Closed';
                              break;
                            case 'rejected':
                              statusClass = 'badge badge-light-danger fw-bolder';
                              statusLabel = 'Rejected';
                              break;
                            case 'open':
                              statusClass = 'badge badge-light-primary fw-bolder';
                              statusLabel = 'Open';
                              break;
                            case 'on hold':
                              statusClass = 'badge badge-light-danger fw-bolder';
                              statusLabel = 'On Hold';
                              break;
                          }

                          return (
                            <tr key={index}>
                              <td>
                                <div className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                  <Link to={`/apps/tickets/list?id=${log.ticket_id}`} className='btn btn-sm btn-primary fw-bold'>
                                    {log.ticket_no}
                                  </Link>
                                </div>
                              </td>
                              <td>
                                <div className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                  {log.complain_at || '-'}
                                </div>
                              </td>
                              <td>
                                <div className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                  {log.diagnostic_name || '-'}
                                </div>
                              </td>
                              <td>
                                <div className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                  {log.part_name || '-'}
                                </div>
                              </td>
                              <td>
                                <span className={statusClass}>{statusLabel}</span>
                              </td>
                              <td>
                                <span className="badge badge-light-primary fs-7 fw-semibold">
                                  {log.serial_number || '-'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      {/* end::Table body */}
                    </table>
                    {/* end::Table */}
                  </div>
                  {/* end::Table container */}
                </div>
                  </div>
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
            !readOnly && 
            <button
              type='submit'
              className='btn btn-primary'
              data-kt-users-modal-action='submit'
              disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched || isLoadingData }
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

export {AssetModalForm}
