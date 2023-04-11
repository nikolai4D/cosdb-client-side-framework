import { apiCallPost } from "./apiCalls.mjs";

export async function action_getRelatedNodes(nodeId) {
  // get all related nodes

  const url = "api/relatedNodes";

  const relatedNodes = await apiCallPost({ url, nodeId });

  return relatedNodes;
}
