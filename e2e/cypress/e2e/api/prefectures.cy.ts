describe("都道府県一覧", () => {
  it("都道府県一覧 - GET", () => {
    const RESAS_API_KEY: string = Cypress.env("RESAS_API_KEY");
    cy.request({
      method: "GET",
      url: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      headers: {
        "X-API-KEY": RESAS_API_KEY,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result).to.have.length(47);
      expect(response.body.result[0].prefCode).to.eq(1);
      expect(response.body.result[0].prefName).to.eq("北海道");
      expect(response.body.result[46].prefCode).to.eq(47);
      expect(response.body.result[46].prefName).to.eq("沖縄県");
      cy.log("response", response);
    });
  });
});
