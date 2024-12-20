type Schedule = {
  id: string;
  name: string;
  logo: string;
  record: string;
  standing: string;
  schedule: Event[];
};

type Event = {
  id: number;
  date: string;
  time: string;
  name: string;
  logo: string;
  winner: boolean;
  score: string;
  homeAway: "vs" | "@";
};

export async function getSchedule(id: string): Promise<Schedule> {
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

    const time = new Date(event.date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    return {
      id: event.id,
      date,
      time,
      name: teamB.team.shortDisplayName,
      logo: teamB.team.logos?.[0]?.href,
      winner: teamA.winner,
      score: teamA.score
        ? `${teamA.score.displayValue} - ${teamB.score.displayValue}`
        : undefined,
      homeAway: teamA.homeAway === "home" ? "vs" : "@",
    };
  });

  return {
    id,
    name: data.team.displayName,
    logo: data.team.logo,
    record: data.team.recordSummary,
    standing: data.team.standingSummary,
    schedule,
  };
}

type Standings = {
  name: string;
  standings: Standing[];
};

type Standing = {
  name: string;
  teamId: string;
  logo: string;
  winLoss: string;
};

export async function getStandings(): Promise<Standings> {
  const res = await fetch(
    "https://site.web.api.espn.com/apis/v2/sports/basketball/mens-college-basketball/standings?region=us&lang=en&contentorigin=espn&group=4&season=2025"
  );
  const data = await res.json();

  const teamsData = data.standings.entries.map((entry: any) => {
    const { team, stats } = entry;

    return {
      name: team.displayName,
      teamId: team.id,
      logo: team.logos[0]?.href,
      winLoss: stats.find((stat: any) => stat.displayName === "CONF")
        .displayValue,
    };
  });

  return {
    name: data.shortName,
    standings: teamsData.reverse(),
  };
}

type Athlete = {
  id: string;
  name: string;
  headshot: string;
  number: string;
  birthPlace: string;
  experience: string;
};

export async function getRoster(id: string): Promise<Athlete[]> {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${id}/roster`
  );
  const data = await res.json();

  return data.athletes.map((athlete: any) => ({
    id: athlete.id,
    name: athlete.displayName,
    headshot: athlete.headshot?.href,
    number: athlete.jersey,
    birthPlace: `${athlete.birthPlace.city}, ${athlete.birthPlace.state}`,
    experience: athlete.experience.abbreviation,
  }));
}
