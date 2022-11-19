describe("トップページのテスト", () => {
  it("ページが表示されること", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").then((h1) => {
      expect(h1.text()).to.eq("population-transition-chart");
    });
  });
});
