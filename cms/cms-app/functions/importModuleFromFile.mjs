export async function importModuleFromFile(file, filename, type="viewTemplates") {
  const module = await import(`../../../components/${type}/${file}`);
  return new module[filename]();
}
