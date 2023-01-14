import { mount } from 'angularRightPanel/mount'
import React, { lazy, Suspense, useEffect } from 'react'
import './App.css'

const LeftPanel = lazy(() => import('leftPanel/App'))

const App = () => {
    useEffect(() => {
        mount()
    }, [])

    return (
        <div className="App">
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                }}
            >
                <div style={{ display: 'flex', flex: 1 }}>
                    <Suspense fallback={<div>Loading</div>}>
                        <LeftPanel />
                    </Suspense>
                </div>
                <div style={{ display: 'flex', flex: 1 }}>
                    <div style={{ position: 'absolute' }}>
                        {/* @ts-ignore */}
                        <app-root></app-root>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
