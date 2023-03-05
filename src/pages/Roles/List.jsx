import { Button, Container, Spinner, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const List =(props) =>{
  const rolState = useSelector((state) => state.roles)

  const handleEdit = (evt) => {
    const indexGuard = evt.target.dataset.index;
    props.handleEdit(rolState.roles[indexGuard])
  }
  const handlePermissions = (evt) => {
    const indexGuard = evt.target.dataset.index;
    props.handlePermission(rolState.roles[indexGuard])
  }

  if(props.loading){
    return <Container className={"text-center justify-content-center"}>
      <Spinner className={"text-center"} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  }
  return <Table striped bordered hover responsive>
    <thead>
    <tr>
      <th>ID</th>
      <th>Nombre Rol</th>
      <th>Aplicación</th>
      <th>Acciones</th>
    </tr>
    </thead>
    <tbody>
    {rolState !== undefined && rolState.roles.map((g, idx)=>(<tr key={idx}>
      <td>{g.id}</td>
      <td>{g.name}</td>
      <td>{g.guard_name}</td>
      <td>
        <Button variant={"warning"} data-index={idx} className={"text-light m-1"} onClick={handleEdit}>Editar</Button>
        <Button variant={"info"} data-index={idx} className={"text-light m-1"} onClick={handlePermissions}>Permisos</Button>
      </td>
    </tr>))}
    </tbody>
  </Table>
}

export default List