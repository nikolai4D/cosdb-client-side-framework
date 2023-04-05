export async function transformer_groupByFirstLetter(theArray) {

        const grouped = theArray.reduce((acc, str) => {
          const firstLetter = str.title[0].toUpperCase();
          if (!acc[firstLetter]) {
            acc[firstLetter] = [];
          }
          acc[firstLetter].push(str);
          return acc;
        }, {});

        const sortedGrouped = [];

        for (const [key, items] of Object.entries(grouped)) {
          const sortedItems = items.sort((a, b) => a.title.localeCompare(b.title, "sv"));
          sortedGrouped.push({ letter: key, title: sortedItems });
        }
        
        console.log(sortedGrouped)
        return sortedGrouped;        
  
}

