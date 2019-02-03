const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const writeFishMetadata = fishes => {
  return writeFile(
    path.join(__dirname, `../../../public/data/metadata.json`),
    JSON.stringify({
      fishSlugs: fishes.map(f => f.slug)
    })
  );
};

const writeFishes = fishes => {
  return writeFile(
    path.join(__dirname, `../../../public/data/all.json`),
    JSON.stringify(fishes)
  );
};

exports.generate = async () => {
  const files = await readDir(
    path.join(__dirname, "../../../public/data/fishes")
  );

  const fishesRaw = await Promise.all(
    files.map(file =>
      readFile(
        path.join(__dirname, "../../../public/data/fishes", file),
        "utf8"
      )
    )
  );

  const fishes = fishesRaw.map(JSON.parse);

  await writeFishes(fishes);

  await writeFishMetadata(fishes);
};
