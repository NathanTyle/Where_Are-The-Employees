const connection = require("./connections");

class employees_DB {
    constructor(connection) {
      this.connection = connection;
    }