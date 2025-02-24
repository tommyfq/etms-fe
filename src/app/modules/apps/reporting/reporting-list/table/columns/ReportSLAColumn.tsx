import {FC} from 'react'

type Props = {
  data?: number
}

const ReportSLAColumnCell: FC<Props> = ({data}) => {
    
    let statusClass = '';

    if(data){
        if(data > 3){
            statusClass = 'badge badge-light-danger fw-bolder'; // Purple for approved
        }else{
            statusClass = 'badge badge-light-success fw-bolder';
        }
    }

    return <div className={statusClass}>{data}</div>;
}

export {ReportSLAColumnCell}
