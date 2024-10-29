import {FC} from 'react'

type Props = {
  data?: string
}

const StatusColumnCell: FC<Props> = ({data}) => {
    
    let statusClass = '';
    let statusLabel = '';

    switch (data) {
        case 'Approved':
          statusClass = 'badge badge-light-purple fw-bolder'; // Purple for approved
          statusLabel = 'Approved';
          break;
        case 'In Progress':
          statusClass = 'badge badge-light-warning fw-bolder'; // Yellow for in progress
          statusLabel = 'In Progress';
          break;
        case 'Complete':
          statusClass = 'badge badge-light-success fw-bolder'; // Green for complete
          statusLabel = 'Complete';
          break;
        case 'Rejected':
          statusClass = 'badge badge-light-danger fw-bolder'; // Red for rejected
          statusLabel = 'Rejected';
          break;
        case 'Open':
          statusClass = 'badge badge-light-primary fw-bolder'; // Blue for open
          statusLabel = 'Open';
          break;
        default:
          statusClass = 'badge badge-light-secondary fw-bolder'; // Default case, can be adjusted
          statusLabel = 'Unknown';
      }

    return <div className={statusClass}>{statusLabel}</div>;
}

export {StatusColumnCell}
