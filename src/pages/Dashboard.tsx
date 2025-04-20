import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { fetchSeasons, fetchRaces, fetchDrivers } from '../utils/api'

const Dashboard = () => {
  const [seasons, setSeasons] = useState<string[]>([])
  const [season, setSeason] = useState<string>('')
  const [races, setRaces] = useState<{ round: string, name: string }[]>([])
  const [race, setRace] = useState<string>('')
  const [drivers, setDrivers] = useState<{ code: string, name: string }[]>([])
  const [driver, setDriver] = useState<string>('')

  useEffect(() => {
    fetchSeasons().then(setSeasons)
  }, [])

  useEffect(() => {
    if (!season) {
      setRaces([])
      setRace('')
      setDrivers([])
      setDriver('')
      return
    }
    fetchRaces(season).then(setRaces)
    setRace('')
    setDrivers([])
    setDriver('')
  }, [season])

  useEffect(() => {
    if (!season || !race) {
      setDrivers([])
      setDriver('')
      return
    }
    fetchDrivers(season, race).then(setDrivers)
    setDriver('')
  }, [season, race])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <div className="h-screen w-full bg-gray-100 flex flex-col">
          {/* Top Row: Dropdowns */}
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

          {/* Main Content: 2 columns */}
          <div className="grid grid-cols-3 gap-4 px-6 pb-6">
            {/* Driver Info Card */}
            <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-6 flex flex-col">

            </div>
            {/* Lap Times Card */}
            <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-6 flex flex-col col-span-2">

            </div>
          </div>

          {/* Bottom Content: 3 columns */}
          <div className="grid grid-cols-3 gap-4 px-6 pb-6">
            {/* Race Summary Card */}
            <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-6 flex flex-col">

            </div>
            {/* Statistics Card */}
            <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-6 flex flex-col">

            </div>
            {/* Track Info Card */}
            <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-6 flex flex-col">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard