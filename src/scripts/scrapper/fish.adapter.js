const cheerio = require("cheerio");
const slugify = require("slugify");

exports.adapt = (html, id) => {
  const $ = cheerio.load(html);

  return {
    slug: slugify(
      $('h1 [itemprop="name"]')
        .text()
        .trim()
    ),
    name: $('h1 [itemprop="name"]')
      .text()
      .trim(),
    surname: $('[itemprop="alternateName"]')
      .text()
      .trim(),
    category: $(".description tr:nth-child(1) > td:nth-child(2)")
      .first()
      .text()
      .trim(),

    adultSize: Number(
      $(".description tr:nth-child(2) > td:nth-child(2)")
        .first()
        .text()
        .trim()
        .match(/^(\d*)/)[1]
    ),
    minimumPopulation: Number(
      $(".description tr:nth-child(5) > td:nth-child(2)")
        .first()
        .text()
        .trim()
        .match(/^(\d*)/)[1]
    ),
    minimumVolume: Number(
      $(".description tr:nth-child(4) > td:nth-child(2)")
        .first()
        .text()
        .trim()
        .match(/^(\d*)/)[1]
    ),

    water: {
      temperature: $(".description tr:nth-child(1) > td:nth-child(2)")
        .last()
        .text()
        .split("à")
        .map(t => t.trim().match(/(\d*)/)[1])
        .map(Number),
      PH: $(".description tr:nth-child(2) > td:nth-child(2)")
        .last()
        .text()
        .split("à")
        .map(t => t.trim().match(/(\d*[.]\d*)/)[1])
        .map(Number),
      GH: $(".description tr:nth-child(3) > td:nth-child(2)")
        .last()
        .text()
        .split("à")
        .map(t => t.trim().match(/(\d*)/)[1])
        .map(Number)
    },
    lifeZone: $(".description tr:nth-child(3) > td:nth-child(2)")
      .first()
      .text()
      .trim()
      .split("/"),

    picture: $('[itemprop="image"]').attr("src"),

    link: `https://www.aquachange.fr/poisson_fiche_aquarium.php?id=${id}`
  };
};
