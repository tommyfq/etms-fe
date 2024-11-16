import React, { useState, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import moment from 'moment';
import { getTicketChartByYear } from '../core/_requests'
import {getCSSVariableValue} from '../../../../_metronic/assets/ts/_utils'


const ChartLineTransaction: React.FC = () => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [currentYear, setCurrentYear] = useState(moment().year());
  const [yearList, setYearList] = useState<number[]>([])
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await getTicketChartByYear(currentYear)
        const data = response.data?.chartData ?? []
        const yearData = response.data?.yearList ?? []
        setChartData(data)
        setYearList(yearData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentYear]);

  useEffect(() => {
    const lineTransactionColor = getCSSVariableValue('--bs-primary')
    const lightColor = getCSSVariableValue('--bs-info-light')
    const borderColor = getCSSVariableValue('--bs-gray-200')
    const labelColor = getCSSVariableValue('--bs-gray-500')
    const baseColor = getCSSVariableValue('--bs-info')
    

    if (chartData.length > 0 && chartRef.current) {
      const options: ApexCharts.ApexOptions = {
        chart: {
          fontFamily: 'inherit',
          type: 'area',
          height: 500,
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: 'solid',
          opacity: 1,
        },
        stroke: {
          curve: 'smooth',
          show: true,
          width: 3,
          colors: [lineTransactionColor, baseColor],
        },
        series: [
          {
            name: 'Data',
            data: chartData,
          },
        ],
        xaxis: {
          categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: labelColor,
              fontSize: '12px',
            },
          },
          crosshairs: {
            position: 'front',
            stroke: {
              color: baseColor,
              width: 1,
              dashArray: 3,
            },
          },
          tooltip: {
            enabled: true,
            formatter: undefined,
            offsetY: 0,
            style: {
              fontSize: '12px',
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: labelColor,
              fontSize: '12px',
            },
          },
        },
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0,
            },
          },
          hover: {
            filter: {
              type: 'none',
              value: 0,
            },
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: 'none',
              value: 0,
            },
          },
        },
        tooltip: {
          style: {
            fontSize: '12px',
          },
          y: {
            formatter: function (val) {
              return val + ' tickets'
            },
          },
        },
        colors: [lineTransactionColor, lightColor],
        grid: {
          borderColor: borderColor,
          strokeDashArray: 4,
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
      };

      // Initialize the chart
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      // Cleanup on unmount
      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  return (
    <div className={`card card-xl-stretch mb-xl-8'`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Recent Tickets</span>

          <span className='text-muted fw-semibold fs-7'>More than 1000 new records</span>
        </h3>

        {/* begin::Toolbar */}
        <div className='card-toolbar' data-kt-buttons='true'>
          <label htmlFor="year-select" style={{ marginRight: '10px' }}>Select Year:</label>
          <select
            id="year-select"
            className="className='form-select form-select-sm w-md-125px form-select-solid'"
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
          >
            {yearList.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export default ChartLineTransaction;
