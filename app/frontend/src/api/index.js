const API_URL = 'https://recipe-hub-app.herokuapp.com/api'

const fetchApi = async (query, options) => {
  const res = await fetch(API_URL + query, options)
  return await res.json()
}

const get = fetchApi
const post = (query, options) =>
  fetchApi(query, {
    ...options,
    method: 'POST',
  })

export const getRecipesXXX = () =>
  Promise.resolve([
    {
      id: 200,
      name: 'Perfect Porterhouse Steak',
      duration: 0,
      ingredients: [
        {
          label: '2&rdquo;-thick Porterhouse steak, trimmed (about 2 lb.)',
          quantity: null,
        },
        { label: 'vegetable oil', quantity: null },
        {
          label: 'Kosher salt and freshly ground black pepper',
          quantity: null,
        },
        { label: 'unsalted butter, room temperature', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad5452f1c801a1038bcb97/16:11/w_400,h_300,c_limit/perfect-porterhouse-steak.jpg',
      url: 'https://bonappetit.com/recipe/perfect-porterhouse-steak',
      created: '2019-06-03T20:22:23.829Z',
      updated: '2019-06-03T20:22:23.829Z',
      categories: 'Beef,Bobby Flay,Steak,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 199,
      name: 'Mushroom Paella with Kale and Eggs',
      duration: 0,
      ingredients: [
        { label: 'dried porcini mushrooms', quantity: null },
        { label: 'olive oil', quantity: null },
        { label: 'large onion, chopped', quantity: null },
        { label: 'carrot, peeled, chopped', quantity: null },
        { label: 'celery stalk, chopped', quantity: null },
        { label: 'crimini mushrooms, coarsely chopped', quantity: null },
        { label: 'sprigs fresh flat-leaf parsley', quantity: null },
        { label: 'sprigs fresh thyme', quantity: null },
        { label: 'black peppercorns', quantity: null },
        { label: 'kosher salt', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad5445f1c801a1038bcb96/16:11/w_400,h_300,c_limit/mushroom-paella-with-kale-and-eggs.jpg',
      url: 'https://bonappetit.com/recipe/mushroom-paella-with-kale-and-eggs',
      created: '2019-06-03T20:22:23.817Z',
      updated: '2019-06-03T20:22:23.817Z',
      categories:
        'Bobby Flay,Brunch,Chile,Egg,Kale,Mushroom,Parlsey,Peppercorn,Spanish,White Wine,Dinner,Thyme,Vegetarian,Healthyish',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 198,
      name: 'Sunday Sauce with Sausage and Braciole',
      duration: 0,
      ingredients: [
        { label: 'fresh breadcrumbs', quantity: null },
        { label: 'finely grated Pecorino', quantity: null },
        { label: 'finely chopped fresh flat-leaf parsley', quantity: null },
        { label: 'crushed red pepper flakes', quantity: null },
        { label: 'hot smoked Spanish paprika', quantity: null },
        { label: 'garlic cloves, finely chopped, divided', quantity: null },
        { label: 'olive oil, divided', quantity: null },
        {
          label: 'beef top round, thinly sliced by a butcher for braciole',
          quantity: null,
        },
        {
          label: 'Kosher salt and freshly ground black pepper',
          quantity: null,
        },
        {
          label: 'hot or sweet Italian sausage, halved crosswise',
          quantity: null,
        },
        {
          label:
            'baby back pork ribs, cut into 3- to 4-rib pieces, or pork spare ribs, cut into individual ribs',
          quantity: null,
        },
        { label: 'large onion, finely chopped', quantity: null },
        { label: 'anchovy fillets packed in oil, drained', quantity: null },
        { label: 'tomato paste', quantity: null },
        { label: '28-ounce cans crushed tomatoes', quantity: null },
        { label: '28-ounce cans whole peeled tomatoes', quantity: null },
        {
          label: 'large tubular pasta (such as rigatoni or tortiglioni)',
          quantity: null,
        },
      ],
      portions: 8,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad5402f1c801a1038bcb92/16:11/w_400,h_300,c_limit/sunday-sauce-with-sausage-and-braciole.jpg',
      url:
        'https://bonappetit.com/recipe/sunday-sauce-with-sausage-and-braciole',
      created: '2019-06-03T20:22:23.810Z',
      updated: '2019-06-03T20:22:23.810Z',
      categories:
        'Anchovy,Beef,Breadcrumbs,Italian,Paprika,Pasta,Sauce,Tomato,Dinner,Pork',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 197,
      name: 'Bistro Steak with Buttermilk Onion Rings',
      duration: 0,
      ingredients: [
        { label: 'hazelnut, walnut, or olive oil', quantity: null },
        { label: 'Sherry vinegar, divided', quantity: null },
        {
          label: 'Kosher salt and freshly ground black pepper',
          quantity: null,
        },
        { label: 'vegetable oil', quantity: null },
        {
          label:
            'hanger steak, center membrane removed, cut into 4 equal pieces',
          quantity: null,
        },
        { label: 'unsalted butter', quantity: null },
        { label: 'medium shallot, finely chopped', quantity: null },
        { label: 'finely chopped fresh thyme', quantity: null },
        { label: 'black peppercorns, coarsely chopped', quantity: null },
        { label: 'dry green peppercorns, coarsely chopped', quantity: null },
        { label: 'Dijon mustard', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad53ebf1c801a1038bcb91/16:11/w_400,h_300,c_limit/bistro-steak-with-buttermilk-onion-rings.jpg',
      url:
        'https://bonappetit.com/recipe/bistro-steak-with-buttermilk-onion-rings',
      created: '2019-06-03T20:22:23.803Z',
      updated: '2019-06-03T20:22:23.803Z',
      categories:
        'Beef,Buttermilk,French,Mustard,Peppercorn,Steak,Dinner,Thyme',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 196,
      name: 'Herbed Faux-tisserie Chicken and Potatoes',
      duration: 0,
      ingredients: [
        { label: 'fennel seeds', quantity: null },
        { label: 'crushed red pepper flakes', quantity: null },
        {
          label: 'finely chopped fresh marjoram; plus 4 sprigs, divided',
          quantity: null,
        },
        {
          label: 'finely chopped fresh thyme; plus 4 sprigs, divided',
          quantity: null,
        },
        { label: 'kosher salt, plus more', quantity: null },
        { label: 'freshly ground black pepper, plus more', quantity: null },
        { label: 'olive oil, divided', quantity: null },
        { label: '3½–4 pound chicken', quantity: null },
        { label: 'lemon, quartered', quantity: null },
        { label: 'head of garlic, halved crosswise', quantity: null },
        {
          label: 'Yukon Gold potatoes, scrubbed, halved, or quartered if large',
          quantity: null,
        },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad53dcf1c801a1038bcb8f/16:11/w_400,h_300,c_limit/herbed-faux-tisserie-chicken-and-potatoes.jpg',
      url:
        'https://bonappetit.com/recipe/herbed-faux-tisserie-chicken-and-potatoes',
      created: '2019-06-03T20:22:23.786Z',
      updated: '2019-06-03T20:22:23.786Z',
      categories:
        'Fennel,French,Hot Pepper,Lemon,Marjoram,Potato,Chicken Recipes,Dinner,Thyme',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 195,
      name: 'Slow-Roasted Pork Shoulder with Mustard and Sage',
      duration: 0,
      ingredients: [
        {
          label: 'skinless, bone-in pork shoulder (Boston butt; 5–6 lb.)',
          quantity: null,
        },
        {
          label: 'Kosher salt and freshly ground black pepper',
          quantity: null,
        },
        { label: 'Dijon mustard', quantity: null },
        { label: 'finely chopped fresh sage', quantity: null },
        { label: 'finely chopped fresh marjoram', quantity: null },
        { label: 'garlic finely chopped', quantity: null },
      ],
      portions: 8,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad53cd53e63daf11a4de03/16:11/w_400,h_300,c_limit/slow-roasted-pork-shoulder-with-mustard-and-sage.jpg',
      url:
        'https://bonappetit.com/recipe/slow-roasted-pork-shoulder-with-mustard-and-sage',
      created: '2019-06-03T20:22:23.777Z',
      updated: '2019-06-03T20:22:23.777Z',
      categories: 'Fall,Marjoram,Mustard,Sage,Winter,Dinner,Pork,Pork Shoulder',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 194,
      name: 'Spicy Kimchi Tofu Stew',
      duration: 0,
      ingredients: [
        { label: 'Kosher salt', quantity: null },
        {
          label: '16-oz. package silken tofu, cut into 1&rdquo; pieces',
          quantity: null,
        },
        { label: 'vegetable oil', quantity: null },
        {
          label: 'gently squeezed cabbage kimchi, chopped, plus 1 cup liquid',
          quantity: null,
        },
        { label: 'gochujang (Korean hot pepper paste)', quantity: null },
        { label: 'scallions, cut into 1&rdquo; pieces', quantity: null },
        { label: 'reduced-sodium soy sauce', quantity: null },
        { label: 'toasted sesame oil', quantity: null },
        { label: 'Freshly ground black pepper', quantity: null },
        { label: 'large egg yolks', quantity: null },
        { label: 'toasted sesame seeds', quantity: null },
      ],
      portions: 6,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad09e5f1c801a1038bc995/16:11/w_400,h_300,c_limit/spicy-kimchi-tofu-stew.jpg',
      url: 'https://bonappetit.com/recipe/spicy-kimchi-tofu-stew',
      created: '2019-06-03T20:22:23.769Z',
      updated: '2019-06-03T20:22:23.769Z',
      categories:
        'Cabbage,Kimchi,korean,Green Onion Scallion,Sesame Seed,Spicy,Stew,Tofu,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 193,
      name: 'Corned Beef Hash',
      duration: 25200,
      ingredients: [
        {
          label:
            'uncooked corned beef brisket (about 1 small), rinsed, trimmed if fatty, spice packet discarded if included',
          quantity: null,
        },
        { label: 'sprigs flat-leaf parsley', quantity: null },
        { label: 'bay leaves, torn', quantity: null },
        { label: 'black peppercorns', quantity: null },
        { label: 'coriander seeds', quantity: null },
        { label: 'yellow mustard seeds', quantity: null },
        { label: 'medium onion, peeled, halved through root', quantity: null },
        {
          label: 'large russet potato, peeled, halved crosswise',
          quantity: null,
        },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad53bff1c801a1038bcb8d/16:11/w_400,h_300,c_limit/corned-beef-hash.jpg',
      url: 'https://bonappetit.com/recipe/corned-beef-hash-2',
      created: '2019-06-03T20:22:23.763Z',
      updated: '2019-06-03T20:22:23.763Z',
      categories:
        'Beef,Breakfast,Brisket,Brunch,Chive,Corned Beef,Egg,hash,Irish,Mustard,Parlsey,Peppercorn,Potato,Seasonal Cooks,St. Patricks Day,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 192,
      name: 'Massaman Chicken',
      duration: 882000,
      ingredients: [
        { label: 'vegetable oil', quantity: null },
        { label: '4–4½-lb. chicken, cut into 10 pieces', quantity: null },
        { label: 'Kosher salt', quantity: null },
        {
          label: 'medium Yukon Gold potatoes (about 1½ lb.), quartered',
          quantity: null,
        },
        { label: 'medium red onions, cut into wedges', quantity: null },
        { label: 'Massaman Curry Paste (click for recipe)', quantity: null },
        { label: 'oz. Belgian-style wheat beer', quantity: null },
        { label: '13.5-oz. cans unsweetened coconut milk', quantity: null },
        { label: 'low-sodium chicken broth', quantity: null },
        { label: 'fish sauce (such as nam pla or nuoc nam)', quantity: null },
        { label: 'fresh lime juice', quantity: null },
        { label: 'palm or light brown sugar', quantity: null },
        { label: 'red chile powder', quantity: null },
        { label: 'Freshly ground black pepper', quantity: null },
        {
          label:
            'Cilantro sprigs, fried shallots, and cooked rice (for serving)',
          quantity: null,
        },
      ],
      portions: 8,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad53961b3340441497560d/16:11/w_400,h_300,c_limit/massaman-chicken.jpg',
      url: 'https://bonappetit.com/recipe/massaman-chicken',
      created: '2019-06-03T20:22:23.756Z',
      updated: '2019-06-03T20:22:23.756Z',
      categories:
        'Chile,Coconut Milk,Curry,Fish Sauce,Potato,Spicy,Thai,Beer,Chicken Recipes,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 191,
      name: 'Bacon and Scallion Farrotto',
      duration: 3600,
      ingredients: [
        { label: 'low-sodium chicken broth', quantity: null },
        { label: 'olive oil', quantity: null },
        {
          label: 'oz. bacon (about 6 slices), cut into ¼&rdquo; pieces',
          quantity: null,
        },
        {
          label:
            'bunches scallions, green and white parts separated, thinly sliced',
          quantity: null,
        },
        { label: 'semi-pearled farro', quantity: null },
        { label: 'dry white wine', quantity: null },
        { label: 'fresh lemon juice', quantity: null },
        { label: 'grated Parmesan, plus shaved for serving', quantity: null },
        {
          label: 'Kosher salt and freshly ground black pepper',
          quantity: null,
        },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad536bf1c801a1038bcb8a/16:11/w_400,h_300,c_limit/bacon-and-scallion-farroto.jpg',
      url: 'https://bonappetit.com/recipe/bacon-and-scallion-farroto',
      created: '2019-06-03T20:22:23.747Z',
      updated: '2019-06-03T20:22:23.747Z',
      categories:
        'Bacon,Farro,Fast Easy Fresh,Quick,Green Onion Scallion,White Wine,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 190,
      name: 'Lamb Stir-Fry with Pomegranate and Yogurt',
      duration: 126000,
      ingredients: [
        { label: 'cumin seeds', quantity: null },
        { label: 'coriander seeds', quantity: null },
        {
          label: 'boneless leg of lamb, thinly sliced against the grain',
          quantity: null,
        },
        { label: 'paprika', quantity: null },
        { label: 'garlic finely chopped', quantity: null },
        { label: 'red wine vinegar', quantity: null },
        { label: 'olive oil, divided', quantity: null },
        {
          label: 'Kosher salt and freshly ground black pepper',
          quantity: null,
        },
        { label: 'plain Greek yogurt', quantity: null },
        { label: 'medium red onion, cut into ½&rdquo; wedges', quantity: null },
        { label: 'Cooked rice (for serving)', quantity: null },
        { label: 'pomegranate seeds', quantity: null },
        { label: 'chopped pistachios', quantity: null },
        {
          label: 'Fresh oregano, mint, and/or cilantro leaves (for serving)',
          quantity: null,
        },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad53461b3340441497560c/16:11/w_400,h_300,c_limit/lamb-stir-fry-with-pomegranate-and-yogurt.jpg',
      url:
        'https://bonappetit.com/recipe/lamb-stir-fry-with-pomegranate-and-yogurt',
      created: '2019-06-03T20:22:23.741Z',
      updated: '2019-06-03T20:22:23.741Z',
      categories:
        'Coriander,Cumin,Fast Easy Fresh,Paprika,Pistachio,Quick,Yogurt,Dinner,Lamb',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 189,
      name: 'Turkey-Spinach Meatballs',
      duration: 0,
      ingredients: [
        { label: 'olive oil', quantity: null },
        { label: 'small onion, chopped', quantity: null },
        { label: 'garlic finely chopped', quantity: null },
        { label: 'dried oregano', quantity: null },
        { label: 'crushed red pepper flakes', quantity: null },
        {
          label: 'Kosher salt and freshly ground black pepper',
          quantity: null,
        },
        { label: 'tomato paste', quantity: null },
        { label: '28-oz. can whole peeled tomatoes', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad531c1b3340441497560a/16:11/w_400,h_300,c_limit/turkey-spinach-meatballs.jpg',
      url: 'https://bonappetit.com/recipe/turkey-spinach-meatballs',
      created: '2019-06-03T20:22:23.732Z',
      updated: '2019-06-03T20:22:23.732Z',
      categories:
        'Feeding A Family,Fennel,Kid-Friendly,Meatball,Oregano,Parmesan,Spinach,Turkey,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 188,
      name: 'Chicken with Turnip and Pear',
      duration: 162000,
      ingredients: [
        { label: 'olive oil, divided', quantity: null },
        { label: 'skin-on, bone-in chicken thighs', quantity: null },
        { label: 'Kosher salt, freshly ground pepper', quantity: null },
        { label: 'large onion, thinly sliced', quantity: null },
        { label: 'medium pear, peeled, cored, chopped', quantity: null },
        { label: 'medium turnip, peeled, chopped', quantity: null },
        { label: 'garlic cloves, finely chopped', quantity: null },
        { label: 'dry white wine', quantity: null },
        { label: 'fresh thyme leaves, plus more for serving', quantity: null },
        { label: 'salted, roasted macadamia nuts, chopped', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad525ef1c801a1038bcb7d/16:11/w_400,h_300,c_limit/chicken-thighs-with-turnip-and-pear.jpg',
      url: 'https://bonappetit.com/recipe/chicken-thighs-turnip-pear',
      created: '2019-06-03T20:22:23.722Z',
      updated: '2019-06-03T20:22:23.722Z',
      categories:
        'macadamia nut,Nut,Web Recipe,White Wine,Chicken Recipes,Dinner,Healthy,Thyme',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 187,
      name: 'Carrot-Coconut Soup with Harissa and Crispy Leeks',
      duration: 144000,
      ingredients: [
        { label: 'coconut oil', quantity: null },
        { label: 'carrots, peeled, chopped', quantity: null },
        { label: 'apple, peeled, cored, and chopped', quantity: null },
        { label: 'large onion, chopped', quantity: null },
        {
          label:
            'medium leeks, white and pale-green parts only, 1 chopped, 1 thinly sliced',
          quantity: null,
        },
        { label: 'garlic cloves, chopped', quantity: null },
        { label: 'finely grated peeled ginger', quantity: null },
        { label: 'Kosher salt, freshly ground pepper', quantity: null },
        { label: 'low-sodium vegetable or chicken broth', quantity: null },
        { label: '13.5-oz. can unsweetened coconut milk', quantity: null },
        { label: 'Harissa sauce (for serving; optional)', quantity: null },
      ],
      portions: 8,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad525053e63daf11a4ddf7/16:11/w_400,h_300,c_limit/coconut-carrot-soup-with-leeks.jpg',
      url: 'https://bonappetit.com/recipe/coconut-carrot-soup-leeks',
      created: '2019-06-03T20:22:23.711Z',
      updated: '2019-06-03T20:22:23.711Z',
      categories:
        'macadamia nut,Nut,Web Recipe,White Wine,Chicken Recipes,Dinner,Healthy,Thyme',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 186,
      name: 'Pork Tenderloin with Kale and Kimchi',
      duration: 0,
      ingredients: [
        { label: 'pork tenderloin (about 1 ½ lb.)', quantity: null },
        { label: 'Kosher salt and freshly ground pepper', quantity: null },
        { label: 'vegetable oil', quantity: null },
        {
          label:
            'small bunch kale, ribs and stems removed, leaves coarsely chopped (about 3 ½ cups)',
          quantity: null,
        },
        { label: 'chopped kimchi', quantity: null },
        { label: 'reduced-sodium soy sauce', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad51381b334044149755ef/16:11/w_400,h_300,c_limit/Pork Tenderloin with Kale and Kimchi - Yossy Arefi-3.jpg',
      url: 'https://bonappetit.com/recipe/pork-tenderloin-kale-kimchi',
      created: '2019-06-03T20:22:23.704Z',
      updated: '2019-06-03T20:22:23.704Z',
      categories: 'Kale,Kimchi,Soy Sauce,Dinner,Healthy,Pork',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 185,
      name: 'Ginger-Chicken Meatballs with Chinese Broccoli',
      duration: 0,
      ingredients: [
        { label: 'garlic clove, finely grated', quantity: null },
        { label: 'ground chicken', quantity: null },
        { label: 'reduced-sodium soy sauce', quantity: null },
        { label: 'finely grated ginger', quantity: null },
        {
          label: 'scallions, thinly sliced, plus more for serving',
          quantity: null,
        },
        { label: 'low-sodium chicken broth, divided', quantity: null },
        { label: 'vegetable oil', quantity: null },
        { label: 'bunch Chinese broccoli, chopped', quantity: null },
        { label: 'crushed red pepper flakes', quantity: null },
        { label: 'Kosher salt, freshly ground pepper', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad511a53e63daf11a4dde9/16:11/w_400,h_300,c_limit/Ginger-Chicken-Meatballs-with-Chinese-Broccoli.jpg',
      url:
        'https://bonappetit.com/recipe/ginger-chicken-meatballs-chinese-broccoli',
      created: '2019-06-03T20:22:23.694Z',
      updated: '2019-06-03T20:22:23.694Z',
      categories:
        'Broccoli,Ginger,Hot Pepper,Meatball,Green Onion Scallion,Soy Sauce,Chicken Recipes,Dinner,Healthy',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 184,
      name: 'Honey-Vinegar Leg of Lamb with Fennel and Carrots',
      duration: 0,
      ingredients: [
        { label: 'garlic cloves, chopped', quantity: null },
        { label: 'fresh flat-leaf parsley leaves', quantity: null },
        { label: 'fennel seeds, crushed', quantity: null },
        { label: 'fennel fronds plus more for serving', quantity: null },
        { label: 'olive oil, divided', quantity: null },
        {
          label: 'Kosher salt and freshly ground black pepper',
          quantity: null,
        },
        { label: '7–9 lb. bone-in leg of lamb, tied', quantity: null },
        { label: 'red wine vinegar', quantity: null },
        { label: 'honey', quantity: null },
        { label: 'fennel bulbs, sliced ½&rdquo; thick', quantity: null },
        {
          label:
            'small carrots (about 2 lb.), unpeeled, halved lengthwise if large',
          quantity: null,
        },
      ],
      portions: 12,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad50f8f1c801a1038bcb67/16:11/w_400,h_300,c_limit/honey-vinegar-leg-of-lamb-with-fennel-and-carrots.jpg',
      url:
        'https://bonappetit.com/recipe/honey-vinegar-leg-of-lamb-with-fennel-and-carrots',
      created: '2019-06-03T20:22:23.684Z',
      updated: '2019-06-03T20:22:23.684Z',
      categories:
        'Carrot,Party,Fall,Fennel,honey,Make Ahead,Parlsey,Winter,Dinner,Lamb',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 183,
      name: 'Pickled Beef Tostadas with Tomatillo Salsa',
      duration: 0,
      ingredients: [
        { label: 'large tomatillos, husked, coarsely chopped', quantity: null },
        {
          label: 'serrano chile, seeds removed if desired, chopped',
          quantity: null,
        },
        { label: 'avocado, finely chopped', quantity: null },
        { label: 'Kosher salt', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad50b5f1c801a1038bcb66/16:11/w_400,h_300,c_limit/pickled-beef-tostadas-with-tomatillo-salsa.jpg',
      url:
        'https://bonappetit.com/recipe/pickled-beef-tostadas-with-tomatillo-salsa',
      created: '2019-06-03T20:22:23.674Z',
      updated: '2019-06-03T20:22:23.674Z',
      categories:
        'Beef,Brisket,Cilantro,Fish Sauce,Lime,Mexican,pickle,Taco,Tomatillo,cook like a pro,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 182,
      name: 'Herb-Crusted Rack of Lamb with New Potatoes',
      duration: 0,
      ingredients: [
        { label: 'small new or Yukon Gold potatoes, scrubbed', quantity: null },
        { label: 'Kosher salt', quantity: null },
        { label: 'racks of lamb (about 2 lb. total)', quantity: null },
        { label: 'Freshly ground black pepper', quantity: null },
        { label: 'olive oil, divided', quantity: null },
        { label: 'garlic cloves, chopped', quantity: null },
        { label: 'chopped fresh flat-leaf parsley', quantity: null },
        { label: 'chopped fresh dill', quantity: null },
        { label: 'Dijon mustard', quantity: null },
        { label: 'cumin seeds, crushed', quantity: null },
        { label: 'watercress leaves with tender stems', quantity: null },
        { label: 'Sherry vinegar', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad50c31b334044149755e7/16:11/w_400,h_300,c_limit/herb-crusted-rack-of-lamb-with-new-potatoes.jpg',
      url:
        'https://bonappetit.com/recipe/herb-crusted-rack-of-lamb-with-new-potatoes',
      created: '2019-06-03T20:22:23.668Z',
      updated: '2019-06-03T20:22:23.668Z',
      categories: 'Dill,Mustard,Potato,Spring,Watercress,Dinner,Lamb',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 181,
      name: 'Swiss Chard and Mushroom Galette',
      duration: 1224000,
      ingredients: [
        { label: 'all-purpose flour', quantity: null },
        { label: 'whole wheat flour', quantity: null },
        { label: 'kosher salt', quantity: null },
        {
          label: '(1½ sticks) chilled unsalted butter, cut into pieces',
          quantity: null,
        },
        { label: 'apple cider vinegar', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/5c0848070c552b2d4ec35d31/16:11/w_400,h_300,c_limit/.jpg',
      url: 'https://bonappetit.com/recipe/swiss-chard-and-mushroom-galette',
      created: '2019-06-03T20:22:23.658Z',
      updated: '2019-06-03T20:22:23.658Z',
      categories:
        'Fast Easy Fresh,Lunch,Mushroom,Parlsey,Ricotta,Snack,chard,Whole Wheat,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 180,
      name: 'Roast Pork Tenderloin with Carrot Romesco',
      duration: 3600,
      ingredients: [
        { label: 'pine nuts', quantity: null },
        {
          label: 'small carrots, peeled, halved lengthwise if larger',
          quantity: null,
        },
        { label: 'olive oil, divided', quantity: null },
        {
          label: 'Kosher salt and freshly ground black pepper',
          quantity: null,
        },
        { label: 'large pork tenderloin (about 1½ lb.)', quantity: null },
        { label: 'small garlic clove, finely grated', quantity: null },
        {
          label: 'Aleppo pepper or ½ tsp. crushed red pepper flakes',
          quantity: null,
        },
        { label: 'red wine vinegar, divided', quantity: null },
        {
          label: 'spicy greens (such as watercress or baby mustard)',
          quantity: null,
        },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad509bf1c801a1038bcb65/16:11/w_400,h_300,c_limit/roast-pork-tenderloin-with-carrot-romesco.jpg',
      url:
        'https://bonappetit.com/recipe/roast-pork-tenderloin-with-carrot-romesco',
      created: '2019-06-03T20:22:23.644Z',
      updated: '2019-06-03T20:22:23.644Z',
      categories:
        'Carrot,Fast Easy Fresh,Hot Pepper,Mustard Greens,Quick,Watercress,Dinner,Pork',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 179,
      name: 'Campanelle with Eggs and Capers',
      duration: 0,
      ingredients: [
        { label: 'campanelle (or other short pasta)', quantity: null },
        { label: 'olive oil', quantity: null },
        { label: 'anchovy fillets', quantity: null },
        { label: 'finely chopped garlic cloves', quantity: null },
        { label: 'capers', quantity: null },
        { label: 'crushed red pepper flakes', quantity: null },
        { label: 'finely grated Parmesan', quantity: null },
        { label: 'fresh lemon juice', quantity: null },
        { label: 'coarsely grated hard-boiled large eggs', quantity: null },
        { label: 'fresh flat-leaf parsley leaves', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad50661b334044149755e0/16:11/w_400,h_300,c_limit/campanelle-with-eggs-and-capers.jpg',
      url: 'https://bonappetit.com/recipe/campanelle-with-eggs-and-capers',
      created: '2019-06-03T20:22:23.634Z',
      updated: '2019-06-03T20:22:23.634Z',
      categories: 'Anchovy,Capers,Egg,Hot Pepper,Pasta,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 178,
      name: 'Grilled Hanger Steak with Cucumber Salad',
      duration: 0,
      ingredients: [
        {
          label:
            '2&rdquo; piece lemongrass, tough outer layers removed, lightly smashed, very thinly sliced',
          quantity: null,
        },
        { label: '(packed) light brown sugar', quantity: null },
        { label: 'fish sauce (such as nam pla or nuoc nam)', quantity: null },
        { label: 'Asian sweet chili sauce', quantity: null },
        {
          label: 'hanger steak, center membrane removed, cut into 4 pieces',
          quantity: null,
        },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad50391b334044149755dc/16:11/w_400,h_300,c_limit/grilled-hanger-steak-with-cucumber-salad.jpg',
      url:
        'https://bonappetit.com/recipe/grilled-hanger-steak-with-cucumber-salad',
      created: '2019-06-03T20:22:23.623Z',
      updated: '2019-06-03T20:22:23.623Z',
      categories:
        'Beef,Cucumber,Fish Sauce,Grill Barbecue,Lemongrass,RSVP,Steak,Dinner',
      liked: false,
      excluded: false,
      saved: false,
    },
    {
      id: 177,
      name: 'Ricotta Gnocchi with Asparagus, Peas, and Morels',
      duration: 0,
      ingredients: [
        { label: 'ricotta (from two 16-oz. containers)', quantity: null },
        { label: 'large eggs', quantity: null },
        { label: 'finely grated Parmesan', quantity: null },
        { label: 'kosher salt', quantity: null },
        { label: 'Freshly ground black pepper', quantity: null },
        { label: 'all-purpose flour', quantity: null },
      ],
      portions: 4,
      imageurl:
        'https://assets.bonappetit.com/photos/57ad4f4d53e63daf11a4ddd0/16:11/w_400,h_300,c_limit/ricotta-gnocchi-with-asparagus-peas-and-morels.jpg',
      url:
        'https://bonappetit.com/recipe/ricotta-gnocchi-with-asparagus-peas-and-morels',
      created: '2019-06-03T20:22:23.612Z',
      updated: '2019-06-03T20:22:23.612Z',
      categories:
        'Asparagus,Chive,Parmesan,Pasta,Pea,Ricotta,Spring,Dinner,Vegetarian',
      liked: false,
      excluded: false,
      saved: false,
    },
  ])
export const getSavedRecipesXXX = () => Promise.resolve([])

export const getRecipes = (keyword = '', offset = 0) =>
  get(`/recipes?keywords=${keyword}&offset=${offset}`)
export const getSavedRecipes = () => get('/recipes/saved')
export const saveRecipe = (id) => post(`/recipes/${id}/save`)
export const unsaveRecipe = (id) => post(`/recipes/${id}/unsave`)
export const likeRecipe = (id) => post(`/recipes/${id}/like`)
export const unlikeRecipe = (id) => post(`/recipes/${id}/unlike`)
export const excludeRecipe = (id) => post(`/recipes/${id}/exclude`)

export const OFFSET = 24
