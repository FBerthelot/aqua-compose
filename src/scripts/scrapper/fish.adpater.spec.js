const adapter = require("./fish.adapter");

describe("fish adapter", () => {
  it("should adapt one fish", () => {
    const adaptedFish = adapter.adapt(
      `
      <h1>
        <small itemprop="alternateName">CRS / Crystal Red / Red Bee </small>
        <span itemprop="name">Caridina logemanni</span>
      </h1>

      <table class="table table-condensed description">
        <caption>Description</caption>
        <tbody>
          <tr>
            <th>Catégorie</th>
            <td>Crevettes</td>
          </tr>
          <tr>
            <th>Taille</th>
            <td>3 cm</td>
          </tr>
          <tr>
            <th>Zone de vie</th>
            <td>Fond</td>
          </tr>
          <tr>
            <th>Volume minimum</th>
            <td>10 litres</td>
          </tr>
          <tr>
            <th>Individus minimum</th>
            <td>6 individus</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-condensed description">
        <caption>Paramètres de l'eau</caption>
        <tbody>
          <tr>
            <th>Température</th>
            <td>20 à 26 °c</td>
          </tr>
          <tr>
            <th>PH</th>
            <td>6.0 à 7.2</td>
          </tr>
          <tr>
            <th>GH</th>
            <td>3 à 12 °d</td>
          </tr>
        </tbody>
      </table>
      <img itemprop="image" src="https://www.aquachange.fr/Librairie/Images/poissons/1/6/9/preview_Crystal_Red_1.jpg" alt="CRS / Crystal Red / Red Bee Caridina logemanni" width="470">
      `,
      1
    );

    expect(adaptedFish).toEqual({
      slug: "Caridina-logemanni",
      name: "Caridina logemanni",
      surname: "CRS / Crystal Red / Red Bee",
      adultSize: 3,
      category: "Crevettes",
      lifeZone: ["Fond"],
      link: "https://www.aquachange.fr/poisson_fiche_aquarium.php?id=1",
      picture:
        "https://www.aquachange.fr/Librairie/Images/poissons/1/6/9/preview_Crystal_Red_1.jpg",
      minimumPopulation: 6,
      minimumVolume: 10,
      water: {
        GH: [3, 12],
        PH: [6, 7.2],
        temperature: [20, 26]
      }
    });
  });
});
