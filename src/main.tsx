import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'

const TestComponent = () => (
  <div style={{ padding: '20px' }}>
    <h1>Test Page</h1>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestComponent />
  </React.StrictMode>,
)