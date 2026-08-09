import cubejs from "@cubejs-client/core";

const cubeApi = cubejs(
  "f4bb499af3d9815bac33a99a731aa59ba17318286b459bd881dcc11e762746fa273b31ed4eca9e27eb4c5a77f52a5843215d4c6731cab827b79ddad39521b571",
  {
    apiUrl: "http://localhost:4000/cubejs-api/v1"
  }
);

export default cubeApi;