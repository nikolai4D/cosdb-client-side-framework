export async function transformer_groupByFirstLetter(theArray) {

        const grouped = theArray.reduce((acc, str) => {
          const firstLetter = str.title[0].toUpperCase();
          if (!acc[firstLetter]) {
            acc[firstLetter] = [];
          }
          acc[firstLetter].push(str);
          return acc;
        }, {});
        console.log(grouped)

        console.log(JSON.stringify(grouped))

        // const flattenedGrouped = Object.values(grouped).flat();

        // const sortedGrouped = flattenedGrouped
        //   .sort((a, b) => a.title.localeCompare(b.title, "sv"));

        // return sortedGrouped;


      
        // const sortedGrouped = Object.entries(grouped)
        //   .sort(([a], [b]) => a.localeCompare(b, "sv"))
        //   .map(([letter, title]) => ({ letter, title }));
        

        // return sortedGrouped;

          const sortedGrouped = {};

        for (const [key, items] of Object.entries(grouped)) {
          sortedGrouped[key] = items.sort((a, b) => a.title.localeCompare(b.title, "sv"));
        }

        console.log(sortedGrouped);

        return sortedGrouped;
  
}

const grouped = theArray.reduce((acc, str) => {
  const firstLetter = str.title[0].toUpperCase();
  if (!acc[firstLetter]) {
    acc[firstLetter] = [];
  }
  acc[firstLetter].push(str);
  return acc;
}, {});