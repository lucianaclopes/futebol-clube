const match1 = {
  id: 1, 
  homeTeamId: 16, 
  homeTeamGoals: 1, 
  awayTeamId: 8, 
  awayTeamGoals: 1, 
  inProgress: false 
}

const match2 = {
  id: 2, 
  homeTeamId: 16, 
  homeTeamGoals: 2, 
  awayTeamId: 8, 
  awayTeamGoals: 1, 
  inProgress: false 
}

const match3 = {
  id: 3, 
  homeTeamId: 16, 
  homeTeamGoals: 1, 
  awayTeamId: 8, 
  awayTeamGoals: 2, 
  inProgress: true

}

const newMatch = {
  id: 4,
  homeTeamId: 16, 
  homeTeamGoals: 1, 
  awayTeamId: 8, 
  awayTeamGoals: 2, 
  inProgress: true

}

const newBodyMatch = {
  homeTeamId: 16, 
  homeTeamGoals: 1, 
  awayTeamId: 8, 
  awayTeamGoals: 2, 
}

const matchwithSameTeams = {
  id: 5,
  homeTeamId: 8, 
  homeTeamGoals: 1, 
  awayTeamId: 8, 
  awayTeamGoals: 2, 
  inProgress: true

}

const matchWithGhostTeam = {
  id: 6,
  homeTeamId: 16, 
  homeTeamGoals: 1, 
  awayTeamId: 100, 
  awayTeamGoals: 2, 
  inProgress: true

}

const allMatches = [match1, match2, match3];
const matchesInProgress = [match3];
const matchesDone = [match1, match2];

export { allMatches, match1, match2, match3, matchesDone, matchesInProgress,
  newMatch, matchwithSameTeams, matchWithGhostTeam, newBodyMatch};