export function updateDOM(oldNode, newNode) {
  // If nodes have different types, replace oldNode with newNode
  if (
    oldNode.nodeType !== newNode.nodeType ||
    oldNode.nodeName !== newNode.nodeName
  ) {
    oldNode.replaceWith(newNode);
    return;
  }

  // Update attributes if the nodes are of the same type
  if (oldNode.nodeType === Node.ELEMENT_NODE) {
    const attributesChanged = updateAttributes(oldNode, newNode);
    if (attributesChanged) {
      oldNode.replaceWith(newNode);
      return;
    }
  }

  // Update text content if the nodes are text nodes
  if (oldNode.nodeType === Node.TEXT_NODE) {
    oldNode.textContent = newNode.textContent;
  }

  // Compare and update child nodes
  const oldChildren = Array.from(oldNode.childNodes);
  const newChildren = Array.from(newNode.childNodes);

  const maxLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < oldChildren.length && i < newChildren.length) {
      // Update existing child nodes
      updateDOM(oldChildren[i], newChildren[i]);
    } else if (i >= oldChildren.length) {
      // Append new child nodes
      oldNode.appendChild(newChildren[i]);
    } else if (i >= newChildren.length) {
      // Remove extra child nodes
      oldNode.removeChild(oldChildren[i]);
    }
  }
}

function updateAttributes(oldNode, newNode) {
  const oldAttrs = Array.from(oldNode.attributes);
  const newAttrs = Array.from(newNode.attributes);

  if (oldAttrs.length !== newAttrs.length) {
    return true;
  }

  for (const attr of oldAttrs) {
    if (
      !newNode.hasAttribute(attr.name) ||
      newNode.getAttribute(attr.name) !== attr.value
    ) {
      return true;
    }
  }

  return false;
}
