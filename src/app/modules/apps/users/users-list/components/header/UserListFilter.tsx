import React, { useState, useRef, useEffect} from 'react';
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getListRole} from '../../core/_request'
import Select from 'react-select'

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

const UserListFilter = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const [roleOptions, setRoleOptions] = useState<any[]>([])
    const [selectedRole, setSelectedRole] = useState()

    const toggleMenu = () => setOpenMenu(!openMenu);
    // const toggleSubMenu = () => setOpenSubMenu(!openSubMenu);
    const dropdownRef = useRef(null);

    const {updateState} = useQueryRequest()
    const {isLoading} = useQueryResponse()
    // const [companyOptions, setCompanyOptions] = useState<any[]>()
    // const [company, setCompany] = useState();
  
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenMenu(false); // Close menu
                setOpenSubMenu(false); // Also close sub-menu
            }
        };

        const fetchRole = async () => {
          try {
            const roles = await getListRole()
            const formattedOptions = roles.data?.map((r) => {
              
              return {
                value: r.role_id,
                label: r.role_name,
              }
            })
            console.log(formattedOptions)
            setRoleOptions(formattedOptions)
    
          } catch (error) {
            console.error('Error fetching agents:', error)
          }
        }
    
        fetchRole()

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        
    }, []);

    const resetData = () => {
        setSelectedRole(null)
        setIsActive(true)
        updateState({filter: undefined, ...initialQueryState})
      }
    
      const filterData = () => {
        //const is_active = isActive
        updateState({
          filter: {is_active : isActive, role: selectedRole?.value},
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

    const handleSelectChange = (selectedOption: any) => {
      console.log("change role")
      setSelectedRole(selectedOption)
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

          <div className='mb-10'>
            <label className='form-label fw-bold'>Role :</label>
            <Select 
                styles={customStyles} 
                name="role_id" 
                options={roleOptions}
                value={selectedRole}
                onChange={handleSelectChange}
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

export default UserListFilter;
