const agent = require("../tests/webConfig");
const newPet = require("../testdata/testdata-pet-body");

describe("PUT /pet", () => {
  it("check added pet's name", async () => {
    reporter
      .description("Update pet feature")
      .story("Update a pet")
      .testId("TEST-10");

    reporter.startStep("Making request");
    const petname = "george";
    const response = await agent
      .put("/pet")
      .send({ ...newPet, name: petname })
      .expect("Content-Type", /json/)
      .expect(200);
    reporter.endStep();

    reporter.startStep("Check that name is changed");
    expect(response.body.name).not.toEqual("john");
    reporter.endStep();
  });

  it("attempt to update with invalid data", async () => {
    reporter
      .description("Update pet feature")
      .story("Update a pet (invalid data)")
      .testId("TEST-11");

    reporter.startStep("Making request");
    const response = await agent
      .put("/pet")
      .send({ ...newPet, id: "invalidID", name: "george" })
      .expect("Content-Type", /json/)
      .expect(500);
    reporter.endStep();

    reporter.startStep("Check error message");
    expect(response.body.message).toBe("something bad happened");
    reporter.endStep();
  });
});

describe("POST /pet/{petId}", () => {
  test("Update pet by id", async () => {
    reporter
      .description("Update pet feature")
      .story("Find pets")
      .testId("TEST-12");

    const petId = 190000;
    const formData = new URLSearchParams();
    formData.append("name", "doggiez");
    formData.append("status", "available");

    reporter.startStep("Making request");
    const response = await agent
      .post(`/pet/${petId}`)
      .set("accept", "application/json")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send(formData.toString());
    reporter.endStep();

    reporter.startStep("Check status 200");
    expect(response.body.code).toBe(200);
    expect(response.body.type).toBe("unknown");
    expect(response.body.message).toBe(`${petId}`);
    reporter.endStep();
  });
});
