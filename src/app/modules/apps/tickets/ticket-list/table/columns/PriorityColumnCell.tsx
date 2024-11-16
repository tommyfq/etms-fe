import {FC} from 'react'

type Props = {
  data?: string
}

const PriorityColumnCell: FC<Props> = ({data}) => {
    
    let statusClass = '';
    let statusLabel = '';

    if (data === 'High') {
        statusClass = 'badge badge-light-danger fw-bolder'; // High priority (red)
        statusLabel = 'High';
    } else if (data === 'Medium') {
        statusClass = 'badge badge-light-warning fw-bolder'; // Medium priority (yellow)
        statusLabel = 'Medium';
    } else {
        statusClass = 'badge badge-light-info fw-bolder'; // Low priority (blue)
        statusLabel = 'Low';
    } 

    return <div className={statusClass}>{statusLabel}</div>;
}

export {PriorityColumnCell}
