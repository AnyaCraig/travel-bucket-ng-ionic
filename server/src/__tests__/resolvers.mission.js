/** 
 * These tests come from the GraphQL/Apollo Fullstack Tutorial, which allows users
to book launch tickets with SpaceX. I modified the server from that tutorial to use
in this app. I am leaving these tests in as examples in case someone wants to continue 
this app by writing tests for it, but these particular tests do not apply 
to the Travel Bucket app
*/

const resolvers = require('../resolvers');

const mockMission = {
  name: 'foo',
  missionPatchLarge: 'LG',
  missionPatchSmall: 'SM',
};

describe('[Mission.missionPatch]', () => {
  it('chooses the right sized patch', () => {
    const { missionPatch } = resolvers.Mission;

    // default -- no arg passed
    const resDefault = missionPatch(mockMission);
    const resSmall = missionPatch(mockMission, { size: 'SMALL' });
    const resLarge = missionPatch(mockMission, { size: 'LARGE' });

    expect(resDefault).toEqual('LG');
    expect(resSmall).toEqual('SM');
    expect(resLarge).toEqual('LG');
  });
});
