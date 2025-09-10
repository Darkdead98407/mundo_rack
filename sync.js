import { exec } from "child_process";

// Cambia si tu rama no es "main"
const branch = "main";

function runCommand(command, message) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Error en ${message}:`, stderr);
        reject(err);
      } else {
        console.log(`✅ ${message}:`, stdout);
        resolve(stdout);
      }
    });
  });
}

async function syncProject() {
  try {
    console.log("🔄 Sincronizando proyecto con GitHub...");

    // 1. Guardar cambios locales
    await runCommand("git add .", "Añadiendo cambios");
    await runCommand(
      `git commit -m "Auto-sync commit" || echo "Nada que commitear"`,
      "Creando commit"
    );

    // 2. Traer últimos cambios de GitHub
    await runCommand(`git pull origin ${branch}`, "Haciendo pull de GitHub");

    // 3. Subir cambios locales
    await runCommand(`git push origin ${branch}`, "Subiendo cambios a GitHub");

    console.log("🚀 Proyecto sincronizado correctamente");
  } catch (error) {
    console.error("❌ Error al sincronizar:", error);
  }
}

syncProject();
