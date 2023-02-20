import { Button, Container, Spinner, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const List =(props) =>{
  const guardState = useSelector((state) => state.guard)

  const handleEdit = (evt) => {
    const indexGuard = evt.target.dataset.index;
    props.handleEdit(guardState.guard[indexGuard])
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
      <th>Nombre Aplicación</th>
      <th>Acciones</th>
    </tr>
    </thead>
    <tbody>
    {guardState !== undefined && guardState.guard.map((g, idx)=>(<tr key={idx}>
      <td>{g.id}</td>
      <td>{g.name}</td>
      <td><Button variant={"warning"} data-index={idx} className={"text-light"} onClick={handleEdit}>Editar</Button></td>
    </tr>))}
    </tbody>
  </Table>
}

export default List