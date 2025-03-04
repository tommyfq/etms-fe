import React, { useState, useRef, useEffect} from 'react';
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvder'
import {getListYear, getListMonth, downloadExcelFile} from '../../core/_requests'
// import { StylesConfig, ActionMeta, SingleValue } from 'react-select'
// import { hashStringToNumber } from '../../../../../../helpers/helper'
import clsx from 'clsx'
import moment from 'moment';

type OptionSelect = { value: number; label: string };


// const customSingleStyles: StylesConfig<Option, false> = {
//   control: (provided, state) => ({
//     ...provided,
//     backgroundColor: '#f8f9fa',
//     border: state.isFocused ? '0px solid #DBDFE9' : '0px solid #DBDFE9',
//     boxShadow: 'none',
//     fontFamily: 'Inter, Helvetica, sans-serif',
//     fontSize: '14px',
//     fontWeight: '600',
//     color:'#99a1b7',
//     width: '200px',
//   }),
//   menu: (provided) => ({
//     ...provided,
//     position: 'absolute',
//     zIndex: 9999,
//     borderRadius: '4px',
//     border: '1px solid #ced4da',
//     marginTop: '0',
//     fontFamily: 'Inter, Helvetica, sans-serif',
//     fontSize: '13px',
//     fontWeight: '400',
//     //color:'#99a1b7',
//   }),
//   menuPortal: (provided) => ({
//     ...provided,
//     zIndex: 9999,
//     position: 'fixed', // Make the dropdown menu fixed
//     top: `${provided.top}px`, // Use calculated position from react-select
//     left: `${provided.left}px`, // Use calculated position from react-select
//     width: provided.width,  // Ensure the width matches the control
//     //color:'#99a1b7',
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     fontFamily: 'Inter, Helvetica, sans-serif',
//     fontSize: '13px',
//     fontWeight: '400',
//     color:'#99a1b7',
//   }),
//   indicatorSeparator: () => ({
//     display: 'none'  // Remove the vertical line before the dropdown arrow
//   })
// };

const ReportingListFilter = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => setOpenMenu(!openMenu);
    // const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const {updateState} = useQueryRequest()
    const {isLoading} = useQueryResponse()
    // const [companyOptions, setCompanyOptions] = useState<any[]>()
    // const [company, setCompany] = useState();
  
    const [yearList, setYearList] = useState<string[]>([])
    const [monthList, setMonthList] = useState<OptionSelect[]>([])
    const [selectedYear, setSelectedYear] = useState<string>("")
    const [selectedMonth, setSelectedMonth] = useState<string>("")

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
          try {
            const response = await getListYear()
            const yearData = response.data ?? []
            setYearList(yearData)

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    const resetData = () => {
        setSelectedMonth("")
        setSelectedYear("")
        updateState({filter: undefined, ...initialQueryState})
      }
    
      const filterData = () => {
        //const is_active = isActive
        
        updateState({
          filter: {year: selectedYear, month: selectedMonth},
          ...initialQueryState,
        })
      }

      const exportData = async () => {

        await downloadExcelFile(selectedYear, selectedMonth)
       
      };
    
      const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const year = event.target.value;
        if(year != ""){
          const fetchData = async () => {
            try {
              const response = await getListMonth(year)
              const formattedOptions = response.data?.map((r): OptionSelect => {
                return {
                  value: r.value || 0,
                  label: r.label || "",
                }
              }) || []
              
              setMonthList(formattedOptions)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
          setSelectedYear(event.target.value)
        }
      };
    
    //   const handleCompanySelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setCompany(event.target.value); // Update the selected role
    // };

    // const handleSelectChange = (
    //     selectedOption: SingleValue<Option> | MultiValue<Option>,
    //     actionMeta: ActionMeta<Option>
    //   ) => {
    //   console.log(actionMeta)
    //   console.log("change dc")

    //   if (Array.isArray(selectedOption)) {
    //     // Multiple values for agents
    //     setSelectedDC(selectedOption.map((option)=>option.value))
    //   } else if (selectedOption){

    //     setSelectedDC( [(selectedOption as Option).value])
    //   } else {
    //     setSelectedDC([])
    //     // No selection
    //   }
    // };

//   const handleSelectStatusChange = (
//     selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
//     actionMeta: ActionMeta<Option>
//   ) => {
//     console.log(actionMeta)
//     console.log("change status")
//     setSelectedStatus(selectedOption?.label)
//   };
    
    return (
        <div className="mt-dropdown me-3" ref={dropdownRef} style={{right:'0%'}}>
            <button className='btn btn-light-primary me-3' style={{height:'50px'}} onClick={toggleMenu}>
                <KTIcon iconName='filter' className='fs-2' />
                Filter
            </button>
            {openMenu && (
                <div className="mt-dropdown-menu">
                    <div className='px-7 py-5'>
          <div className='fs-5 text-gray-900 fw-bolder'>Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5'>
        {/* <div className='mb-5'>
            <label className='form-label fw-bold'>Status :</label>
            <Select 
                styles={customSingleStyles} 
                name="status" 
                options={statusOptions}
                value={statusOptions.find((option) => option.label === selectedStatus) || null} // Ensure selected options are displayed
                onChange={handleSelectStatusChange}
                />
          </div> */}

          <div className="mb-5">
              <label className='fw-bold fs-6 mb-2'>Year:</label>
              <div className='card-toolbar' data-kt-buttons='true'>
                <select
                    id="year-select"
                    className='form-select form-select-sm form-select-solid'
                    value={selectedYear}
                    onChange={handleSelectYear}
                >
                    {yearList.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    ))}
                </select>
              </div>
          </div>
          <div className="mb-5">
              <label className='fw-bold fs-6 mb-2'>Month:</label>
              <select
                    id="month-select"
                    className='form-select form-select-sm form-select-solid'
                    disabled={selectedYear == ""}
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {monthList.map((m) => (
                    <option value={m.value}>
                        {m.label}
                    </option>
                    ))}
                </select>
              </div>
          {/* <div className='mb-10'>
            <label className='form-label fw-bold'>DC :</label>
            <Select 
                styles={customStyles} 
                name="dc" 
                options={dcOptions}
                value={dcOptions.filter((option) => selectedDC?.includes(option.value))} // Ensure selected options are displayed
                onChange={handleSelectChange}
                isMulti={true}
                isDisabled={isDisableDC}
                />
          </div> */}

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
              className='btn btn-primary fw-bold px-6 me-2'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
            {/* begin::Export */}
            <button type='button' className='btn btn-light-primary me-3' onClick={exportData}>
              Export
            </button>
            {/* end::Export */}
          </div>
          {/* end::Actions */}
        </div>
                </div>
            )}
        </div>
    );
};

export {ReportingListFilter};
