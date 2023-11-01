const agent = require("../tests/webConfig");
const createNewPet = require("../helper/create_new_pet");
const { Severity } = require("jest-allure/dist/Reporter");

const petname = "bob";

describe("GET /pet/findByStatus", () => {
  test("Create a new pet then find it by status", async () => {
    reporter.description("").story("Find pets").testId("TEST-06");

    reporter.startStep("Creating a new pet");
    await createNewPet(petname);
    reporter.endStep();

    reporter.startStep("Making request");
    const response = await agent
      .get("/pet/findByStatus")
      .query({ status: "sold" })
      .expect("Content-Type", /json/)
      .expect(200);
    reporter.endStep();

    reporter.startStep(
      "Going through collection of pets searching for our pet named with specific name"
    );
    // const testPet = response.body.find((pet) => pet.name === petname);
    // expect(testPet.status).toBe("sold");

    reporter.endStep();
  });

  test("Create a new pet then find it by id", async () => {
    reporter.description("").story("Find pets").testId("TEST-07");

    reporter.startStep("Creating a new pet");
    await createNewPet(petname);
    reporter.endStep();

    reporter.startStep("Making request");
    const response = await agent
      .get("/pet/" + 190000)
      .expect("Content-Type", /json/)
      .expect(200);
    reporter.endStep();
    reporter.startStep("Pet was found by id");
    expect(response.body.id).toBe(190000);
    reporter.endStep();
  });

  test("Create a new pet then find it by", async () => {
    reporter
      .description("404 when we searching by bad id")
      .story("Find pets")
      .testId("TEST-08");

    reporter.startStep("Creating a new pet");
    await createNewPet(petname);
    reporter.endStep();

    reporter.startStep("Making request");
    const response = await agent
      .get("/pet/" + "bad id")
      .expect("Content-Type", /json/);
    reporter.endStep();

    reporter.startStep("Pet not found; 404 received");
    expect(response.status).toBe(404);
    reporter.endStep();
  });

  test("Each id is not unique", async () => {
    reporter
      .description("Check that every id is not unique")
      .severity(Severity.Critical)
      .story("Find pets")
      .testId("TEST-09");

    //request start
    reporter.startStep("Making request");
    const response = await agent
      .get("/pet/findByStatus")
      .query({ status: "available" })
      .expect("Content-Type", /json/)
      .expect(200);

    const url = response.req._headers.host + response.req.path;
    const status = response.status;

    //get host to report
    reporter.addArgument("Url: " + url + "\n");
    reporter.endStep();

    //get Status to report
    reporter.addArgument("Status: " + status + "\n");
    reporter.endStep();

    //request end
    reporter.endStep();

    const ids = response.body.map((pet) => pet.id);
    const uniqueIds = new Set(ids);

    //report start
    reporter.startStep("Check that ids are not unique");
    expect(uniqueIds.size).not.toEqual(Object.keys(response.body).length);
    reporter.addArgument("Number of unique ids: " + uniqueIds.size);
    reporter.endStep();

    reporter.addArgument(
      "Number of all ids include non-unique: " +
        Object.keys(response.body).length
    );
    reporter.endStep();

    //report end
    reporter.endStep();
  });
});
