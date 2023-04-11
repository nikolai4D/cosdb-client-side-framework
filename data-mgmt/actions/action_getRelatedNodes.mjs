import { apiCallPost } from "./apiCalls.mjs";

export async function action_getRelatedNodes(nodeId) {
  // get all related nodes

  const url = "api/relatedNodes";
  const body = { nodeId };

  const relatedNodes = await apiCallPost({ url, body });

  return relatedNodes;
}
