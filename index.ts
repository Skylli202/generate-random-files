const [_bunPath, scriptPath, amtFiles, depth, layer] = Bun.argv;
console.log(
  `Running ${scriptPath}.
  - ${depth} depth
  - ${layer} layers
  - ${amtFiles} files`,
);

import { join } from "node:path";
import { mkdirSync, rmSync } from "node:fs";
import { randomBytes } from "node:crypto";

const rootDirPath = join(scriptPath, "..", "./random");
rmSync(rootDirPath, { recursive: true, force: true });

const dirPaths = generateRandomDirectories(
  depth as unknown as number,
  rootDirPath,
  layer as unknown as number,
);
dirPaths.map((d) => mkdirSync(d, { recursive: true }));
dirPaths.map((dirPath) => {
  console.log(dirPath);
  generateRandomFilesInDirectory(dirPath, {
    amtFiles: amtFiles as unknown as number,
  });
});
generateRandomFilesInDirectory(rootDirPath, {
  amtFiles: amtFiles as unknown as number,
});

function generateRandomFilesInDirectory(
  dirPath: string,
  opts: {
    fileSize?: number;
    amtFiles?: number;
  },
) {
  opts.amtFiles = opts.amtFiles || 3;
  opts.fileSize = opts.fileSize || 1024;
  for (let i = 0; i < opts.amtFiles; i++) {
    const filename = generateRandomFilename();
    const filePath = join(dirPath, filename);
    const outFile = Bun.file(filePath);
    Bun.write(outFile, generateBytesAsHexString(opts.fileSize)).then((r) => {
      console.log(`${filePath} written (${r} bytes).`);
    });
  }
}

function generateRandomDirectories(
  depth: number,
  rootPath: string,
  layer: number,
): string[] {
  const dirPaths: string[] = [];

  if (depth !== 0) {
    const dirName = generateRandomDirectoryName();
    const dirPath = join(rootPath, dirName);
    generateRandomDirectories(depth - 1, dirPath, layer).map((f) =>
      dirPaths.push(f),
    );
  }

  for (let i = 0; i < layer; i++) {
    const dirName = generateRandomDirectoryName();
    const dirPath = join(rootPath, dirName);
    dirPaths.push(dirPath);
  }
  return dirPaths;
}

function generateRandomDirectoryName(): string {
  return generateBytesAsHexString(2);
}
function generateRandomFilename(): string {
  return generateBytesAsHexString(4) + ".rnd";
}

function generateBytesAsHexString(length: number): string {
  return randomBytes(length).toString("hex");
}
