/** 
 * These tests come from the GraphQL/Apollo Fullstack Tutorial, which allows users
to book launch tickets with SpaceX. I modified the server from that tutorial to use
in this app. I am leaving these tests in as examples in case someone wants to continue 
this app by writing tests for it, but these particular tests do not apply 
to the Travel Bucket app
*/

const resolvers = require('../resolvers');

describe('[User.trips]', () => {
  const mockContext = {
    dataSources: {
      userAPI: { getLaunchIdsByUser: jest.fn() },
      launchAPI: { getLaunchesByIds: jest.fn() },
    },
    user: { id: 1 },
  };
  const { getLaunchIdsByUser } = mockContext.dataSources.userAPI;
  const { getLaunchesByIds } = mockContext.dataSources.launchAPI;

  it('uses user id from context to lookup trips', async () => {
    getLaunchIdsByUser.mockReturnValueOnce([999]);
    getLaunchesByIds.mockReturnValueOnce([{ id: 999 }]);

    // check the resolver response
    const res = await resolvers.User.trips(null, null, mockContext);
    expect(res).toEqual([{ id: 999 }]);

    // make sure the dataSources were called properly
    expect(getLaunchIdsByUser).toBeCalled();
    expect(getLaunchesByIds).toBeCalledWith({ launchIds: [999] });
  });

  it('returns empty array if no response', async () => {
    getLaunchIdsByUser.mockReturnValueOnce([]);
    getLaunchesByIds.mockReturnValueOnce([]);

    // check the resolver response
    const res = await resolvers.User.trips(null, null, mockContext);
    expect(res).toEqual([]);
  });
});
