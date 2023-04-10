export async function transformer_groupByFirstLetter(objectsArray) {
  const grouped = objectsArray.reduce((acc, obj) => {
    const firstLetter = obj.title[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(obj);
    return acc;
  }, {});

  const sortedGrouped = [];

  for (const [key, items] of Object.entries(grouped)) {
    const sortedItems = items.sort((a, b) =>
      a.title.localeCompare(b.title, "sv")
    );
    sortedGrouped.push({ header: key, content: sortedItems });
  }

  sortedGrouped.sort((a, b) => a.header.localeCompare(b.header, "sv"));
  return sortedGrouped;
}
