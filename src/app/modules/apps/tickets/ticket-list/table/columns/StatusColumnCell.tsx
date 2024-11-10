import {FC} from 'react'

type Props = {
  data?: string
}

const StatusColumnCell: FC<Props> = ({data}) => {
    
    let statusClass = '';
    let statusLabel = '';

    switch (data) {
        case 'Cancel':
          statusClass = 'badge badge-light-danger fw-bolder'; // Purple for approved
          statusLabel = 'Cancel';
          break;
        case 'In Progress':
          statusClass = 'badge badge-light-warning fw-bolder'; // Yellow for in progress
          statusLabel = 'In Progress';
          break;
        case 'Closed':
          statusClass = 'badge badge-light-success fw-bolder'; // Green for complete
          statusLabel = 'Closed';
          break;
        case 'Rejected':
          statusClass = 'badge badge-light-danger fw-bolder'; // Red for rejected
          statusLabel = 'Rejected';
          break;
        case 'Open':
          statusClass = 'badge badge-light-primary fw-bolder'; // Blue for open
          statusLabel = 'Open';
          break;
        case 'On Hold':
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
