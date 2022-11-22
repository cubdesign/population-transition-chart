// 仕様
// https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html
describe("RESAS apiのエラーのテスト", () => {
  const RESAS_API_KEY: string = Cypress.env("RESAS_API_KEY");
  const RESAS_API_URL: string = Cypress.env("RESAS_API_URL");

  it("400 Bad Request", () => {
    cy.request({
      method: "GET",
      url: `${RESAS_API_URL}/population/composition/perYear`,
      qs: {
        cityCodeX: "-",
        prefCodeX: "1",
      },
      headers: {
        "X-API-KEY": RESAS_API_KEY,
      },
    }).then((response) => {
      /*
        http status code 200
        body : "400"
       */
      expect(response.status).to.eq(200);
      expect(response.body).to.eq("400");
    });
  });

  it("403 Forbidden", () => {
    cy.request({
      method: "GET",
      url: `${RESAS_API_URL}/prefectures`,
      headers: {
        "X-API-KEY": "abc",
      },
    }).then((response) => {
      /*
        http status code 200
        body :{
          "statusCode": "403",
          "message": "Forbidden.",
          "description": ""
        }
       */
      expect(response.status).to.eq(200);
      expect(response.body.statusCode).to.eq("403");
      expect(response.body.message).to.eq("Forbidden.");
      expect(response.body.description).to.eq("");
    });
  });

  it("404 Not Found", () => {
    cy.request({
      method: "GET",
      url: `${RESAS_API_URL}/prefecturesX`,
      headers: {
        "X-API-KEY": RESAS_API_KEY,
      },
    }).then((response) => {
      /*
        http status code 200
        body :{
          "statusCode": "404",
          "message": "404. That's an error.",
          "description": "The requested URL /404 was not found on this server."
        }
       */
      expect(response.status).to.eq(200);
      expect(response.body.statusCode).to.eq("404");
      expect(response.body.message).to.eq("404. That's an error.");
      expect(response.body.description).to.eq(
        "The requested URL /404 was not found on this server."
      );
    });
  });
  // TODO : エラーを試すこと
  it.skip("429 Too Many Requests");
});
