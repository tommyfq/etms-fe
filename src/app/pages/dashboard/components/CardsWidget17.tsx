/* eslint-disable @typescript-eslint/ban-ts-comment */
import {FC, useEffect, useRef, useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import {getCSSVariableValue} from '../../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { getSLATicket } from '../core/_requests'
import { SLATickets } from '../core/_models'

type Props = {
  className: string
  chartSize?: number
  chartLine?: number
  chartRotate?: number
}

const CardsWidget17: FC<Props> = ({
  className,
  chartSize = 70,
  chartLine = 11,
  chartRotate = 145,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  const [slaTicket, setSLATicket] = useState<SLATickets>({
    total_tickets: 0,
    sla_performed: 0,
    sla_not_performed: 0,
  })

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await getSLATicket()
        if(response.data){
          const rawData: SLATickets = response.data;
          setSLATicket(rawData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  },[])

  useEffect(() => {
    refreshChart(slaTicket)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, slaTicket])

  const refreshChart = (slaTicket: SLATickets) => {
    if (!chartRef.current) {
      return
    }

    setTimeout(() => {
      initChart(chartSize, chartLine, chartRotate, slaTicket?.total_tickets ?? 0, slaTicket?.sla_performed ?? 0, slaTicket?.sla_performed ?? 0)
    }, 10)
  }

  return (
    <div className={`card card-flush ${className}`}>
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <div className='d-flex align-items-center'>
            <span className='fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2'>{slaTicket?.total_tickets}</span>
            <span className='fs-4 fw-semibold text-gray-500 me-1 align-self-start'>Tickets</span>

            {(slaTicket.total_tickets ?? 0) > 0 && (
              <span className={`badge badge-light-${(slaTicket?.sla_performed ?? 0) > (slaTicket?.sla_not_performed ?? 0) ? 'success' : 'danger'} fs-base`}>
              <KTIcon iconName={
                (slaTicket?.sla_performed ?? 0) > (slaTicket?.sla_not_performed ?? 0) 
                  ? 'arrow-up' 
                  : 'arrow-down'
              }  
              className={`fs-5 text-${(slaTicket?.sla_performed ?? 0) > (slaTicket?.sla_not_performed ?? 0) ? 'success' : 'danger'} ms-n1`} /> {
                  (slaTicket?.sla_performed ?? 0) > (slaTicket?.sla_not_performed ?? 0) ? 
                ((slaTicket?.sla_performed ?? 0) / (slaTicket?.total_tickets ?? 0)) * 100 : 
                ((slaTicket?.sla_not_performed ?? 0) / (slaTicket?.total_tickets ?? 0)) * 100
              }%
            </span>
            )}
            
          </div>
          <span className='text-gray-500 pt-1 fw-semibold fs-6'>SLA Ticket Performance </span>
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
          <div className='d-flex fw-semibold align-items-center my-3'>
            <div
              className='bullet w-8px h-3px rounded-2 me-3'
              style={{backgroundColor: '#E4E6EF'}}
            ></div>
            <div className='text-gray-500 flex-grow-1 me-4'>SLA Ticket Non Performed</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>{slaTicket?.sla_not_performed ?? 0}</div>
          </div>
          <div className='d-flex fw-semibold align-items-center'>
            <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>SLA Ticket Performed</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>{slaTicket?.sla_performed ?? 0}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145,
  total: number,
  sla_performed: number, 
  sla_not_performed: number
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
  drawCircle('#E4E6EF', options.lineWidth, (sla_not_performed + sla_performed) / total)
  drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, sla_performed / total)
}

export {CardsWidget17}
