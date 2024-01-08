import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyles } from './styles/globalStyles'
import { Kanban } from './components/Kanban'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <div style={{ padding: '32px' }}>
      <Kanban />
    </div>
  </React.StrictMode>,
)
