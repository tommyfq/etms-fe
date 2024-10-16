
import {Modal} from 'react-bootstrap'
import {KTIcon } from '../../_metronic/helpers'

type Props = {
    show: boolean
    resp: {is_ok:boolean, message:string},
    handleClose: () => void
}

const ModalResultForm = ({show, resp, handleClose}: Props) => {

      return (
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {resp.message}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{resp.message}</h4>
          </Modal.Body>
          <Modal.Footer>
          <button
                    type='button'
                    className='btn btn-lg btn-primary'
                    data-kt-stepper-action='next'
                    onClick={handleClose}
                  >
                    Close <KTIcon iconName='arrow-right' className='fs-3 ms-1 me-0' />
            </button>
          </Modal.Footer>
        </Modal>
      );
  }

  export {ModalResultForm}