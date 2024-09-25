## Installation

```bash
$ pnpm install
```

## Running Docker for Typesense

To start the Typesense server, run the following command:

```bash
docker run -d --name=typesense \
  -p 8108:8108 \
  -v/tmp/data:/data \
  typesense/typesense:0.24.0 \
  --data-dir /data \
  --api-key=ABC123XYZ789qwertiop456
```

## Starting nats server
```bash
nats-server
```

## Running the app

```bash
cd search-service
pnpm run start
cd api-gateway
pnpm run start
```

## Example of endpoint
```bash
http://localhost:3000/search?query=Skyr
```
