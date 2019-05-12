import Database from './db'

const db = new Database();

const store = db.insertOrUpdateRecipe({
  name: "Salade césar gourmet",
  duration: 1800,
  ingredients: [
    {
      label: "Filet de poulet",
      quantity: "2 unité(s)"
    },
    {
      label: "Lard",
      quantity: "6 tranche(s)"
    },
    {
      label: "Haricots verts",
      quantity: "200 g"
    },
    {
      label: "Œuf de poule élevée en plein air",
      quantity: "2 unité(s)"
    },
    {
      label: "Gousse d'ail",
      quantity: "1 unité(s)"
    },
    {
      label: "Anchois",
      quantity: "1 boîte(s)"
    },
    {
      label: "Citron jaune",
      quantity: "1 unité(s)"
    },
    {
      label: "Mayonnaise",
      quantity: "100 g"
    },
    {
      label: "Ciabatta blanche",
      quantity: "1 unité(s)"
    },
    {
      label: "Salade romaine",
      quantity: "1 unité(s)"
    },
    {
      label: "Parmigiano reggiano",
      quantity: "20 g"
    }
  ],
  portions: 22,
  imageUrl: "https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_1200/v1/hellofresh_s3/image/5ccc39a59183cd001420fb8b-113ffe79.jpg",
  categories: [
    "Archive de recettes"
  ],
  calories: 1012,
  url: "https://www.hellofresh.fr/recipes/luxe-caesarsalade-met-kip-5ccc39a59183cd001420fb8b?locale=fr-FR"
})

store.then((data) => {
  console.log('Finished', data.rows);
})