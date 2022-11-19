describe("人口構成 apiのテスト", () => {
  it("人口構成 北海道 - GET", () => {
    const RESAS_API_KEY: string = Cypress.env("RESAS_API_KEY");
    cy.request({
      method: "GET",
      url: "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
      qs: {
        cityCode: "-",
        prefCode: "1",
      },
      headers: {
        "X-API-KEY": RESAS_API_KEY,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.boundaryYear).to.eq(2015);
      expect(response.body.result.data[0].label).to.eq("総人口");
      expect(response.body.result.data[1].label).to.eq("年少人口");
      expect(response.body.result.data[2].label).to.eq("生産年齢人口");
      expect(response.body.result.data[3].label).to.eq("老年人口");

      cy.log("response", response);
    });
  });
  it("人口構成 東京都 - GET", () => {
    const RESAS_API_KEY: string = Cypress.env("RESAS_API_KEY");
    cy.request({
      method: "GET",
      url: "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
      qs: {
        cityCode: "-",
        prefCode: "13",
      },
      headers: {
        "X-API-KEY": RESAS_API_KEY,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.boundaryYear).to.eq(2015);
      expect(response.body.result.data[0].label).to.eq("総人口");
      expect(response.body.result.data[1].label).to.eq("年少人口");
      expect(response.body.result.data[2].label).to.eq("生産年齢人口");
      expect(response.body.result.data[3].label).to.eq("老年人口");

      cy.log("response", response);
    });
  });
  it("人口構成 沖縄 - GET", () => {
    const RESAS_API_KEY: string = Cypress.env("RESAS_API_KEY");
    cy.request({
      method: "GET",
      url: "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
      qs: {
        cityCode: "-",
        prefCode: "47",
      },
      headers: {
        "X-API-KEY": RESAS_API_KEY,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result.boundaryYear).to.eq(2015);
      expect(response.body.result.data[0].label).to.eq("総人口");
      expect(response.body.result.data[1].label).to.eq("年少人口");
      expect(response.body.result.data[2].label).to.eq("生産年齢人口");
      expect(response.body.result.data[3].label).to.eq("老年人口");

      cy.log("response", response);
    });
  });
});
