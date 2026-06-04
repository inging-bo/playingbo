import { spawn } from "node:child_process";
import { networkInterfaces } from "node:os";

function getLocalIPv4() {
  for (const interfaces of Object.values(networkInterfaces())) {
    if (!interfaces) continue;
    for (const iface of interfaces) {
      const isIPv4 = iface.family === "IPv4" || iface.family === 4;
      if (isIPv4 && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

const port = process.env.PORT ?? "3000";
const host = getLocalIPv4() ?? "0.0.0.0";

if (host === "0.0.0.0") {
  console.log("\n  Mobile: Wi-Fi IPv4를 찾지 못했습니다. ipconfig로 IP 확인 후 접속하세요.\n");
} else {
  console.log(`\n  Mobile: http://${host}:${port}`);
  console.log(`          http://${host}:${port}/games/roulette\n`);
}

const child = spawn(
  "npx",
  ["next", "dev", "-H", host, "-p", port],
  { stdio: "inherit", shell: true }
);

child.on("exit", (code) => process.exit(code ?? 0));
