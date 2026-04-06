import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext'
import { ToastProvider } from './context/ToastContext'
import { AppRoutes } from './router'


function App() {
  return (
    <AppContextProvider>
      <ToastProvider>
        <BrowserRouter basename={__BASE_PATH__}>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </AppContextProvider>
  )
}

export default App
