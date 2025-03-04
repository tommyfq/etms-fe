/* eslint-disable @typescript-eslint/ban-ts-comment */
import {FC, useEffect, useRef, useState} from 'react'
import {getCSSVariableValue} from '../../../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {initialQueryState} from '../../../../../../_metronic/helpers'
import { getOverview } from '../core/_request'
import {useQueryRequest} from '../core/QueryRequestProvider'

import {OverviewTicket} from '../core/_models'


type Props = {
  className: string
  chartSize?: number
  chartLine?: number
  chartRotate?: number
}

const CardsWidgetTicket: FC<Props> = ({
  className,
  chartSize = 70,
  chartLine = 11,
  chartRotate = 145,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const [overview, setOverview] = useState<OverviewTicket[]>()
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const {updateState} = useQueryRequest()

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const overview = await getOverview()
        setOverview(overview.data)
      } catch (error) {
        console.error('Error fetching agents:', error)
      }
    }

    fetchAsset()
    refreshChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    setTimeout(() => {
      initChart(chartSize, chartLine, chartRotate)
    }, 10)
  }

  const getBulletColor = (status:string) => {
    switch (status) {
      case "Open":
        return "bg-success"; // Green for Open
      case "In Progress":
        return "bg-primary"; // Blue for In Progress
      case "Rejected":
        return "bg-danger"; // Red for Rejected
      case "Completed":
        return "bg-secondary"; // Gray for Completed
      case "On Hold":
        return "bg-warning"; // Yellow for On Hold
      default:
        return "bg-light"; // Default color
    }
  };

  const filterData = (status:string) => {
    setSelectedStatus(status);

    updateState({
      filter: {status:status},
      ...initialQueryState,
    })
  }

  return (
    <div className={`card card-flush ${className}`}>
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <div className='d-flex align-items-center'>
            <span className='fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2'>Overview Ticket</span>
          </div>
        </div>
      </div>

      <div className='card-body pt-2 pb-4 d-flex flex-wrap align-items-center'>
        <div className='d-flex flex-center me-5 pt-2'>
          <div
            id='kt_card_widget_17_chart'
            ref={chartRef}
            style={{minWidth: chartSize + 'px', minHeight: chartSize + 'px'}}
            data-kt-size={chartSize}
            data-kt-line={chartLine}
          ></div>
        </div>

        <div className='d-flex flex-column content-justify-center flex-row-fluid'>
        { overview?.map((ticket, index) => (
          <div 
            key={index} 
            className={`d-flex fw-semibold align-items-center my-1 ticket-item ${selectedStatus === ticket.status ? 'selected' : ''}`} 
            onClick={()=>filterData(ticket.status || "")}>
            <div className={`bullet w-8px h-3px rounded-2 ${getBulletColor(ticket.status || "")} me-3`}></div>
            <div className='text-gray-500 flex-grow-1 me-4'>{ticket.status}</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>{ticket.count}</div>
          </div>
        ))}
          {/* <div className='d-flex fw-semibold align-items-center my-1'>
            <div className='bullet w-8px h-3px rounded-2 bg-success me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Open</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>count</div>
          </div>
          <div className='d-flex fw-semibold align-items-center my-1'>
            <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>In Progress</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>count</div>
          </div>
          <div className='d-flex fw-semibold align-items-center my-1'>
            <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Rejected</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>count</div>
          </div>
          <div className='d-flex fw-semibold align-items-center my-1'>
            <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Complete</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>count</div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145
) {
  const el = document.getElementById('kt_card_widget_17_chart')
  if (!el) {
    return
  }
  el.innerHTML = ''

  const options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
    //percent:  el.getAttribute('data-kt-percent') ,
  }

  const canvas = document.createElement('canvas')
  const span = document.createElement('span')

  //@ts-ignore
  if (typeof G_vmlCanvasManager !== 'undefined') {
    //@ts-ignore
    G_vmlCanvasManager.initElement(canvas)
  }

  const ctx = canvas.getContext('2d')
  canvas.width = canvas.height = options.size

  el.appendChild(span)
  el.appendChild(canvas)


  ctx?.translate(options.size / 2, options.size / 2) // change center
  ctx?.rotate((-1 / 2 + options.rotate / 180) * Math.PI) // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  const radius = (options.size - options.lineWidth) / 2

  const drawCircle = function (color: string, lineWidth: number, percent: number) {
    percent = Math.min(Math.max(0, percent || 1), 1)
    if (!ctx) {
      return
    }

    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false)
    ctx.strokeStyle = color
    ctx.lineCap = 'round' // butt, round or square
    ctx.lineWidth = lineWidth
    ctx.stroke()
  }

  // Init 2
  drawCircle('#E4E6EF', options.lineWidth, 100 / 100)
  drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, 100 / 150)
  drawCircle(getCSSVariableValue('--bs-success'), options.lineWidth, 100 / 250)
}

export {CardsWidgetTicket}
