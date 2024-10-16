
import {FC} from 'react'
import {Company} from '../../core/_models'

type Props = {
  company: Company
}

const CompanyInfoCell: FC<Props> = ({company}) => (
  <div className='d-flex align-items-center'>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {company.company_name}
      </a>
    </div>
  </div>
)

export {CompanyInfoCell}
