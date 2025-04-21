import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { fetchSeasons, fetchRaces, fetchDrivers, fetchLapTimes } from '../utils/api'
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
  const [lapTimes, setLapTimes] = useState<{ lap: number; times: { position: string; time: string }[] }[]>([])

  // Fetch available seasons on initial mount
  useEffect(() => {
    fetchSeasons().then(setSeasons)
  }, [])

  // When season changes, fetch races for that season and reset dependent state
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

  // When season or race changes, fetch drivers for that race and reset driver state
  useEffect(() => {
    if (!season || !race) {
      setDrivers([])
      setDriver('')
      return
    }
    fetchDrivers(season, race).then(setDrivers)
    setDriver('')
  }, [season, race])

  // When season, race, or driver changes, fetch lap times for the selected driver
  useEffect(() => {
    if (!season || !race || !driver) {
      setLapTimes([])
      return
    }
    fetchLapTimes(season, race, driver).then(setLapTimes)
  }, [season, race, driver])

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
            <LapChart lapTimes={lapTimes} />
          </div>

          {/* Bottom Content: 3 columns */}
          <div className="grid grid-cols-3 gap-4 px-6 pb-6 flex-1">
            <RaceSummary season={season} race={race} currentDriverId={driver} />
            <Statistics lapTimes={lapTimes} />
            <TrackInfo season={season} round={race} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard