const request = require("supertest");
const agent = request("https://petstore.swagger.io/v2");
const newPet = require("../testdata/testdata-pet-body");

const createNewPet = async (petName) => {
  await agent
    .post("/pet")
    .send({ ...newPet, name: petName })
    .expect("Content-Type", /json/)
    .expect(200);

  return this;
};

module.exports = createNewPet;
