import {FC} from 'react'

type Props = {
  on_hold?: boolean
}

const OnHoldColumnCell: FC<Props> = ({on_hold}) => (
  <> {on_hold && <div className='badge badge-light-danger fw-bolder'>On Hold</div>}</>
)

export {OnHoldColumnCell}
