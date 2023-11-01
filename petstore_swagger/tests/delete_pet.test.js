const agent = require("../tests/webConfig");
const createNewPet = require("../helper/create_new_pet");
const petname = "bob";

describe("DELETE /pet/{petId}", () => {
  test("Delete pet by id check", async () => {
    reporter
      .description("Delete pet by id")
      .story("Delete pet")
      .testId("TEST-04");

    reporter.startStep("Creating a new pet");
    await createNewPet(petname);
    reporter.endStep();

    reporter.startStep("Making request");
    const response = await agent
      .delete("/pet/" + 190000)
      .set("api_key", "special_key")
      .expect("Content-Type", /json/)
      .expect(200);
    reporter.endStep();

    reporter.startStep();
    expect(response.body.code).toBe(200);
    expect(response.body.type).toBe("unknown");
    expect(response.body.message).toBe("190000");
    reporter.endStep();
  });

  test("Delete pet with bad id", async () => {
    reporter
      .description("Delete pet by bad id")
      .story("Delete pet")
      .testId("TEST-05");

    reporter.startStep("Making request");
    const response = await agent
      .delete("/pet/" + "bad id")
      .set("api_key", "special_k3y")
      .expect("Content-Type", /json/)
      .expect(404);
    reporter.endStep();

    reporter.startStep();
    expect(response.body.message).toBe(
      'java.lang.NumberFormatException: For input string: "bad id"'
    );
    reporter.endStep();
  });
});
