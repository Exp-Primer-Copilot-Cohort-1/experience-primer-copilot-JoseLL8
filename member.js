function skillsMember() {
  return {
    name: 'skillsMember',
    type: 'list',
    message: 'Select the skills member',
    choices: [
      {
        name: 'Member',
        value: 'member',
      },
      {
        name: 'Admin',
        value: 'admin',
      },
    ],
    default: 'member',
  };
}