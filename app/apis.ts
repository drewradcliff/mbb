type Schedule = {
  id: number;
  date: string;
  name: string;
  logo: string;
  winner: boolean;
};

export async function getSchedule(
  id: string
): Promise<{ id: string; schedule: Schedule[] }> {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${id}/schedule`
  );
  const data = await res.json();

  const schedule = data.events.map((event: any) => {
    const competitors = event.competitions[0].competitors;
    const teamA = competitors.find((team: any) => team.id === id);
    const teamB = competitors.find((team: any) => team.id !== id);

    const date = new Date(event.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return {
      id: event.id,
      date,
      name: teamB.team.displayName,
      logo: teamB.team.logos?.[0]?.href,
      winner: teamA.winner,
    };
  });

  return {
    id,
    schedule,
  };
}
