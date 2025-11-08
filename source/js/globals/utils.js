/**
 * NodeList -> Array in this case.
 * @param {NodeList} nodeList
 * @return {Array}
 */
export function arrayify(nodeList) {
  return Array.prototype.slice.apply(nodeList);
}