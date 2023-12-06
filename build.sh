docker run --rm -v $(pwd):/src -v $(pwd)/dist:/src/dist oven/bun /bin/sh -c "\
    cd /src &&\
    bun install &&\
    bun run build \
"
