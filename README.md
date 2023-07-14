# Dock API Polygon ID Demo App

This is a demo application showing how you can use the Dock API for issuing Polygon ID credentials.

## Getting Started

First, setup a .env file in the project's root folder

```bash
DOCK_API_URL=https://api-testnet.dock.io
DOCK_API_TOKEN=  # you can generate a key at https://certs.dock.io/keys
DOCK_API_DID= # the DID to use for the issuer. You can generate one here: https://certs.dock.io/dids
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
