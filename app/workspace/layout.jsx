import React from 'react'
import WorkspaceProvider from './provider'

function WorkspaceLayout({ children }) {
  return (
    <div>
      <h1>WorkspaceLayout</h1>
      <WorkspaceProvider>{children}</WorkspaceProvider>
    </div>
  )
}

export default WorkspaceLayout