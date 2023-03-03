export async function importModuleFromFile(
  file,
  filename,
  type = "viewTemplates"
) {
  console.log(`../../../components/${type}/${file}`, "path");
  const module = await import(`../../../components/${type}/${file}`);
  return new module[filename]();
}
