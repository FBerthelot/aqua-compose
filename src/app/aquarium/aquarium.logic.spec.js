import {
  getOccupationRatio,
  getMinMaxOfkey,
  sortFishesByLifeZone
} from "./aquarium.logic";

describe("aquarium logic", () => {
  describe("getOccupationRatio", () => {
    it("should return 0 when there is no fish", () => {
      expect(getOccupationRatio([], 80)).toBe(0);
    });

    it("should return 10 there is one fish of 8 cm", () => {
      expect(getOccupationRatio([{ adultSize: 8, nbInAquarium: 1 }], 80)).toBe(
        10
      );
    });

    it("should return 20 there is two fish of 8 cm", () => {
      expect(getOccupationRatio([{ adultSize: 8, nbInAquarium: 2 }], 80)).toBe(
        20
      );
    });

    it("should return 40 there is one fish of 21 cm", () => {
      expect(
        getOccupationRatio([{ adultSize: 21, nbInAquarium: 1 }], 100)
      ).toBe(42);
    });

    it("should return 80 there is one fish of 22 cm", () => {
      expect(
        getOccupationRatio([{ adultSize: 22, nbInAquarium: 2 }], 100)
      ).toBe(88);
    });

    it("should return 50 there is one fish of 22 cm and one another of 6", () => {
      expect(
        getOccupationRatio(
          [
            { adultSize: 22, nbInAquarium: 1 },
            { adultSize: 6, nbInAquarium: 1 }
          ],
          100
        )
      ).toBe(50);
    });
  });

  describe("getMinMaxOfkey", () => {
    it("should return [10, 50] with one fish", () => {
      expect(getMinMaxOfkey([{ water: { toto: [10, 50] } }], "toto")).toEqual([
        10,
        50
      ]);
    });

    it("should return [10, 50] with tow fishes with same values", () => {
      expect(
        getMinMaxOfkey(
          [{ water: { toto: [10, 50] } }, { water: { toto: [10, 50] } }],
          "toto"
        )
      ).toEqual([10, 50]);
    });

    it("should return [15, 45] with tow fishes of [9, 45] and [15, 50]", () => {
      expect(
        getMinMaxOfkey(
          [{ water: { toto: [9, 45] } }, { water: { toto: [15, 50] } }],
          "toto"
        )
      ).toEqual([15, 45]);
    });

    it("should return [15, 30] with tow fishes of [10, 50] and [15, 30]", () => {
      expect(
        getMinMaxOfkey(
          [{ water: { toto: [15, 30] } }, { water: { toto: [10, 50] } }],
          "toto"
        )
      ).toEqual([15, 30]);
    });
  });

  describe("sortFishesByLifeZone", () => {
    let fishes;
    beforeEach(() => {
      fishes = [
        {
          lifeZone: ["Milieu"]
        },
        {
          lifeZone: ["Fond"]
        },
        {
          lifeZone: ["Surface"]
        },
        {
          lifeZone: ["Fond", "Milieu"]
        },
        {
          lifeZone: ["Surface", "Milieu"]
        },
        {
          lifeZone: ["Fond", "Milieu", "Surface"]
        }
      ];
    });

    it("should return [] when there is no fish", () => {
      expect(sortFishesByLifeZone([])).toEqual([]);
    });

    it("should prioritize Surface over Milieu", () => {
      expect(sortFishesByLifeZone([fishes[0], fishes[2], fishes[0]])).toEqual([
        fishes[2],
        fishes[0],
        fishes[0]
      ]);
    });

    it("should prioritize Milieu over Fond", () => {
      expect(sortFishesByLifeZone([fishes[0], fishes[1], fishes[0]])).toEqual([
        fishes[0],
        fishes[0],
        fishes[1]
      ]);
    });

    it("should prioritize Surface over Fond", () => {
      expect(sortFishesByLifeZone([fishes[2], fishes[1], fishes[2]])).toEqual([
        fishes[2],
        fishes[2],
        fishes[1]
      ]);
    });

    it("should prioritize Surface over Surface,Milieu", () => {
      expect(
        sortFishesByLifeZone([fishes[2], fishes[4], fishes[2], fishes[4]])
      ).toEqual([fishes[2], fishes[2], fishes[4], fishes[4]]);
    });

    it("should prioritize Surface over Milieu,Fond", () => {
      expect(sortFishesByLifeZone([fishes[2], fishes[3], fishes[2]])).toEqual([
        fishes[2],
        fishes[2],
        fishes[3]
      ]);
    });

    it("should prioritize Surface,Milieu over Milieu", () => {
      expect(sortFishesByLifeZone([fishes[4], fishes[0], fishes[4]])).toEqual([
        fishes[4],
        fishes[4],
        fishes[0]
      ]);
    });

    it("should prioritize Surface,Milieu over Fond", () => {
      expect(sortFishesByLifeZone([fishes[4], fishes[1], fishes[4]])).toEqual([
        fishes[4],
        fishes[4],
        fishes[1]
      ]);
    });

    it("should prioritize Surface over Milleu,Fond", () => {
      expect(sortFishesByLifeZone([fishes[3], fishes[2], fishes[3]])).toEqual([
        fishes[2],
        fishes[3],
        fishes[3]
      ]);
    });

    it("should prioritize Milleu over Milleu,Fond", () => {
      expect(sortFishesByLifeZone([fishes[3], fishes[0], fishes[3]])).toEqual([
        fishes[0],
        fishes[3],
        fishes[3]
      ]);
    });

    it("should prioritize Milleu,Fond over Fond", () => {
      expect(sortFishesByLifeZone([fishes[3], fishes[1], fishes[3]])).toEqual([
        fishes[3],
        fishes[3],
        fishes[1]
      ]);
    });

    it("should prioritize Surface over Surface,Milleu,Fond", () => {
      expect(sortFishesByLifeZone([fishes[2], fishes[5], fishes[2]])).toEqual([
        fishes[2],
        fishes[2],
        fishes[5]
      ]);
    });

    it("should prioritize Surface,Milleu,Fond over Fond", () => {
      expect(sortFishesByLifeZone([fishes[1], fishes[5], fishes[1]])).toEqual([
        fishes[5],
        fishes[1],
        fishes[1]
      ]);
    });

    it("should prioritize Milleu over Surface,Milleu,Fond", () => {
      expect(sortFishesByLifeZone([fishes[0], fishes[5], fishes[0]])).toEqual([
        fishes[0],
        fishes[5],
        fishes[0]
      ]);
    });

    it("should prioritize Surface,Milleu,Fond over Milleu,Fond", () => {
      expect(sortFishesByLifeZone([fishes[3], fishes[5], fishes[3]])).toEqual([
        fishes[5],
        fishes[3],
        fishes[3]
      ]);
    });

    it("should prioritize Surface,Milleu over Surface,Milleu,Fond", () => {
      expect(sortFishesByLifeZone([fishes[4], fishes[5], fishes[4]])).toEqual([
        fishes[4],
        fishes[4],
        fishes[5]
      ]);
    });

    it("should sort fishes", () => {
      expect(sortFishesByLifeZone(fishes)).toEqual([
        fishes[2],
        fishes[4],
        fishes[0],
        fishes[5],
        fishes[3],
        fishes[1]
      ]);
    });
  });
});
