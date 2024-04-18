import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/matches/IMatch';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboard';
import ITeam from '../Interfaces/teams/ITeam';

export default class LeaderBoardModel {
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

  static calculateTotalPoints(id: number, homeMatches: IMatch[]) {
    let totalPoints = 0;
    for (let i = 0; i < homeMatches.length; i += 1) {
      if (homeMatches[i].homeTeamId === id) {
        if (homeMatches[i].homeTeamGoals > homeMatches[i].awayTeamGoals) {
          totalPoints += 3;
        } else if (homeMatches[i].homeTeamGoals === homeMatches[i].awayTeamGoals) {
          totalPoints += 1;
        }
      }
    }
    return totalPoints;
  }

  static calculateTotalPointsAway(id:number, awayMatches: IMatch[]) {
    let totalPoints = 0;
    for (let i = 0; i < awayMatches.length; i += 1) {
      if (awayMatches[i].awayTeamId === id) {
        if (awayMatches[i].homeTeamGoals < awayMatches[i].awayTeamGoals) {
          totalPoints += 3;
        } else if (awayMatches[i].homeTeamGoals === awayMatches[i].awayTeamGoals) {
          totalPoints += 1;
        }
      }
    }
    return totalPoints;
  }

  static countMatches(
    id: number,
    homeMatches: IMatch[],
    matchPredicate: (match: IMatch) => boolean,
  ) {
    let count = 0;
    for (let i = 0; i < homeMatches.length; i += 1) {
      if (homeMatches[i].homeTeamId === id && matchPredicate(homeMatches[i])) {
        count += 1;
      }
    }
    return count;
  }

  static countMatchesAway(
    id: number,
    awayMatches: IMatch[],
    matchPredicate: (match: IMatch) => boolean,
  ) {
    let count = 0;
    for (let i = 0; i < awayMatches.length; i += 1) {
      if (awayMatches[i].awayTeamId === id && matchPredicate(awayMatches[i])) {
        count += 1;
      }
    }
    return count;
  }

  static calculateTotalGames(id: number, homeMatches: IMatch[]) {
    return this.countMatches(id, homeMatches, () => true);
  }

  static calculateTotalGamesAway(id: number, awayMatches: IMatch[]) {
    return this.countMatchesAway(id, awayMatches, () => true);
  }

  static calculateTotalVictories(id: number, homeMatches: IMatch[]) {
    return this.countMatches(id, homeMatches, (match) => match.homeTeamGoals > match.awayTeamGoals);
  }

  static calculateTotalVictoriesAway(id: number, awayMatches: IMatch[]) {
    return this
      .countMatchesAway(id, awayMatches, (match) => match.awayTeamGoals > match.homeTeamGoals);
  }

  static calculateTotalDraws(id: number, homeMatches: IMatch[]) {
    return this.countMatches(
      id,
      homeMatches,
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    );
  }

  static calculateTotalDrawsAway(id: number, awayMatches: IMatch[]) {
    return this.countMatchesAway(
      id,
      awayMatches,
      (match) => match.awayTeamGoals === match.homeTeamGoals,
    );
  }

  static calculateTotalLosses(id: number, homeMatches: IMatch[]) {
    return this.countMatches(id, homeMatches, (match) => match.homeTeamGoals < match.awayTeamGoals);
  }

  static calculateTotalLossesAway(id: number, awayMatches: IMatch[]) {
    return this
      .countMatchesAway(id, awayMatches, (match) => match.awayTeamGoals < match.homeTeamGoals);
  }

  static calculateGoalsFavor(id: number, homeMatches: IMatch[]) {
    return homeMatches.reduce((total, match) => {
      if (match.homeTeamId === id) {
        return total + match.homeTeamGoals;
      }
      return total;
    }, 0);
  }

