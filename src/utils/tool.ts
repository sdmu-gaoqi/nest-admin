export function buildTree(perms: any[], parentId = 0) {
  const tree: any[] = [];

  for (const perm of perms) {
    if (perm.parentId === parentId) {
      const children = buildTree(perms, perm.permId);
      if (children.length) {
        perm.children = children;
      }
      //  只需要开启的权限
      if (perm?.status === 1) {
        tree.push(perm);
      }
    }
  }

  return tree;
}
