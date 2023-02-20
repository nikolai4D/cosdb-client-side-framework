export async function importModuleFromFile(file, filename) {
  const module = await import(`../../../components/viewTemplates/${file}`);
  return new module[filename]();
}
