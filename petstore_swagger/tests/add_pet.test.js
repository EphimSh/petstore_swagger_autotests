const agent = require("../tests/webConfig");
const newPet = require("../testdata/testdata-pet-body");

describe("POST /pet", () => {
  it("check added pet's name", async () => {
    reporter
      .description("Testing add pet feature")
      .story("Add a pet")
      .testId("TEST-01");

    reporter.startStep("Making request");
    const response = await agent
      .post("/pet")
      .send(newPet)
      .expect("Content-Type", /json/)
      .expect(200);
    reporter.endStep();

    reporter.startStep("Check that object is created");
    expect(response.body).toMatchObject(newPet);
    reporter.endStep();
  });

  it("pet's id should be typeof 'number'", async () => {
    reporter
      .description("Testing add pet feature")
      .story("Add a pet")
      .testId("TEST-02");

    reporter.startStep("Making request");
    const response = await agent
      .post("/pet")
      .send(newPet)
      .expect("Content-Type", /json/)
      .expect(200);
    reporter.endStep();

    reporter.startStep("Check that id is the typeof number");
    expect(typeof response.body.id).toBe("number");
    reporter.endStep();
  });
});

describe("POST /pet: Bad request", () => {
  it("status should be 500", async () => {
    reporter
      .description("Sending body with String in 'id' instead of number")
      .story("Add a pet")
      .testId("TEST-03");

    reporter.startStep("Making request");
    const response = await agent
      .post("/pet")
      .send({ ...newPet, id: "Bad Ids" })
      .expect("Content-Type", /json/);
    reporter.endStep();

    reporter.startStep("Status code is 500");
    expect(response.status).toBe(500);
    reporter.endStep();
  });
});
