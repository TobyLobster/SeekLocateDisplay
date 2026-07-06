/**
 * search-data.js — the search index for the demo site.
 *
 * This is the "data" the SeekLocateDisplay widget searches over. In a real
 * project you'd generate this from your pages (Inweb, a static-site build
 * step, a script, etc.); here it's just handwritten so the example is easy
 * to read and change.
 *
 * Shape of each page:
 *   {
 *     url:   'pages/varieties.html',   // link, relative to the search page
 *     title: 'Chocolate Varieties',    // shown as the result group header
 *     sections: [
 *       {
 *         id: 'dark',                   // MUST match an id="..." on that page,
 *                                       // so clicking the result jumps to it
 *         heading: 'Dark chocolate',    // shown as the result title
 *         text: 'First paragraph…\n'    // \n starts a new paragraph; matched
 *             + 'Second paragraph…'     // paragraphs are shown individually
 *       }
 *     ]
 *   }
 *
 * We hang it on window so any page can pass it straight to the widget.
 */
window.SLD_PAGES = [
  {
    url: 'pages/varieties.html',
    title: 'Chocolate Varieties',
    sections: [
      {
        id: 'dark',
        heading: 'Dark chocolate',
        text:
          'Dark chocolate is cocoa mass and cocoa butter with sugar and little '
        + 'or no milk. Bars are labelled by cocoa percentage, usually from about '
        + '50% up to 90% or more; the higher the number, the more bitter and less '
        + 'sweet the bar.\n'
        + 'Good dark chocolate carries tasting notes the way wine does: red fruit, '
        + 'roasted nuts, tobacco, or coffee, depending on the origin of the beans.'
      },
      {
        id: 'milk',
        heading: 'Milk chocolate',
        text:
          'Milk chocolate adds milk powder or condensed milk to the cocoa, which '
        + 'makes it sweeter, softer, and paler than dark chocolate. Most milk '
        + 'chocolate sits between roughly 20% and 40% cocoa.\n'
        + 'The milk both rounds off the bitterness and lowers the melting point, '
        + 'which is why milk chocolate feels creamier on the tongue.'
      },
      {
        id: 'white',
        heading: 'White chocolate',
        text:
          'White chocolate is made from cocoa butter, sugar, and milk, but no '
        + 'cocoa solids, which is why it is ivory rather than brown and tastes of '
        + 'cream and vanilla instead of cocoa.\n'
        + 'Because it has no cocoa solids, some purists argue it is not really '
        + 'chocolate at all, though it behaves like chocolate when melted.'
      },
      {
        id: 'ruby',
        heading: 'Ruby chocolate',
        text:
          'Ruby chocolate is the newest type, introduced in 2017. Its natural pink '
        + 'colour and tart, berry-like flavour come from specially processed ruby '
        + 'cocoa beans, with no berries or colouring added.\n'
        + 'It is often described as a fourth type alongside dark, milk, and white '
        + 'chocolate.'
      }
    ]
  },
  {
    url: 'pages/baking.html',
    title: 'Baking with Chocolate',
    sections: [
      {
        id: 'tempering',
        heading: 'Tempering',
        text:
          'Tempering is heating and cooling chocolate through set temperatures so '
        + 'the cocoa butter forms the right crystal structure. Well-tempered '
        + 'chocolate has a glossy surface and a firm snap, and it does not melt on '
        + 'your fingers at once.\n'
        + 'Untempered chocolate sets dull and streaky, with pale bloom on the '
        + 'surface — fine for baking into a batter, but not for coating.'
      },
      {
        id: 'ganache',
        heading: 'Ganache',
        text:
          'Ganache is nothing more than chocolate and hot cream stirred together '
        + 'until smooth. The ratio sets the texture: equal weights give a soft '
        + 'filling, more chocolate gives a firm truffle, more cream gives a pourable '
        + 'glaze.\n'
        + 'Dark chocolate makes the richest ganache; milk and white chocolate need '
        + 'a little less cream because they are softer to begin with.'
      },
      {
        id: 'brownies',
        heading: 'Brownies',
        text:
          'Brownies live on a scale from fudgy to cakey. More chocolate and butter '
        + 'and fewer eggs give a dense, fudgy bar; more flour and a beaten egg give '
        + 'a lighter, cake-like crumb.\n'
        + 'For the most chocolatey result, use both melted dark chocolate and cocoa '
        + 'powder. A handful of toasted walnuts or pecans folded in gives a brownie '
        + 'with nuts and a bit of crunch.'
      },
      {
        id: 'cookies',
        heading: 'Cookies',
        text:
          'For chocolate chip cookies, chilling the dough for an hour before baking '
        + 'deepens the flavour and stops the cookies spreading too thin.\n'
        + 'Chopped chocolate melts into streaks, while chips hold their shape. Add '
        + 'a cookie with nuts variation by folding in toasted hazelnuts or almonds.'
      }
    ]
  },
  {
    url: 'pages/history.html',
    title: 'A Short History of Chocolate',
    sections: [
      {
        id: 'origins',
        heading: 'Mesoamerican origins',
        text:
          'Cacao was first used in Mesoamerica thousands of years ago. The Maya and '
        + 'later the Aztecs ground the beans into a bitter, frothy drink, often '
        + 'flavoured with chilli and spices and served cold.\n'
        + 'The word chocolate is usually traced to xocolatl, and cacao beans were '
        + 'valuable enough to be used as money.'
      },
      {
        id: 'europe',
        heading: 'Arrival in Europe',
        text:
          'Spanish colonisers brought cacao back to Europe in the sixteenth '
        + 'century, where it was sweetened with sugar and warmed. For a long time '
        + 'chocolate was a fashionable, expensive drink for the wealthy.\n'
        + 'Chocolate houses opened in cities such as London and became lively places '
        + 'to meet, talk, and do business.'
      },
      {
        id: 'industrial',
        heading: 'The industrial bar',
        text:
          'In the nineteenth century, new machines turned chocolate from a drink '
        + 'into a bar. A press for removing cocoa butter, the first moulded eating '
        + 'bar, and conching to make chocolate smooth all arrived within a few '
        + 'decades.\n'
        + 'Adding milk powder produced the first solid milk chocolate, and the '
        + 'sweet, cheap bar we know today became possible.'
      }
    ]
  }
];
