import React, { useState, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import moment from 'moment';
import { getTicketChartByYear } from '../core/_requests'


const ChartLineTransaction: React.FC = () => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartDataSLA, setChartDataSLA] = useState<number[]>([]);
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
        const dataSLA = response.data?.chartDataSLA ?? []
        setChartData(data)
        setChartDataSLA(dataSLA)
        setYearList(yearData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentYear]);

  useEffect(() => {

    if (chartData.length > 0 && chartRef.current) {
      const options: ApexCharts.ApexOptions = {
        chart: {
          fontFamily: 'inherit',
          type: 'bar',
          height: 500,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            colors: ['#000'],
          },
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        series: [
          {
            name: 'SLA',
            data: chartDataSLA, // Total values for each month
          },
          {
            name: 'Total',
            data: chartData, // Expected target for each month
          },
        ],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          labels: {
            style: {
              fontSize: '12px',
              colors: '#666',
            },
          },
        },
        yaxis: {
          title: {
            text: 'Value',
          },
          labels: {
            style: {
              fontSize: '12px',
              colors: '#666',
            },
          },
        },
        colors: ['#008FFB', '#FEB019'], // Blue for Total, Yellow for Expected
        tooltip: {
          y: {
            formatter: function (val) {
              return `${val} tickets`;
            },
          },
        },
        grid: {
          borderColor: '#f1f1f1',
          strokeDashArray: 4,
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
