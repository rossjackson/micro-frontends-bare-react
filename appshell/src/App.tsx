import React, { lazy, Suspense } from 'react'
import './App.css'

const LeftPanel = lazy(() => import('leftPanel/App'))

function App() {
    return (
        <div className="App">
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'yellow',
                }}
            >
                <div style={{ display: 'flex', flex: 1 }}>
                    <Suspense fallback={<div>Loading</div>}>
                        <LeftPanel />
                    </Suspense>
                </div>
                <div style={{ display: 'flex', flex: 1 }}></div>
            </div>
        </div>
    )
}

export default App
