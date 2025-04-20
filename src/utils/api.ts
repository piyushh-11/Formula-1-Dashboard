// Fetch all available seasons (limit to recent 20)
export async function fetchSeasons(): Promise<string[]> {
    const res = await fetch('https://ergast.com/api/f1/seasons.json?limit=1000');
    const data = await res.json();
    return data.MRData.SeasonTable.Seasons
        .map((s: any) => s.season)
        .slice(-5)
        .reverse();
}

// Fetch all races for a given season
export async function fetchRaces(season: string): Promise<{ round: string, name: string }[]> {
    const res = await fetch(`https://ergast.com/api/f1/${season}.json`);
    const data = await res.json();
    return data.MRData.RaceTable.Races.map((r: any) => ({
        round: r.round,
        name: r.raceName,
    }));
}

// Fetch all drivers for a given season and race round
export async function fetchDrivers(season: string, round: string): Promise<{ code: string, name: string }[]> {
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
}

// Fetch track info (name, city, country) for a given season and round
export async function fetchTrackInfo(season: string, round: string): Promise<{ name: string, city: string, country: string } | null> {
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}.json`);
    const data = await res.json();
    const race = data.MRData.RaceTable.Races[0];
    if (!race || !race.Circuit) return null;
    return {
        name: race.Circuit.circuitName,
        city: race.Circuit.Location.locality,
        country: race.Circuit.Location.country
    };
}

// Fetch all lap times for a given season, round, and driver
export async function fetchLapTimes(season: string, round: string, driverId: string): Promise<{ lap: number; times: { position: string; time: string }[] }[]> {
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
}
// Fetch final race standings and times for a given season and round
export async function fetchRaceStandings(season: string, round: string): Promise< {position: string; name: string; time: string | null }[]> {
    const res = await fetch(
        `https://ergast.com/api/f1/${season}/${round}/results.json`
    );
    const data = await res.json();
    const results = data.MRData.RaceTable.Races[0]?.Results || [];
    return results.map((r: any) => ({
        position: r.position,
        name: `${r.Driver.givenName} ${r.Driver.familyName}`,
        time: r.Time?.time || null,
    }));
}
