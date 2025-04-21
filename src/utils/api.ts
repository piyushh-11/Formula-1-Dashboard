// Fetch all available seasons (limit to recent 20)
export async function fetchSeasons(): Promise<string[]> {
    try {
        const res = await fetch('https://ergast.com/api/f1/seasons.json?limit=1000');
        const data = await res.json();
        return data.MRData.SeasonTable.Seasons
            .map((s: any) => s.season)
            .slice(-5)
            .reverse();
    } catch (e) {
        console.error("Error fetching seasons:", e);
        return [];
    }
}

// Fetch all races for a given season
export async function fetchRaces(season: string): Promise<{ round: string, name: string }[]> {
    try {
        const res = await fetch(`https://ergast.com/api/f1/${season}.json`);
        const data = await res.json();
        return data.MRData.RaceTable.Races.map((r: any) => ({
            round: r.round,
            name: r.raceName,
        }));
    } catch (e) {
        console.error(`Error fetching races for season ${season}:`, e);
        return [];
    }
}

// Fetch all drivers for a given season and race round
export async function fetchDrivers(season: string, round: string): Promise<{ code: string, name: string }[]> {
    try {
        const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`);
        const data = await res.json();
        return (
            data.MRData.RaceTable.Races[0]?.Results.map((d: any) => ({
                code: d.Driver.driverId,
                name: `${d.Driver.givenName} ${d.Driver.familyName}`,
                number: d.Driver.permanentNumber,
                nationality: d.Driver.nationality
            })) || []
        );
    } catch (e) {
        console.error(`Error fetching drivers for season ${season}, round ${round}:`, e);
        return [];
    }
}

// Fetch track info (name, city, country) for a given season and round
export async function fetchTrackInfo(season: string, round: string): Promise<{ circuitId: string, name: string, city: string, country: string } | null> {
    try {
        const res = await fetch(`https://ergast.com/api/f1/${season}/${round}.json`);
        const data = await res.json();
        const race = data.MRData.RaceTable.Races[0];
        if (!race || !race.Circuit) return null;
        return {
            circuitId: race.Circuit.circuitId,
            name: race.Circuit.circuitName,
            city: race.Circuit.Location.locality,
            country: race.Circuit.Location.country
        };
    } catch (e) {
        console.error(`Error fetching track info for season ${season}, round ${round}:`, e);
        return null;
    }
}

// Fetch all lap times for a given season, round, and driver
export async function fetchLapTimes(season: string, round: string, driverId: string): Promise<{ lap: number; times: { position: string; time: string }[] }[]> {
    try {
        const res = await fetch(
            `https://ergast.com/api/f1/${season}/${round}/drivers/${driverId}/laps.json?limit=100`
        );
        const data = await res.json();
        return (
            data.MRData.RaceTable.Races[0]?.Laps.map((lap: any) => ({
                lap: parseInt(lap.number, 10),
                times: lap.Timings.map((t: any) => ({
                    position: t.position,
                    time: t.time
                }))
            })) || []
        );
    } catch (e) {
        console.error(`Error fetching lap times for season ${season}, round ${round}, driver ${driverId}:`, e);
        return [];
    }
}
// Fetch final race standings and times for a given season and round
export async function fetchRaceStandings(season: string, round: string): Promise< {position: string; name: string; time: string | null; code?: string }[]> {
    try {
        const res = await fetch(
            `https://ergast.com/api/f1/${season}/${round}/results.json`
        );
        const data = await res.json();
        const results = data.MRData.RaceTable.Races[0]?.Results || [];
        return results.map((r: any) => ({
            position: r.position,
            name: `${r.Driver.givenName} ${r.Driver.familyName}`,
            time: r.Time?.time || null,
            code: r.Driver.driverId,
        }));
    } catch (e) {
        console.error(`Error fetching race standings for season ${season}, round ${round}:`, e);
        return [];
    }
}
