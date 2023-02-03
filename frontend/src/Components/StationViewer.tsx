import React from 'react'
import { Mode, type StationMap, type StopAreaMap } from '../App'

interface StationViewerProps {
  mode: Mode
  setMode: (mode: Mode) => void
  stations: StationMap
  stopAreas: StopAreaMap
  setStations: (stations: StationMap) => void
  setStopAreas: (stopAreas: StopAreaMap) => void
}

function StationViewer (props: StationViewerProps): JSX.Element {
  return (
    <div className='flex flex-col border border-2 rounded border-color-black m-2 text-center'>
      <div className=''>
        <div className='p-2 border-b-2 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer'>
          <div className='transition-all flex flex-row' onClick={() => {
            props.setMode(1 - props.mode)
          }}>
            {props.mode === Mode.stopArea &&
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
              </svg>
            }
            <div className='grow'>
              {props.mode === Mode.stopArea ? 'Haltestellenbereich' : 'Haltestelle'}
            </div>
            {props.mode === Mode.station &&
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            }
          </div>
        </div>
        <div className='flex-none lg:overflow-auto h-screen max-h-96 min-height-96'>
          {props.mode === Mode.stopArea && props.stopAreas.size === 0 &&
            <div className='p-2'>Keine Haltestellenbereiche erstellt</div>}
          {props.mode === Mode.station && props.stations.size === 0 &&
            <div className='p-2'>Keine Haltestellen erstellt</div>}
          {props.mode === Mode.stopArea && props.stopAreas.size > 0 &&
            Array.from(props.stopAreas.values()).map((stopArea, id) => {
              return (
                <div
                  key={id}
                  className='p-2 border-b-2 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer'>
                  {stopArea.name}
                </div>
              )
            })
          }
          {props.mode === Mode.station && props.stations.size > 0 &&
            Array.from(props.stations.values()).map((station, id) => {
              return (
                <div
                  key={id}
                  className='p-2 border-b-2 bg-slate-50 hover:bg-slate-200 transition-all cursor-pointer'>
                  {station.name}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='p-2 border-t-2 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer'>
        {props.mode === Mode.stopArea ? 'Haltestellenbereich' : 'Haltestelle'} hinzufügen
      </div>
    </div>
  )
}

export default StationViewer
