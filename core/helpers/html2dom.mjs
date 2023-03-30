// export async function html2dom(strings, ...values) {
//   const container = document.createElement("div");
//   const placeholders = [];

//   let interpolatedHTML = "";

//   for (const [index, string] of strings.entries()) {
//     interpolatedHTML += string;

//     if (values[index] !== undefined) {
//       const placeholderId = `placeholder-${index}`;
//       placeholders.push(placeholderId);
//       interpolatedHTML += `<!--${placeholderId}-->`;
//     }
//   }

//   container.innerHTML = interpolatedHTML;

//   for (const [index, placeholderId] of placeholders.entries()) {
//     const commentNode = findCommentNode(container, placeholderId);
//     if (commentNode) {
//       if (values[index] instanceof HTMLElement) {
//         commentNode.parentNode.replaceChild(values[index], commentNode);
//       } else {
//         const textNode = document.createTextNode(values[index]);
//         commentNode.parentNode.replaceChild(textNode, commentNode);
//       }
//     }
//   }

//   // Return the only child element when there's one child, otherwise return the wrapper element
//   return container.children.length === 1 ? container.children[0] : container;
// }

// function findCommentNode(element, commentText) {
//   for (const node of element.childNodes) {
//     if (
//       node.nodeType === Node.COMMENT_NODE &&
//       node.textContent.trim() === commentText
//     ) {
//       return node;
//     }

//     if (node.childNodes.length > 0) {
//       const result = findCommentNode(node, commentText);
//       if (result) return result;
//     }
//   }

//   return null;
// }

export async function html2dom(strings, ...values) {
  const container = document.createElement("div");
  let element = null;

  for (let i = 0; i < strings.length; i++) {
    container.insertAdjacentHTML("beforeend", strings[i]);

    if (i < values.length) {
      const value = values[i];
      if (value instanceof HTMLElement) {
        container.appendChild(value.cloneNode(true));
      } else {
        container.insertAdjacentHTML("beforeend", value);
      }
    }
  }

  if (container.children.length === 1) {
    element = container.firstElementChild;
  } else {
    element = document.createElement("div");
    while (container.firstChild) {
      element.appendChild(container.firstChild);
    }
  }

  return element;
}
