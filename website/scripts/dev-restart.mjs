import { execSync, spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

function getListeningPidsOnPort(port) {
  if (process.platform === "win32") {
    try {
      const output = execSync(`netstat -ano -p tcp | findstr :${port}`, {
        stdio: ["ignore", "pipe", "ignore"],
      }).toString();

      return output
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && line.includes("LISTENING"))
        .map((line) => line.split(/\s+/).pop())
        .filter(Boolean);
    } catch {
      return [];
    }
  }

  try {
    const output = execSync(`lsof -ti tcp:${port}`, {
      stdio: ["ignore", "pipe", "ignore"],
    }).toString();
    return output
      .split(/\r?\n/)
      .map((pid) => pid.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function killPid(pid) {
  try {
    if (process.platform === "win32") {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
    } else {
      process.kill(Number(pid), "SIGTERM");
    }
    return true;
  } catch {
    return false;
  }
}

const pids = [...new Set(getListeningPidsOnPort(3000))];

if (pids.length > 0) {
  for (const pid of pids) {
    const killed = killPid(pid);
    const verb = killed ? "Stopped" : "Could not stop";
    console.log(`${verb} process ${pid} on port 3000.`);
  }
} else {
  console.log("No existing dev server found on port 3000.");
}

try {
  rmSync(join(process.cwd(), ".next", "dev"), { recursive: true, force: true });
  console.log("Cleared .next/dev cache.");
} catch {
  console.log("Could not clear .next/dev cache.");
}

const devProcess = spawn("npm", ["run", "dev"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

devProcess.on("exit", (code) => {
  process.exit(code ?? 0);
});
