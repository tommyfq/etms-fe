import React, { useState, useRef, useEffect} from 'react';
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getListYear, getListMonth} from '../../../../reporting/reporting-list/core/_requests'
import {downloadExcelFile} from '../../core/_request'

type OptionSelect = { value: number; label: string };

const TicketExportModal = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => setOpenMenu(!openMenu);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const {isLoading} = useQueryResponse()
  
    const [yearList, setYearList] = useState<string[]>([])
    const [monthList, setMonthList] = useState<OptionSelect[]>([])
    const [selectedYear, setSelectedYear] = useState<string>("")
    const [selectedMonth, setSelectedMonth] = useState<string>("")

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
            }
        };

        if (openMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenu]);

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
    }

    const exportData = async () => {
      await downloadExcelFile(selectedYear, selectedMonth);
      setOpenMenu(false);
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
      } else {
        setSelectedYear("")
        setMonthList([])
      }
    };
  
    return (
        <div className="mt-dropdown me-3" ref={dropdownRef}>
            <button className='btn btn-light-primary me-3' style={{height:'50px'}} onClick={toggleMenu}>
                <KTIcon iconName='exit-down' className='fs-2' />
                Export
            </button>
            {openMenu && (
                <div className="mt-dropdown-menu filter-report">
                    <div className='px-7 py-5'>
                      <div className='fs-5 text-gray-900 fw-bolder'>Export Options</div>
                    </div>
                    {/* end::Header */}

                    {/* begin::Separator */}
                    <div className='separator border-gray-200'></div>
                    {/* end::Separator */}

                    {/* begin::Content */}
                    <div className='px-7 py-5'>

                      <div className="mb-5">
                          <label className='fw-bold fs-6 mb-2'>Year:</label>
                          <div className='card-toolbar' data-kt-buttons='true'>
                            <select
                                id="year-select"
                                className='form-select form-select-sm form-select-solid'
                                value={selectedYear}
                                onChange={handleSelectYear}
                            >
                                <option value="">Select Year</option>
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
                                <option value="">Select Month</option>
                                {monthList.map((m) => (
                                <option key={m.value} value={m.value}>
                                    {m.label}
                                </option>
                                ))}
                            </select>
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
                          onClick={exportData}
                          className='btn btn-primary fw-bold px-6'
                          data-kt-menu-dismiss='true'
                          data-kt-user-table-filter='filter'
                        >
                          Export
                        </button>
                      </div>
                      {/* end::Actions */}
                    </div>
                </div>
            )}
        </div>
    );
};

export {TicketExportModal};
