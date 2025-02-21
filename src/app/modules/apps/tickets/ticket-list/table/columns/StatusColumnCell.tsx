import {FC} from 'react'

type Props = {
  data?: string
}

const StatusColumnCell: FC<Props> = ({data}) => {
    
    let statusClass = '';
    let statusLabel = '';

    switch (data) {
        case 'cancel':
          statusClass = 'badge badge-light-danger fw-bolder'; // Purple for approved
          statusLabel = 'Cancel';
          break;
        case 'in progress':
          statusClass = 'badge badge-light-warning fw-bolder'; // Yellow for in progress
          statusLabel = 'In Progress';
          break;
        case 'closed':
          statusClass = 'badge badge-light-success fw-bolder'; // Green for complete
          statusLabel = 'Closed';
          break;
        case 'rejected':
          statusClass = 'badge badge-light-danger fw-bolder'; // Red for rejected
          statusLabel = 'Rejected';
          break;
        case 'open':
          statusClass = 'badge badge-light-primary fw-bolder'; // Blue for open
          statusLabel = 'Open';
          break;
        case 'on hold':
          statusClass = 'badge badge-light-danger fw-bolder'; // Red for on hold
          statusLabel = 'On Hold';
          break;
        default:
          statusClass = 'badge badge-light-secondary fw-bolder'; // Default case, can be adjusted
          statusLabel = 'Unknown';
      }

    return <div className={statusClass}>{statusLabel}</div>;
}

export {StatusColumnCell}
