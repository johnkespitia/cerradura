import { Toast } from 'react-bootstrap'

const ToastAlerts = (props) => {

  return <Toast className={"toast-custom"} onClose={() => props.setShowToast(false)} show={props.show} delay={3000} autohide >
    <Toast.Header>
      {props.title}
  </Toast.Header>
  <Toast.Body>{props.message}</Toast.Body></Toast>
}
export default ToastAlerts