FROM oven/bun:latest

COPY medpoisk-client/ /medpoisk-client

WORKDIR /medpoisk-client

RUN bun install
RUN bun run build