jest.mock('../request');

import * as user from '../user';

//async test using async/await with error handling
it('tests error with async/await', async () => {
  expect.assertions(1);
  try {
    await user.getUserName(1);
  } catch (error) {
    expect(error).toEqual({
      error: 'User with 1 not found.',
    });
  }
});