const request = require("supertest");
const agent = request("https://petstore.swagger.io/v2");

module.exports = agent;
