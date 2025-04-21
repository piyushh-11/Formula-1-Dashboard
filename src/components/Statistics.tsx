import React, { useMemo } from 'react'

type LapChartProps = {
  lapTimes: { lap: number; times: { position: string; time: string }[] }[]
}

function timeStringToSeconds(time: string): number {
  const parts = time.split(":")
  if (parts.length === 2) {
    const [min, sec] = parts
    return parseInt(min) * 60 + parseFloat(sec)
  }
  return parseFloat(parts[0])
}

function computeStats(times: number[]) {
  if (times.length === 0) return null
  const sorted = [...times].sort((a, b) => a - b)
  const sum = times.reduce((a, b) => a + b, 0)
  const avg = sum / times.length
  const median =
    times.length % 2 === 0
      ? (sorted[times.length / 2 - 1] + sorted[times.length / 2]) / 2
      : sorted[Math.floor(times.length / 2)]
  const std =
    Math.sqrt(times.reduce((acc, t) => acc + Math.pow(t - avg, 2), 0) / times.length)
  return {
    fastest: sorted[0],
    slowest: sorted[sorted.length - 1],
    average: avg,
    median,
    std,
  }
}

const Statistics: React.FC<LapChartProps> = ({ lapTimes }) => {
  const stats = useMemo(() => {
    const times = lapTimes
      .map(lap => lap.times[0]?.time)
      .filter(Boolean)
      .map(timeStringToSeconds)
    return computeStats(times)
  }, [lapTimes])

  return (
    <div className="bg-white rounded-lg shadow-md shadow-gray-200 p-2 flex flex-col w-full h-full">
      <h2 className="text-xl font-bold text-center mb-3">Race Statistics</h2>
      {lapTimes === null ? (
        <div className="text-center text-muted-foreground py-8">Failed to load lap times.</div>
      ) : stats ? (
        <table className="mx-2 mb-2 text-sm rounded shadow-sm overflow-hidden">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-6 py-2 text-left border-r">Statistic</th>
              <th className="px-6 py-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold px-6 py-3 border-b border-r">Fastest Lap Time</td>
              <td className="px-6 py-3 border-b">{stats.fastest.toFixed(3)} s</td>
            </tr>
            <tr>
              <td className="font-semibold px-6 py-3 border-b border-r">Slowest Lap Time</td>
              <td className="px-6 py-3 border-b">{stats.slowest.toFixed(3)} s</td>
            </tr>
            <tr>
              <td className="font-semibold px-6 py-3 border-b border-r">Average Lap Time</td>
              <td className="px-6 py-3 border-b">{stats.average.toFixed(3)} s</td>
            </tr>
            <tr>
              <td className="font-semibold px-6 py-3 border-b border-r">Median Lap Time</td>
              <td className="px-6 py-3 border-b">{stats.median.toFixed(3)} s</td>
            </tr>
            <tr>
              <td className="font-semibold px-6 py-3 border-r">Standard Deviation</td>
              <td className="px-6 py-3">{stats.std.toFixed(3)} s</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="text-center text-muted-foreground py-8">No lap times available.</div>
      )}
    </div>
  )
}

export default Statistics
