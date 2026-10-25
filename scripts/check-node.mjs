// Falla pronto en Amplify o en local si Node no cumple el mínimo del proyecto (.nvmrc / engines).
const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 12)) {
  console.error(`Node ${process.versions.node} no cumple el mínimo (>= 22.12). Ejecuta "nvm use" o fija Node 22 en Amplify.`);
  process.exit(1);
}
console.log(`Node ${process.versions.node} OK`);
