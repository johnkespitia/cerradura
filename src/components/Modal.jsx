import { Button, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const ModalOption = (props) =>{
  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(props.setClose());
  const handleSave = () => {
    props.eventSave()
    props.setClose()
  }
  useEffect(()=>{
    setShow(props.show)
  },[props])
  return <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
    {props.footer && <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cerrar
      </Button>
      <Button variant="success" onClick={handleSave}>
        Almacenar
      </Button>
    </Modal.Footer>}
  </Modal>
}

export default ModalOption