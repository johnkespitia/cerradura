import { useSelector } from 'react-redux'
import { Link, redirect, Route, Routes } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import LoginPage from './pages/Login'
import { logout } from './store/userSlice'
import { useDispatch } from 'react-redux'
import Guards from './pages/Guards'
import Roles from './pages/Roles'
import Accounts from './pages/Account'
import Permissions from './pages/Permissions'

let routes
routes = [
  {
    'title': 'Home',
    'path': '/',
    'page': <h1>Home</h1>,
    'permissions': [],
    'roles': [ "root" ]
  },
  {
    'title': 'Login',
    'path': '/login',
    'page': <LoginPage />,
    'permissions': [],
    'roles': []
  },
  {
    'title': 'Applications',
    'path': '/apps',
    'page': <Guards />,
    'permissions': [''],
    'roles': ['root'],
  },
  {
    'title': 'Roles',
    'path': '/roles',
    'page': <Roles />,
    'permissions': [''],
    'roles': ['root'],
  },
  {
    'title': 'Usuarios',
    'path': '/users',
    'page': <Accounts />,
    'permissions': [''],
    'roles': ['root'],
  },
  {
    'title': 'Permisos',
    'path': '/permissions',
    'page': <Permissions />,
    'permissions': [''],
    'roles': ['root'],
  },
]

const GetRoutes = () =>{
  const userState = useSelector((state) => state.user)
  if(userState.user != null && userState.user.data !== undefined ){
    let permissionRoutes = []
    let rolRoutes = []
    if(userState.user !== null && userState.user.data.permissions !== undefined && userState.user.data.permissions.length > 0){
      const permissionFilter = (permission)=>(userState.user.data.permissions.includes(permission))
      permissionRoutes = routes.map((r) =>  r.permissions.some(permissionFilter)?r:null)
    }else if(userState.user !== null && userState.user.data.roles !== undefined && userState.user.data.roles.length > 0){
      const rolFilter = (rol)=> (userState.user.data.roles.find((r)=> r.name === rol))
      rolRoutes = routes.map((r) => r.roles.some(rolFilter)?r:null)
    }
    return   <Routes>
      {rolRoutes.map((r, idx)=> (r!= null)?<Route key={`path-${idx}`} path={r.path} exact element={r.page} />:null )}
      {permissionRoutes.map((r, idx)=> (r!= null)?<Route key={`path-${idx}`} path={r.path} exact element={r.page} />:null )}
      <Route path='*' exact={true} element={<h1>Not found</h1>} />
    </Routes>
  }else{
      return   <Routes>
        {routes.map((r,idx) => {
          if(r.permissions.length === 0 && r.roles.length === 0){
            return <Route key={`path-${idx}`} path={r.path} exact element={r.page} />
          }
          return null
        })
        }
        <Route path='*' exact={true} element=<LoginPage /> />
      </Routes>
    }
  }

const GetMenu = () =>{
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  if(userState.user != null && userState.user.data !== undefined ){
    let permissionRoutes = []
    let rolRoutes = []
    if(userState.user !== null && userState.user.data.permissions !== undefined && userState.user.data.permissions.length > 0){
      const permissionFilter = (permission)=>(userState.user.data.permissions.includes(permission))
      permissionRoutes = routes.map((r) =>  r.permissions.some(permissionFilter)?r:null)
    }else if(userState.user !== null && userState.user.data.roles !== undefined && userState.user.data.roles.length > 0){
      const rolFilter = (rol)=> (userState.user.data.roles.find((r)=> r.name === rol))
      rolRoutes = routes.map((r) => r.roles.some(rolFilter)?r:null)
    }
    return   <>
      {rolRoutes.map((r, idx)=> (r!= null)?<Nav.Link as={Link} key={`path-${idx}`} to={r.path} >{r.title}</Nav.Link>:null )}
      {permissionRoutes.map((r, idx)=> (r!= null)?<Nav.Link as={Link} key={`path-${idx}`} to={r.path} >{r.title}</Nav.Link>:null )}
      <Nav.Link onClick={() => {
        dispatch(logout())
        return redirect("/login");
      }}>Cerrar Sesión</Nav.Link>
    </>
  } else{
    return   <>
      {routes.map((r,idx) => {
        if(r.permissions.length === 0 &&  r.roles.length === 0){
          return <Nav.Link as={Link} key={`path-${idx}`} to={r.path} >{r.title}</Nav.Link>
        }
        return null
      })
      }
    </>
  }
}

export { GetRoutes, GetMenu }