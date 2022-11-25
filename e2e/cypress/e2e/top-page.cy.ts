describe("トップページのテスト", () => {
  it("ページが表示されること", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").then((h1) => {
      expect(h1.text()).to.eq("都道府県別の総人口推移");
    });
  });
});
