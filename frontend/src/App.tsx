import React, { useState } from 'react'
import StationViewer from './Components/StationViewer'

export enum Mode {
  stopArea,
  station
}

export interface StopArea {
  name: string
  length: number
  switchCount: number
  nodes: number[]
}

export type StopAreaMap = Map<number, StopArea>

export interface Station {
  name: string
  stopAreas: number[]
}

export type StationMap = Map<number, Station>

function App (): JSX.Element {
  const [mode, setMode] = useState<Mode>(Mode.stopArea)
  const [stopAreas, setStopAreas] = useState<StopAreaMap>(new Map<number, StopArea>())
  const [stations, setStations] = useState<StationMap>(new Map<number, Station>())

  return (
    <div>
      <div className='grid grid-cols-4 gap-4 h-screen'>
        <div className=''>
          <StationViewer mode={mode} setMode={setMode} stations={stations} setStations={setStations}
                         stopAreas={stopAreas} setStopAreas={setStopAreas}/>
        </div>
        <div className='col-span-2'>
          Leaflet
        </div>
        <div className=''>
          Details
        </div>
      </div>
    </div>
  )
}

export default App
