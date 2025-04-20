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
            code: d.Driver.code || d.Driver.driverId,
            name: `${d.Driver.givenName} ${d.Driver.familyName}`,
        })) || []
    );
}