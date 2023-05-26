const userService = jest.mock('./user.service');

let mockData;

userService.create = jest.fn((user) => {
  user.id = '6425bd8dc85edac93831693c';
  mockData.push(user);
  return Promise.resolve(user);
});

userService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((u) => u.id === id));
});

//TODO USERSERVICE UPDATE
// userService.update = jest.fn((id, user) => {
//   const updateUser = user;
//   updateUser.id = id;
//   mockData.splice(
//     mockData.findIndex((u) => u.id === id),
//     1
//   );
//   mockData.push(updateUser);

//   return Promise.resolve(updateUser);
// });

userService.delete = jest.fn((id) => {
  return Promise.resolve(
    mockData.splice(
      mockData.findIndex((u) => u.id === id),
      1
    )
  );
});

userService.__setMockData = (data) => {
  mockData = data;
};

module.exports = userService;
