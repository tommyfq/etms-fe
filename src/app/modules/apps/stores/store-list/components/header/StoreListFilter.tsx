import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getListDC, getListCompany} from '../../core/_requests'
import Select from 'react-select'
import SearchableDropdown from './SearchableDropdown.tsx'

const customStyles = {
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

const StoreListFilter = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [companyOptions, setCompanyOptions] = useState<any[]>()
  const [company, setCompany] = useState();

  const [isActive, setIsActive] = useState(true); // State to track checkbox

  useEffect(() => {
    const fetchDC = async () => {
        try {
            const companies = await getListCompany()
            const formattedOptions = [
                { value: 0, label: "" }, // Add the null value and empty label option first
                ...companies.data?.map(c => ({
                    value: c.company_id,
                    label: c.company_name,
                })) || []
            ];

            console.log(formattedOptions)

            setCompanyOptions(formattedOptions)

        } catch (error) {
            console.error('Error fetching agents:', error)
        }
    }

    fetchDC()

    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    setCompany("")
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    //const is_active = isActive
    console.log(company)
    updateState({
      filter: {is_active : isActive, company: company},
      ...initialQueryState,
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsActive(event.target.checked); // Update state based on checkbox status
    // You can perform additional actions here if needed
    console.log("Checkbox is now:", event.target.checked);
  };

//   const handleCompanySelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setCompany(event.target.value); // Update the selected role
// };

const handleCompanySelected = (selectedOption) => {
  setCompany(selectedOption); // Update the selected role
};


  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-light-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTIcon iconName='filter' className='fs-2' />
        Filter
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-gray-900 fw-bolder'>Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5'>
          <div className='mb-10'>
            <label className='form-label fw-bold'>Status:</label>

            <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid'>
                <input
                className='form-check-input'
                type='checkbox'
                value=''
                name='is_active'
                defaultChecked={true}
                checked={isActive} // Use state value for controlled checkbox
                onChange={handleCompanySelected} // Add change handler
                />
                <label className='form-check-label'>Active</label>
            </div>
          </div>

          {/* begin::Input group */}
          <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>Company</label>
            {/* <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='role'
              data-hide-search='true'
              onChange={handleCompanySelected}
              value={company}
            >
              <option value=''></option>
                {companyOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select> */}

            <Select 
              styles={customStyles} 
              name="company_id" 
              options={companyOptions}
              // value={companyOptions?.find(option => option.value === company?.value) || null}
              onChange={handleCompanySelected}
              // onBlur={() => formik.setFieldTouched('company_id')}
            />
          </div>
           {/* <SearchableDropdown 
                options={companyOptions || []}
                label="Company"
                onChange={handleCompanySelected}
                dataAttributes={{
                    'data-kt-select2': 'true',
                    'data-placeholder': 'Select option',
                    'data-allow-clear': 'true',
                    'data-kt-user-table-filter': 'role',
                    'data-hide-search': 'true',
                }}
            /> */}
          {/* end::Input group */}

          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={resetData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type='button'
              onClick={filterData}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {StoreListFilter}
