import { useEffect, useState } from 'react'
import {Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {KTIcon } from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {AssetLog} from '../core/_models'
import { getAssetLogById } from '../core/_request' 
import { useNavigate } from "react-router-dom";


//const MySwal = withReactContent(Swal);

const TicketAssetLogForm = () => {
    const {assetId, setAssetId} = useListView()
    const [show, setShow] = useState<boolean>(false)
    const [assetLog, setAssetLog] = useState<AssetLog[]>([])
    const navigate = useNavigate();


    useEffect(() => {
        console.log("OPEN");

        const fetchData = async () => {
            const logs = await getAssetLogById(assetId)
            const formattedLogs = logs.data?.map((log:AssetLog) => ({
              ticket_id: log.ticket_id,
              ticket_no: log.ticket_no,
              complain_at: log.complain_at,
              diagnostic_name: log.diagnostic_name,
              part_name: log.part_name,
              serial_number: log.serial_number,
              status: log.status,
            })) || []
            console.log(logs);
            setAssetLog(formattedLogs)
        }
        if(assetId !== undefined){
            setShow(true);
            fetchData();
            console.log(assetLog);
        }
      }, []);

      const handleLinkClick = (ticketId?: number) => {
        if (ticketId === undefined) return; // Prevent navigation if ticketId is undefined
        setShow(false);
        setAssetId(undefined)
        setTimeout(() => {
          navigate(`/apps/tickets/list?id=${ticketId}`);
        }, 300);
      };

      return (
        <Modal
          show={show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              History Asset Log
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{
                margin:'0px 0px 10px 0px'
            }}>
            <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table align-middle gs-0 gy-4'>
                    {/* begin::Table head */}
                    <thead>
                    <tr className='fw-bold text-muted bg-light'>
                        <th className='min-w-125px'>Ticket No</th>
                        <th className='min-w-125px'>Complain At</th>
                        <th className='min-w-125px'>Case Category</th>
                        <th className='min-w-200px'>Part</th>
                        <th className='min-w-200px'>Status</th>
                        <th className='min-w-150px'>Replace s/n</th>
                    </tr>
                    </thead>
                    {/* end::Table head */}
                    {/* begin::Table body */}
                    <tbody>
                    {assetLog.map((log, index) => {
                        let statusClass = 'badge badge-light-secondary fw-bolder'; // Default case
                        let statusLabel = 'Unknown';
                        console.log(log.status)
                        switch (log.status?.toLowerCase()) {
                        case 'cancel':
                            statusClass = 'badge badge-light-danger fw-bolder';
                            statusLabel = 'Cancel';
                            break;
                        case 'in progress':
                            statusClass = 'badge badge-light-warning fw-bolder';
                            statusLabel = 'In Progress';
                            break;
                        case 'closed':
                            statusClass = 'badge badge-light-success fw-bolder';
                            statusLabel = 'Closed';
                            break;
                        case 'rejected':
                            statusClass = 'badge badge-light-danger fw-bolder';
                            statusLabel = 'Rejected';
                            break;
                        case 'open':
                            statusClass = 'badge badge-light-primary fw-bolder';
                            statusLabel = 'Open';
                            break;
                        case 'on hold':
                            statusClass = 'badge badge-light-danger fw-bolder';
                            statusLabel = 'On Hold';
                            break;
                        }

                        return (
                        <tr key={index}>
                            <td>
                            <div className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                <button
                                className="btn btn-sm btn-primary fw-bold"
                                onClick={() => handleLinkClick(log.ticket_id ?? 0)}
                                >
                                {log.ticket_no}
                                </button>
                            </div>
                            </td>
                            <td>
                            <div className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                {log.complain_at || '-'}
                            </div>
                            </td>
                            <td>
                            <div className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                {log.diagnostic_name || '-'}
                            </div>
                            </td>
                            <td>
                            <div className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                {log.part_name || '-'}
                            </div>
                            </td>
                            <td>
                            <span className={statusClass}>{statusLabel}</span>
                            </td>
                            <td>
                            <span className="badge badge-light-primary fs-7 fw-semibold">
                                {log.serial_number || '-'}
                            </span>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                    {/* end::Table body */}
                </table>
                {/* end::Table */}
                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <button
                    type='button'
                    className='btn btn-lg btn-light'
                    data-kt-stepper-action='next'
                    onClick={() => {
                        setShow(false)
                        setAssetId(undefined)
                    }}
                  >
                    Close <KTIcon iconName='arrow-right' className='fs-3 ms-1 me-0' />
            </button>
          </Modal.Footer>
        </Modal>
      );
  }

  export {TicketAssetLogForm}