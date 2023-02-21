export async function importModuleFromFile(file, filename, type) {
  const module = await import(`../../../components/${type}/${file}`);
  return new module[filename]();
}
