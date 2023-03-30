export async function html2dom(strings, ...valuesIn) {
  const values = valuesIn.flat();

  console.log("values: ", values);
  const container = document.createElement("div");
  const placeholders = [];

  let interpolatedHTML = "";

  for (const [index, string] of strings.entries()) {
    interpolatedHTML += string;

    if (values[index] !== undefined) {
      const placeholderId = `placeholder-${index}`;
      placeholders.push(placeholderId);
      interpolatedHTML += `<!--${placeholderId}-->`;
    }
  }
  console.log("placeholders: ", placeholders);

  container.innerHTML = interpolatedHTML;

  for (const [index, placeholderId] of placeholders.entries()) {
    const commentNode = findCommentNode(container, placeholderId);
    if (commentNode) {
      if (values[index] instanceof HTMLElement) {
        commentNode.parentNode.replaceChild(values[index], commentNode);
      } else {
        const textNode = document.createTextNode(values[index]);
        commentNode.parentNode.replaceChild(textNode, commentNode);
      }
    }
  }

  // Return the only child element when there's one child, otherwise return the wrapper element
  return container.children.length === 1 ? container.children[0] : container;
}

function findCommentNode(element, commentText) {
  for (const node of element.childNodes) {
    if (
      node.nodeType === Node.COMMENT_NODE &&
      node.textContent.trim() === commentText
    ) {
      return node;
    }

    if (node.childNodes.length > 0) {
      const result = findCommentNode(node, commentText);
      if (result) return result;
    }
  }

  return null;
}
