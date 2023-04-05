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
      
        const sortedGrouped = Object.entries(grouped)
          .sort(([a], [b]) => a.title.localeCompare(b.title, "sv"))
          .map(([letter, title]) => ({ letter, title }));
      
        return sortedGrouped;
  
}