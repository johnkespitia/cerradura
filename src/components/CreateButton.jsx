import { Button } from 'react-bootstrap'
import { BsPlusLg } from 'react-icons/bs'

const CreateButton = (props) => {
  return <Button variant="success" size={"lg"} className={props.position==="absolute"?"new-button-absolute":"new-button-fixed"} onClick={props.clickEvent}><BsPlusLg /></Button>
}

export default CreateButton