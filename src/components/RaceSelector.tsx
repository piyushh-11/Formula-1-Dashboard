import React from 'react'

type Race = { round: string, name: string }
type Driver = { code: string, name: string, number?: string, nationality?: string }

interface RaceSelectorProps {
  seasons: string[]
  season: string
  setSeason: (season: string) => void
  races: Race[]
  race: string
  setRace: (race: string) => void
  drivers: Driver[]
  driver: string
  setDriver: (driver: string) => void
}

const RaceSelector: React.FC<RaceSelectorProps> = ({
  seasons, season, setSeason,
  races, race, setRace,
  drivers, driver, setDriver
}) => (
  <div className="grid grid-cols-3 gap-4 p-6">
    <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-4 flex flex-row items-center">
      <h1 className="mr-4">Season</h1>
      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={season}
        onChange={e => setSeason(e.target.value)}
      >
        <option value="">Select Season</option>
        {seasons.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
    <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-4 flex flex-row items-center">
      <h1 className="mr-4">Race</h1>
      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={race}
        onChange={e => setRace(e.target.value)}
        disabled={!season}
      >
        <option value="">Select Race</option>
        {races.map(r => (
          <option key={r.round} value={r.round}>{r.name}</option>
        ))}
      </select>
    </div>
    <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-4 flex flex-row items-center">
      <h1 className="mr-4">Driver</h1>
      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={driver}
        onChange={e => setDriver(e.target.value)}
        disabled={!race}
      >
        <option value="">Select Driver</option>
        {drivers.map(d => (
          <option key={d.code} value={d.code}>{d.name}</option>
        ))}
      </select>
    </div>
  </div>
)

export default RaceSelector