  static calculateGoalsFavorAway(id: number, awayMatches: IMatch[]) {
    return awayMatches.reduce((total, match) => {
      if (match.awayTeamId === id) {
        return total + match.awayTeamGoals;
      }
      return total;
    }, 0);
  }

  static calculateGoalsOwm(id: number, homeMatches: IMatch[]) {
    return homeMatches.reduce((total, match) => {
      if (match.homeTeamId === id) {
        return total + match.awayTeamGoals;
      }
      return total;
    }, 0);
  }

  static calculateGoalsOwmAway(id: number, awayMatches: IMatch[]) {
    return awayMatches.reduce((total, match) => {
      if (match.awayTeamId === id) {
        return total + match.homeTeamGoals;
      }
      return total;
    }, 0);
  }

  static calculateGoalsBalance(id: number, homeMatches: IMatch[]) {
    return this.calculateGoalsFavor(id, homeMatches) - this.calculateGoalsOwm(id, homeMatches);
  }

  static calculateGoalsBalanceAway(id: number, awayMatches: IMatch[]) {
    return this
      .calculateGoalsFavorAway(id, awayMatches) - this.calculateGoalsOwmAway(id, awayMatches);
  }

  static calculateEfficiency(totalPoints: number, totalGames: number): number {
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

  static teamPerformances(team:ITeam, homeMatches: IMatch[]) {
    const totalPoints = LeaderBoardModel.calculateTotalPoints(team.id, homeMatches);
    const totalGames = LeaderBoardModel.calculateTotalGames(team.id, homeMatches);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories: LeaderBoardModel.calculateTotalVictories(team.id, homeMatches),
      totalDraws: LeaderBoardModel.calculateTotalDraws(team.id, homeMatches),
      totalLosses: LeaderBoardModel.calculateTotalLosses(team.id, homeMatches),
      goalsFavor: LeaderBoardModel.calculateGoalsFavor(team.id, homeMatches),
      goalsOwn: LeaderBoardModel.calculateGoalsOwm(team.id, homeMatches),
      goalsBalance: LeaderBoardModel.calculateGoalsBalance(team.id, homeMatches),
      efficiency: LeaderBoardModel.calculateEfficiency(totalPoints, totalGames),
    };
  }

  static teamPerformancesAway(team:ITeam, awayMatches: IMatch[]) {
    const totalPoints = LeaderBoardModel.calculateTotalPointsAway(team.id, awayMatches);
    const totalGames = LeaderBoardModel.calculateTotalGamesAway(team.id, awayMatches);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories: LeaderBoardModel.calculateTotalVictoriesAway(team.id, awayMatches),
      totalDraws: LeaderBoardModel.calculateTotalDrawsAway(team.id, awayMatches),
      totalLosses: LeaderBoardModel.calculateTotalLossesAway(team.id, awayMatches),
      goalsFavor: LeaderBoardModel.calculateGoalsFavorAway(team.id, awayMatches),
      goalsOwn: LeaderBoardModel.calculateGoalsOwmAway(team.id, awayMatches),
      goalsBalance: LeaderBoardModel.calculateGoalsBalanceAway(team.id, awayMatches),
      efficiency: LeaderBoardModel.calculateEfficiency(totalPoints, totalGames),
    };
  }

  async getHomeTeamsPerformance() {
    const homeMatches = await this.getMatchesFinished();
    const teams = await this.modelTeam.findAll();
    const teamPerformances = teams
      .map((team) => LeaderBoardModel.teamPerformances(team, homeMatches));
    return teamPerformances.sort(LeaderBoardModel.sortTeamsByTotalPoints);
  }

  async getAwayTeamsPerformance() {
    const awayMatches = await this.getMatchesFinished();
    const teams = await this.modelTeam.findAll();
    const teamPerformances = teams
      .map((team) => LeaderBoardModel.teamPerformancesAway(team, awayMatches));
    return teamPerformances.sort(LeaderBoardModel.sortTeamsByTotalPoints);
  }
}
