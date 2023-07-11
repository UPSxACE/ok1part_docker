const ACCESS = {
  none: 0,
  create: 2, // can create and edit forms
  validate: 4, // can validate forms
  manage_data1: 8, // can see operational data
  manage_data2: 16, // can see administrative data
  manage_app: 32, // can manage the app
};

export default ACCESS;
