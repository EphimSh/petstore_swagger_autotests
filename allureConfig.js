const CustomAllureListener = require("./path-to-your/CustomAllureListener");

module.exports = {
  onPrepare() {
    CustomAllureListener.withCustomTemplates();
  },
};
