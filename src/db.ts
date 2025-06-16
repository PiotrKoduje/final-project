export interface Wine {
  id: string;
  name: string;
  description: string;
  country: string;
  color: string;
  style: string;
  grapeVariety: string;
  region: string;
  volume: string;
  alkohol: string;
  vintage: string;
  price: number;
  photos?: string;
}

type DBData = {
  wines: Wine[];
};

export const db: DBData = {
  wines: [
    {
      id: 'e950411d-d77f-402b-9fd4-64df4313e1e8',
      name: 'Chateau Du Closet Bordeaux',
      description: 'Rodzina Dugrandów produkuje wino od 3 pokolenia. Winnica obejmuje 43 hektary. Gleba gliniasto-wapienna zapewnia winu solidną koncentrację. Świeże i młodzieńcze wino z przyjemnym owocowym charakterem. Château Du Closet jest to kwintesencja pijalnego Bordreaux. Idealnie sprawdzi się jako towarzysz grillowanych potraw',
      country: 'francja',
      color: 'czerwone',
      style: 'wytrawne, owocowe',
      grapeVariety: 'cabernet, merlot',
      region: 'bordeaux',
      volume: '0.75L',
      alkohol: '13.5%',
      vintage: '2018',
      price: 44,
    },
    {
      id: '6fe31bd3-5464-4d1f-8293-e9aa99a2a80c',
      name: 'Domaine Philippe Cheron Clos de Vougeot Grand',
      description: 'Domaine Philippe Chéron obejmuje 5 hektarów i zlokalizowany jest w sercu apelacji Nuits Saint Georges. Na słynnym Grand Cru Clos de Vougeot winnica ma niespełna 1,5 hektara. Grand Cru Clos de Vougeot zajmuje dużą część miasta Vougeot, między Chambolle-Musigny i Flagey-Échezeaux i Vosne-Romanée. Ponad pięćdziesięcioletnie nasadzenia króla Burgundii, szczepu pinot noir wzrastają na gliniasto wapiennej glebie. Grona zbierane są ręcznie. Następnie moszcz fermentuje przy użyciu dzikich drożdży od 20 do 23 dni. W nosie aromaty przypominający dzikie jagody, morwę czy lukrecję. W tle nuty ściółki leśnej z odrobiną przypraw. W smaku wyrafinowane i eleganckie z ułożonymi taninami. Potencjał starzenia jest długi przynajmniej dwudziestoletni. Fantastycznym towarzyszem wina będzie stek z antrykotu czy cielęcina ze smardzami.',
      country: 'francja',
      color: 'czerwone',
      style: 'wytrawne, ciężkie',
      grapeVariety: 'pinot noir',
      region: 'burgundia, ac clos de vougeot grand cru',
      volume: '0.75L',
      alkohol: '14.5%',
      vintage: '2018',
      price: 1010,
    },
  ],
};
