export async function importModuleFromFile(
  file,
  filename,
  type = "viewTemplates"
) {
  console.log("file", file, "filename", filename, "type", type);
  console.log(`../../../components/${type}/${file}`, "path");
  const module = await import(`../../../components/${type}/${file}`);
  return new module[filename]();
}
