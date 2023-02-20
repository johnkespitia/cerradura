import { Button } from 'react-bootstrap'
import { BsPlusLg } from 'react-icons/bs'

const CreateButton = (props) => {
  return <Button variant="success" size={"lg"} className={"new-button"} onClick={props.clickEvent}><BsPlusLg /></Button>
}

export default CreateButton