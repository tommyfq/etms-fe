import React, { useState, useRef, useEffect} from 'react';
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getListAllDC, getListCompany, getListAllStore} from '../../core/_requests'
import Select, { StylesConfig, ActionMeta, SingleValue, MultiValue } from 'react-select'
import { useAuth } from '../../../../../auth'

type Option = { value: number; label: string };

const customStyles: StylesConfig<Option, true> = {
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

const AssetListFilter = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [storeOptions, setStoreOptions] = useState<Option[]>([])
    const [dcOptions, setDCOptions] = useState<Option[]>([])
    const [compOptions, setCompOptions] = useState<Option[]>([])
    const [selectedStore, setSelectedStore] = useState<number[] | null>(null);
    const [selectedDC, setSelectedDC] = useState<number[] | null>(null);
    const [selectedComp, setSelectedComp] = useState<number[] | null>(null);
    const [isDisableDC, setIsDisableDC] = useState<boolean>(false)
    const {currentUser} = useAuth()
    const [role, setRole] = useState<string>("")

    const toggleMenu = () => setOpenMenu(!openMenu);
    // const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const {updateState} = useQueryRequest()
    const {isLoading} = useQueryResponse()
    // const [companyOptions, setCompanyOptions] = useState<any[]>()
    // const [company, setCompany] = useState();
  
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {

        setRole(currentUser?.role_name ?? "")
        
        if(currentUser?.role_name != "admin"){
            setSelectedComp(currentUser?.company_id ? [currentUser.company_id] : [0]);
            const fetchDC = async () => {
                try{
                    const resp = await getListAllDC(currentUser?.company_id ? [currentUser.company_id] : [0])
                    
                    const formattedOptions = resp.data?.dcs?.map((r): Option => {
                    return {
                        value: r.dc_id || 0,
                        label: r.dc_name || "",
                    }
                    }) || []
                    setDCOptions(formattedOptions)

                    const formattedStoreOptions = resp.data?.stores?.map((r): Option => {
                    return {
                        value: r.store_id || 0,
                        label: r.store_name || "",
                    }
                    }) || []
                    setStoreOptions(formattedStoreOptions)

                }catch(error){
                    console.error('Error fetching agents:', error)
                }
            }
            fetchDC()
        }

        // const handleClickOutside = (event:any) => {
        //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        //         setOpenMenu(false); // Close menu
        //         //setOpenSubMenu(false); // Also close sub-menu
        //     }
        // };

        initialFetchData()

        // document.addEventListener('mousedown', handleClickOutside);
        // return () => {
        //     document.removeEventListener('mousedown', handleClickOutside);
        // };
        
    }, []);

    const resetData = () => {
        setSelectedComp(null)
        setSelectedDC(null)
        setSelectedStore(null)
        setIsActive(true)
        initialFetchData()
        updateState({filter: undefined, ...initialQueryState})
      }
    
      const filterData = () => {
        //const is_active = isActive
        updateState({
          filter: {is_active : isActive, dcs: selectedDC, comp: selectedComp, store:selectedStore},
          ...initialQueryState,
        })
      }
    
      const initialFetchData = async () => {
        
          try {
            const companies = await getListCompany();

            const formattedCompOptions = companies.data?.map((r): Option => {
              return {
                value: r.company_id || 0,
                label: r.company_name || "",
              }
            }) || []
            setCompOptions(formattedCompOptions)

            const resp = await getListAllDC([])
            const formattedOptions = resp.data?.dcs.map((r): Option => {
              return {
                value: r.dc_id || 0,
                label: r.dc_name || "",
              }
            }) || []
            setDCOptions(formattedOptions)

            const formattedStoreOptions = resp.data?.stores?.map((r): Option => {
              return {
                value: r.store_id || 0,
                label: r.store_name || "",
              }
            }) || []
            setStoreOptions(formattedStoreOptions)
    
          } catch (error) {
            console.error('Error fetching agents:', error)
          }
        
      }

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setIsActive(event.target.checked); // Update state based on checkbox status
        // You can perform additional actions here if needed
      };
    
    //   const handleCompanySelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setCompany(event.target.value); // Update the selected role
    // };

    const handleSelectChange = async (
        selectedOption: SingleValue<Option> | MultiValue<Option>,
        actionMeta: ActionMeta<Option>
      ) => {
      console.log(actionMeta)
      let dcIds: number[] = [];

      if (Array.isArray(selectedOption)) {
        console.log("IS ARRAY");
        console.log(selectedOption)
        // Multiple values for agents
        dcIds = selectedOption.map((option) => option.value);
        setSelectedDC(dcIds)

      } else if (selectedOption){

        dcIds = [(selectedOption as Option).value];
        setSelectedDC(dcIds);
        
      } else {
        setSelectedDC([])
        // No selection
      }

      if(dcIds.length > 0){
        const stores = await getListAllStore(dcIds)
        const formattedOptions = stores.data?.map((r): Option => {
        return {
            value: r.store_id || 0,
            label: r.store_name || "",
        }
        }) || []
        setStoreOptions(formattedOptions)
      }else{
        const resp = await getListAllDC(selectedComp?? [])

        const formattedStoreOptions = resp.data?.stores?.map((r): Option => {
          return {
            value: r.store_id || 0,
            label: r.store_name || "",
          }
        }) || []
        setStoreOptions(formattedStoreOptions)

      }
      
    };

    const handleSelectStoreChange = (
        selectedOption: SingleValue<Option> | MultiValue<Option>,
        actionMeta: ActionMeta<Option>
      ) => {
      console.log(actionMeta)

      if (Array.isArray(selectedOption)) {
        // Multiple values for agents
        setSelectedStore(selectedOption.map((option)=>option.value))
      } else if (selectedOption){

        setSelectedStore( [(selectedOption as Option).value])
      } else {
        setSelectedStore([])
        // No selection
      }
    };

  //   const handleSelectCompChange = async (
  //     selectedOption: SingleValue<Option> | MultiValue<Option>,
  //     actionMeta: ActionMeta<Option>
  //   ) => {
  //   setIsDisableDC(true)
  //   console.log(actionMeta)
  //   console.log("change company")

  //   let arrComp: number[]

  //   if (Array.isArray(selectedOption)) {
  //     // Multiple values for agents
  //     setSelectedComp(selectedOption.map((option)=>option.value))
  //     arrComp = selectedOption.map((option) => option.value)
  //   } else if (selectedOption){
  //     arrComp = [(selectedOption as Option).value];
  //     setSelectedComp( [(selectedOption as Option).value])
  //   } else {
  //     arrComp = [];
  //     setSelectedComp([])
  //     // No selection
  //   }

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

  const handleSelectCompChange = async (
    selectedOption: SingleValue<Option> | MultiValue<Option>, // Use SingleValue to allow for null
    actionMeta: ActionMeta<Option>
  ) => {
    const arrComp: number[] = [(selectedOption as Option).value];

    console.log(actionMeta)
    setSelectedComp([(selectedOption as Option).value])

    const resp = await getListAllDC(arrComp)
    const formattedOptions = resp.data?.dcs?.map((r): Option => {
      return {
        value: r.dc_id || 0,
        label: r.dc_name || "",
      }
    }) || []
    setDCOptions(formattedOptions)

    const formattedStoreOptions = resp.data?.stores?.map((r): Option => {
      return {
        value: r.store_id || 0,
        label: r.store_name || "",
      }
    }) || []
    setStoreOptions(formattedStoreOptions)

    setIsDisableDC(false)
  };
    
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
                onChange={handleChange} // Add change handler
                />
                <label className='form-check-label'>Active</label>
            </div>
          </div>

          {
            role == "admin" && 
            <div className='mb-10'>
                <label className='form-label fw-bold'>Company :</label>
                <Select 
                    styles={customStyles} 
                    name="comp" 
                    options={compOptions}
                    value={compOptions.filter((option) => selectedComp?.includes(option.value))} // Ensure selected options are displayed
                    onChange={handleSelectCompChange}
                    />
            </div>
          }

          <div className='mb-10'>
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
          </div>

          <div className='mb-10'>
            <label className='form-label fw-bold'>Store :</label>
            <Select 
                styles={customStyles} 
                name="store"
                options={storeOptions}
                value={storeOptions.filter((option) => selectedStore?.includes(option.value))} // Ensure selected options are displayed
                onChange={handleSelectStoreChange}
                isMulti={true}
                />
          </div>

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

export {AssetListFilter};
