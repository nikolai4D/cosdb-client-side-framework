export async function transformer_groupByFirstLetter(strings) {

        let awaitedStrings =  strings;
        console.log(awaitedStrings)
        const grouped = awaitedStrings.reduce((acc, str) => {
          const firstLetter = str[0].toUpperCase();
          if (!acc[firstLetter]) {
            acc[firstLetter] = [];
          }
          acc[firstLetter].push(str);
          return acc;
        }, {});
      
        const sortedGrouped = Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b, "sv"))
          .map(([letter, title]) => ({ letter, title }));
      
        return sortedGrouped;
  
}