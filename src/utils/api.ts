// Fetch all available seasons (limit to recent 5)
export async function fetchSeasons(): Promise<string[]> {
    try {
        // Fetch all seasons from the Ergast API (limit 1000 for all available)
        const res = await fetch('https://ergast.com/api/f1/seasons.json?limit=1000');
        const data = await res.json();
        // Extract the last 5 seasons and reverse for most recent first
        return data.MRData.SeasonTable.Seasons
            .map((s: any) => s.season)
            .slice(-5)
            .reverse();
    } catch (e) {
        // Log error and return empty array on failure
        console.error("Error fetching seasons:", e);
        return [];
    }
}

// Fetch all races for a given season
export async function fetchRaces(season: string): Promise<{ round: string, name: string }[]> {
    try {
        // Fetch races for the specified season
        const res = await fetch(`https://ergast.com/api/f1/${season}.json`);
        const data = await res.json();
        // Map race data to round and race name
        return data.MRData.RaceTable.Races.map((r: any) => ({
            round: r.round,
            name: r.raceName,
        }));
    } catch (e) {
        // Log error and return empty array on failure
        console.error(`Error fetching races for season ${season}:`, e);
        return [];
    }
}

// Fetch all drivers for a given season and race round
export async function fetchDrivers(season: string, round: string): Promise<{ code: string, name: string }[]> {
    try {
        // Fetch race results for the specified season and round
        const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`);
        const data = await res.json();
        // Map driver data to code, name, number, and nationality
        return (
            data.MRData.RaceTable.Races[0]?.Results.map((d: any) => ({
                code: d.Driver.driverId,
                name: `${d.Driver.givenName} ${d.Driver.familyName}`,
                number: d.Driver.permanentNumber,
                nationality: d.Driver.nationality
            })) || []
        );
    } catch (e) {
        // Log error and return empty array on failure
        console.error(`Error fetching drivers for season ${season}, round ${round}:`, e);
        return [];
    }
}

// Fetch track info (name, city, country) for a given season and round
export async function fetchTrackInfo(season: string, round: string): Promise<{ circuitId: string, name: string, city: string, country: string } | null> {
    try {
        // Fetch race data for the specified season and round
        const res = await fetch(`https://ergast.com/api/f1/${season}/${round}.json`);
        const data = await res.json();
        const race = data.MRData.RaceTable.Races[0];
        // If race or circuit info is missing, return null
        if (!race || !race.Circuit) return null;
        // Return circuit information
        return {
            circuitId: race.Circuit.circuitId,
            name: race.Circuit.circuitName,
            city: race.Circuit.Location.locality,
            country: race.Circuit.Location.country
        };
    } catch (e) {
        // Log error and return null on failure
        console.error(`Error fetching track info for season ${season}, round ${round}:`, e);
        return null;
    }
}

// Fetch all lap times for a given season, round, and driver
export async function fetchLapTimes(season: string, round: string, driverId: string): Promise<{ lap: number; times: { position: string; time: string }[] }[]> {
    try {
        // Fetch lap times for the specified driver in a race
        const res = await fetch(
            `https://ergast.com/api/f1/${season}/${round}/drivers/${driverId}/laps.json?limit=100`
        );
        const data = await res.json();
        // Map lap data to lap number and timing information
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
        // Log error and return empty array on failure
        console.error(`Error fetching lap times for season ${season}, round ${round}, driver ${driverId}:`, e);
        return [];
    }
}

// Fetch final race standings and times for a given season and round
export async function fetchRaceStandings(season: string, round: string): Promise< {position: string; name: string; time: string | null; code?: string }[]> {
    try {
        // Fetch race results for the specified season and round
        const res = await fetch(
            `https://ergast.com/api/f1/${season}/${round}/results.json`
        );
        const data = await res.json();
        const results = data.MRData.RaceTable.Races[0]?.Results || [];
        // Map results to position, driver name, finish time, and driver code
        return results.map((r: any) => ({
            position: r.position,
            name: `${r.Driver.givenName} ${r.Driver.familyName}`,
            time: r.Time?.time || null,
            code: r.Driver.driverId,
        }));
    } catch (e) {
        // Log error and return empty array on failure
        console.error(`Error fetching race standings for season ${season}, round ${round}:`, e);
        return [];
    }
}
