# generate-random-files

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts <amount_of_files> <depth> <layer>
```

## Arguments

- `amount_of_files`: amount of files per directory
- `depth`: depth of the generation
- `layer`: Number of directory per level

## Todo

Fix layer/depth things, currently the depth is only respected on one path, and not every path.
Currently this is a tree with layer #leaf at each depth, and only one branch has #depth.
