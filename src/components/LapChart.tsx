import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

type LapChartProps = {
  lapTimes: { lap: number; times: { position: string; time: string }[] }[]
}

const chartConfig = {
  lap: { label: "Lap" },
  time: { label: "Lap Time (s)", color: "hsl(var(--chart-1))" }
} satisfies ChartConfig

// Converts a lap time string to seconds as a number
function timeStringToSeconds(time: string): number {
  const parts = time.split(":")
  if (parts.length === 2) {
    const [min, sec] = parts
    return parseInt(min) * 60 + parseFloat(sec)
  }
  return parseFloat(parts[0])
}

// LapChart component receives lapTimes as a prop
const LapChart: React.FC<LapChartProps> = ({ lapTimes }) => {
  // Memoize chart data to avoid unnecessary recalculations
  const chartData = useMemo(() => {
    // Map each lap to an object with lap number, lap time in seconds, and original time string
    return lapTimes.map(lap => ({
      lap: lap.lap,
      time: lap.times[0]?.time ? timeStringToSeconds(lap.times[0].time) : null, // Convert first driver's time to seconds
      timeStr: lap.times[0]?.time || "", // Store original time string
    })).filter(d => d.time !== null) // Filter out laps with missing time
  }, [lapTimes])

  return (
    <Card className="bg-white rounded-lg shadow-md shadow-gray-200 flex flex-col col-span-2">
      <CardHeader className="flex flex-col items-center mt-[-10px]">
        <CardTitle>
          <h2 className="text-xl font-bold text-center">Lap Times (s)</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="sm:px-4">
        {lapTimes === null ? (
          <div className="text-center text-muted-foreground py-12">Failed to load lap times.</div>
        ) : chartData.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">No lap times available.</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[320px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ left: -12, right: 12}}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="lap"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={2}
                tickFormatter={(value: number) => value % 5 === 0 ? value.toString() : ""}
              />
              <YAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, 'auto']}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[120px]"
                    nameKey="Lap"
                    labelFormatter={value => `${value}`}
                  />
                }
              />
              <Bar dataKey="time" fill="#ef4444" radius={[2, 2, 2, 2]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default LapChart
