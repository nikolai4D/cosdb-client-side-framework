import { apiCallPost } from "./apiCalls.mjs";

export async function action_getRelatedParentNodes(nodeId) {
  // get all related nodes

  const url = "api/relatedParentNodes";
  const body = { nodeId: nodeId };

  const relatedNodes = await apiCallPost({ url, body });

  return relatedNodes;
}
