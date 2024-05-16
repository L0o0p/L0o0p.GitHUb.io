
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import { NavBar } from './NavBar'
import WraperRoutes from './Router'

function App() {

  return (
    <>
      <div style={{
        height: '100%',
        width: '100%',
        padding: '0px',
        backgroundColor: '#fdfbfb',
      }}>
        <BrowserRouter>
          <NavBar />
          <WraperRoutes />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App