import TeamModel from '../models/TeamModel';

async function checkTeamsExist(teamId:number):Promise<boolean> {
  const teamModel = new TeamModel();
  const team = await teamModel.findById(teamId);
  return !!team;
}

export default checkTeamsExist;
