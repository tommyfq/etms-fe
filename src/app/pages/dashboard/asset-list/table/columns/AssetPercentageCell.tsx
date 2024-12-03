
import {FC} from 'react'

type Props = {
  data?: number
}

const AssetPercentageCell: FC<Props> = ({ data = 0 }) => {
    // Determine the progress-bar class based on `data`
    const getProgressBarClass = (value: number): string => {
      if (value < 33.34) return 'bg-primary'; // Below 33%
      if (value < 66.67) return 'bg-warning'; // 33% to below 66%
      return 'bg-danger'; // 66% and above
    };
  
    return (
      <div className="d-flex align-items-center">
        <div className="d-flex flex-column w-100 me-2">
          <div className="d-flex flex-stack mb-2">
            <span className="text-muted me-2 fs-7 fw-semibold">{data}%</span>
          </div>
          <div className="progress h-6px w-100">
            <div
              className={`progress-bar ${getProgressBarClass(data)}`}
              role="progressbar"
              style={{ width: `${data}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

export {AssetPercentageCell}
