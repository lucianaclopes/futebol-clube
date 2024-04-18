import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/matches/IMatch';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboard';
import ITeam from '../Interfaces/teams/ITeam';

export default class LeaderboardAll {
  private modelMatch = SequelizeMatch;
  private modelTeam = SequelizeTeam;

  async getMatchesFinished(): Promise<IMatch[]> {
    const matchesFinished = await this.modelMatch.findAll({
      where: { inProgress: false },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matchesFinished;
  }

  static getAllTotalPoints(id: number, allMatches: IMatch[]) {
    let totalPoints = 0;
    for (let i = 0; i < allMatches.length; i += 1) {
      if (allMatches[i].homeTeamId === id) {
        if (allMatches[i].homeTeamGoals > allMatches[i].awayTeamGoals) {
          totalPoints += 3;
        } else if (allMatches[i].homeTeamGoals === allMatches[i].awayTeamGoals) {
          totalPoints += 1;
        }
      } else if (allMatches[i].awayTeamId === id) {
        if (allMatches[i].homeTeamGoals < allMatches[i].awayTeamGoals) {
          totalPoints += 3;
        } else if (allMatches[i].homeTeamGoals === allMatches[i].awayTeamGoals) {
          totalPoints += 1;
        }
      }
    }
    return totalPoints;
  }

  static countMatchesAll(
    id: number,
    allMatches: IMatch[],
    matchPredicate: (match: IMatch) => boolean,
  ) {
    let count = 0;
    for (let i = 0; i < allMatches.length; i += 1) {
      if ((allMatches[i].homeTeamId === id || allMatches[i].awayTeamId === id)
          && matchPredicate(allMatches[i])) {
        count += 1;
      }
    }
    return count;
  }

  static calculateTotalGamesAll(id: number, allMatches: IMatch[]) {
    return this.countMatchesAll(id, allMatches, () => true);
  }

  static calculateTotalVictoriesAll(id: number, allMatches: IMatch[]) {
    return this.countMatchesAll(id, allMatches, (match) => {
      if (match.homeTeamId === id) {
        return match.homeTeamGoals > match.awayTeamGoals;
      }
      return match.awayTeamGoals > match.homeTeamGoals;
    });
  }

  static calculateTotalDrawsAll(id: number, allMatches: IMatch[]) {
    return this.countMatchesAll(
      id,
      allMatches,
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    );
  }

  static calculateTotalLossesAll(id: number, allMatches: IMatch[]) {
    return this.countMatchesAll(id, allMatches, (match) => {
      if (match.homeTeamId === id) {
        return match.homeTeamGoals < match.awayTeamGoals;
      }
      return match.awayTeamGoals < match.homeTeamGoals;
    });
  }

  static calculateGoalsFavorAll(id: number, allMatches: IMatch[]) {
    return allMatches.reduce((total, match) => {
      if (match.homeTeamId === id) {
        return total + match.homeTeamGoals;
      }
      if (match.awayTeamId === id) {
        return total + match.awayTeamGoals;
      }
      return total;
    }, 0);
  }

  static calculateGoalsOwmAll(id: number, allMatches: IMatch[]) {
    return allMatches.reduce((total, match) => {
      if (match.homeTeamId === id) {
        return total + match.awayTeamGoals;
      }
      if (match.awayTeamId === id) {
        return total + match.homeTeamGoals;
      }
      return total;
    }, 0);
  }

  static calculateGoalsBalanceAll(id: number, allMatches: IMatch[]) {
    return this.calculateGoalsFavorAll(id, allMatches) - this.calculateGoalsOwmAll(id, allMatches);
  }

  static calculateEfficiency(totalPoints: number, totalGames: number) {
    if (totalGames === 0) return 0;
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return parseFloat(efficiency.toFixed(2));
  }

  static sortTeamsByTotalPoints(a: ILeaderboard, b: ILeaderboard): number {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  }

  static teamPerformanceAll(team:ITeam, allMatches: IMatch[]) {
    const totalPoints = LeaderboardAll.getAllTotalPoints(team.id, allMatches);
    const totalGames = LeaderboardAll.calculateTotalGamesAll(team.id, allMatches);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories: LeaderboardAll.calculateTotalVictoriesAll(team.id, allMatches),
      totalDraws: LeaderboardAll.calculateTotalDrawsAll(team.id, allMatches),
      totalLosses: LeaderboardAll.calculateTotalLossesAll(team.id, allMatches),
      goalsFavor: LeaderboardAll.calculateGoalsFavorAll(team.id, allMatches),
      goalsOwn: LeaderboardAll.calculateGoalsOwmAll(team.id, allMatches),
      goalsBalance: LeaderboardAll.calculateGoalsBalanceAll(team.id, allMatches),
      efficiency: LeaderboardAll.calculateEfficiency(totalPoints, totalGames),
    };
  }

  async getAllTeamsPerfomance(): Promise<ILeaderboard[]> {
    const allMatches = await this.getMatchesFinished();
    const allTeams = await this.modelTeam.findAll();
    const allTeamsPerformance = allTeams
      .map((team) => LeaderboardAll.teamPerformanceAll(team, allMatches));
    return allTeamsPerformance.sort(LeaderboardAll.sortTeamsByTotalPoints);
  }
}
