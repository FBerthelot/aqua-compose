export function getOccupationRatio(fishes, volume) {
  const volumeForFish = fishes
    .map(fish =>
      fish.adultSize > 20
        ? fish.adultSize * 2 * fish.nbInAquarium
        : fish.adultSize * fish.nbInAquarium
    )
    .reduce((acc, v) => acc + v, 0);

  return (volumeForFish / volume) * 100;
}

export function getMinMaxOfkey(fishes, key) {
  return fishes.reduce((minMax, fish) => {
    return [
      !minMax || minMax[0] < fish.water[key][0]
        ? fish.water[key][0]
        : minMax[0],
      !minMax || minMax[1] > fish.water[key][1] ? fish.water[key][1] : minMax[1]
    ];
  }, null);
}

export function sortFishesByLifeZone(fishes) {
  return [...fishes].sort((f1, f2) => {
    const bottom1 = f1.lifeZone.includes("Fond");
    const middle1 = f1.lifeZone.includes("Milieu");
    const surface1 = f1.lifeZone.includes("Surface");
    const bottom2 = f2.lifeZone.includes("Fond");
    const middle2 = f2.lifeZone.includes("Milieu");
    const surface2 = f2.lifeZone.includes("Surface");
    const all1 = bottom1 && middle1 && surface1;
    const all2 = bottom2 && middle2 && surface2;

    if (
      [all1, middle1, surface1] === [all1, middle2, surface2] ||
      (all1 && middle2 && !surface2 && !bottom2) ||
      (all2 && middle1 && !surface1 && !bottom1)
    ) {
      return 0;
    }

    if (
      (!all2 && middle1 && surface2) ||
      (!all1 && bottom1 && middle2) ||
      (bottom1 && surface2)
    ) {
      return 1;
    }

    return -1;
  });
}
