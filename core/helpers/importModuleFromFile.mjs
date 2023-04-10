export async function importModuleFromFile(path, filename) {
  const module = await import(`${path}`);
  return module;
}
