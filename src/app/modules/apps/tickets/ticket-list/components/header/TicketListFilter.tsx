import React, { useState, useRef, useEffect} from 'react';
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getListStatus} from '../../core/_request'
import Select, { StylesConfig, ActionMeta, SingleValue } from 'react-select'
import { hashStringToNumber } from '../../../../../../helpers/helper'
import clsx from 'clsx'
import { useSearchParams, useNavigate } from 'react-router-dom'

type Option = { value: number; label: string };


const customSingleStyles: StylesConfig<Option, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#f8f9fa',
    border: state.isFocused ? '0px solid #DBDFE9' : '0px solid #DBDFE9',
    boxShadow: 'none',
    fontFamily: 'Inter, Helvetica, sans-serif',
    fontSize: '14px',
    fontWeight: '600',
    color:'#99a1b7',
    width: '200px',
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

const TicketListFilter = () => {
    const [openMenu, setOpenMenu] = useState(false);
    //const [dcOptions, setDCOptions] = useState<Option[]>([])
    const [statusOptions, setStatusOptions] = useState<Option[]>([])
    //const [selectedDC, setSelectedDC] = useState<number[] | null>(null);
    const [selectedPart, setSelectedPart] = useState<number[] | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>()
    //const [isDisableDC, setIsDisableDC] = useState<boolean>(false)

    const toggleMenu = () => setOpenMenu(!openMenu);
    // const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const {updateState} = useQueryRequest()
    const {isLoading} = useQueryResponse()
    // const [companyOptions, setCompanyOptions] = useState<any[]>()
    // const [company, setCompany] = useState();
  
    const [fromDate, setFromDate] = useState<string>('')
    const [toDate, setToDate] = useState<string>('')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const initialStatus = searchParams.get('status') || undefined

    useEffect(() => {
        // const handleClickOutside = (event:any) => {
        //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        //         setOpenMenu(false); // Close menu
        //         //setOpenSubMenu(false); // Also close sub-menu
        //     }
        // };

        const fetchRole = async () => {
          try {

            const status = await getListStatus();

            const formattedStatusOptions = status.data?.map((r): Option => {
              return {
                value: hashStringToNumber(r) || 0,
                label: r || "",
              }
            }) || []
            setStatusOptions(formattedStatusOptions)

            if(initialStatus != ""){
              setSelectedStatus(initialStatus)
            }

            // const dcs = await getListAllDC([])
            // const formattedOptions = dcs.data?.map((r): Option => {
            //   return {
            //     value: r.dc_id || 0,
            //     label: r.dc_name || "",
            //   }
            // }) || []
            // console.log(formattedOptions)
            // setDCOptions(formattedOptions)
    
          } catch (error) {
            console.error('Error fetching agents:', error)
          }
        }
    
        fetchRole()

        // document.addEventListener('mousedown', handleClickOutside);
        // return () => {
        //     document.removeEventListener('mousedown', handleClickOutside);
        // };
        
    }, []);

    const resetData = () => {
        setSelectedPart(null)
        setSelectedStatus("")
        setFromDate("")
        setToDate("")

        if(initialStatus != ""){
          navigate('/apps/tickets/list')
        }
        
        updateState({filter: undefined, ...initialQueryState})
      }
    
      const filterData = () => {
        console.log(selectedStatus)
        //const is_active = isActive
        if(initialStatus != ""){
          navigate('/apps/tickets/list')
        }

        updateState({
          filter: {status: selectedStatus, part: selectedPart, from_date:fromDate, to_date:toDate},
          ...initialQueryState,
        })
      }

       const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFromDate = e.target.value;
        if (toDate && new Date(newFromDate) > new Date(toDate)) {
          //setWarning("From date cannot be greater than To date.");
          setFromDate(""); // Reset the field
        } else {
          //setWarning(""); // Clear warning
          setFromDate(newFromDate);
        }
      };

      const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newToDate = e.target.value;
        if (fromDate && new Date(newToDate) < new Date(fromDate)) {
          //setWarning("To date cannot be earlier than From date.");
          setToDate(""); // Reset the field
        } else {
          //setWarning(""); // Clear warning
          setToDate(newToDate);
        }
      };
    
      // const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      //   setIsActive(event.target.checked); // Update state based on checkbox status
      //   // You can perform additional actions here if needed
      //   console.log("Checkbox is now:", event.target.checked);
      // };
    
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

  const handleSelectStatusChange = (
    selectedOption: SingleValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    console.log(actionMeta)
    setSelectedStatus(selectedOption?.label)
  };

  // const handleSelectCompChange = async (
  //   selectedOption: SingleValue<Option> | MultiValue<Option>, // Use SingleValue to allow for null
  //   actionMeta: ActionMeta<Option>
  // ) => {
  //   const arrComp: number[] = [(selectedOption as Option).value];

  //   console.log(actionMeta)
  //   console.log("change role")
  //   setSelectedComp([(selectedOption as Option).value])

  //   const dcs = await getListAllDC(arrComp)
  //   const formattedOptions = dcs.data?.map((r): Option => {
  //     return {
  //       value: r.dc_id || 0,
  //       label: r.dc_name || "",
  //     }
  //   }) || []
  //   console.log(formattedOptions)
  //   setDCOptions(formattedOptions)
  //   setIsDisableDC(false)
  // };
    
    return (
        <div className="mt-dropdown me-3" ref={dropdownRef}>
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
        <div className='mb-5'>
            <label className='form-label fw-bold'>Status :</label>
            <Select 
                styles={customSingleStyles} 
                name="status" 
                options={statusOptions}
                value={statusOptions.find((option) => option.label === selectedStatus) || null} // Ensure selected options are displayed
                onChange={handleSelectStatusChange}
                />
          </div>

          <div className="mb-5">
              <label className='fw-bold fs-6 mb-2'>From</label>
              <input
                placeholder='Delivery Date'
                type='date'
                name='from_date'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                onChange={handleFromDateChange}
                value={fromDate}
              />
          </div>
          <div className="mb-5">
              <label className='fw-bold fs-6 mb-2'>To</label>
              <input
                placeholder='Delivery Date'
                type='date'
                name='to_date'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                onChange={handleToDateChange}
                value={toDate}
              />
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
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
                </div>
            )}
        </div>
    );
};

export {TicketListFilter};
