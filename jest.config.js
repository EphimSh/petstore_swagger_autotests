module.exports = {
  testRunner: "jest-jasmine2",
  setupFilesAfterEnv: ["jest-allure/dist/setup"],
  reporters: ["default", "jest-allure"],
};
