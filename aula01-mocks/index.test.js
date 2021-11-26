const { rejects, deepStrictEqual } = require("assert");
const { error } = require("./src/constants");
const File = require("./src/file");

// clojure é uma função que se auto executa
// TODO: pesquisar depois ou fazer um artigo explicando o seu entendimento
(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    Date.prototype.getFullYear = () => 2020;
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Erick Wendel",
        id: 123,
        profession: "Javascript Instructor",
        birthday: 1995,
      },
      {
        name: "Xuxa da Silva",
        id: 321,
        profession: "Javascript Specialist",
        birthday: 1940,
      },
      {
        name: "Alecsander",
        id: 231,
        profession: "Javascript Developer",
        birthday: 1990,
      },
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
