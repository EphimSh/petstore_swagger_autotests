const path = require("path");
const agent = require("../tests/webConfig");
const newPet = require("../testdata/testdata-pet-body");

describe("POST /pet/{petId}/uploadImage", () => {
  it("upload an image", async () => {
    reporter
      .description("Update pet feature")
      .story("Update a pet")
      .testId("TEST-13");

    reporter.startStep("Making request");
    const imagePath = path.join(__dirname, "../resource/cool-cat-pic.jpg");
    const response = await agent
      .post(`/pet/${newPet.id}/uploadImage`)
      .set("Content-Type", "multipart/form-data")
      .field("additionalMetadata", "coolcat")
      .attach("file", imagePath, { type: "image/jpeg" });
    reporter.endStep();

    reporter.startStep("Check that name is changed");
    expect(response.status).toBe(200);
    reporter.endStep();
  });

  it("upload an image with bad id", async () => {
    reporter
      .description("Update pet feature")
      .story("Update a pet")
      .testId("TEST-13");

    reporter.startStep("Making request");
    const imagePath = path.join(__dirname, "../resource/cool-cat-pic.jpg");
    const response = await agent
      .post(`/pet/badid/uploadImage`)
      .set("Content-Type", "multipart/form-data")
      .field("additionalMetadata", "coolcat")
      .attach("file", imagePath, { type: "image/jpeg" });
    reporter.endStep();

    reporter.startStep("Check that status is 404");
    expect(response.status).toBe(404);
    reporter.endStep();
  });
});
