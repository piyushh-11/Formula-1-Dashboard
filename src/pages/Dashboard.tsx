import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { fetchSeasons, fetchRaces, fetchDrivers } from '../utils/api'
import DriverCard from '../components/DriverCard'
import LapChart from '../components/LapChart'
import RaceSelector from '../components/RaceSelector'
import RaceSummary from '../components/RaceSummary'
import Statistics from '../components/Statistics'
import TrackInfo from '../components/TrackInfo'

const Dashboard = () => {
  const [seasons, setSeasons] = useState<string[]>([])
  const [season, setSeason] = useState<string>('')
  const [races, setRaces] = useState<{ round: string, name: string }[]>([])
  const [race, setRace] = useState<string>('')
  const [drivers, setDrivers] = useState<{ code: string, name: string, number?: string, nationality?: string }[]>([])
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
          <RaceSelector
            seasons={seasons}
            season={season}
            setSeason={setSeason}
            races={races}
            race={race}
            setRace={setRace}
            drivers={drivers}
            driver={driver}
            setDriver={setDriver}
          />

          {/* Main Content: 2 columns */}
          <div className="grid grid-cols-3 gap-4 px-6 pb-6 flex-1">
            <DriverCard driver={driver} drivers={drivers} />
            <LapChart />
          </div>

          {/* Bottom Content: 3 columns */}
          <div className="grid grid-cols-3 gap-4 px-6 pb-6 flex-1">
            <RaceSummary />
            <Statistics />
            <TrackInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard