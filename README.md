# About
Web UI Client for [capsim](https://github.com/reasv/capsim)

## Bun
This project requires bun https://bun.sh/. It's not guaranteed to work with Node.js/NPM or yarn, although it probably will.

## Running

### Prerequisites
Before proceeding, ensure you have a [capsim](https://github.com/reasv/capsim) API server running.

Copy the `.env.example` file and rename it to just `.env`.

It should contain `VITE_REACT_APP_API_URL=http://127.0.0.1:5000`

Adjust the URL if your API server runs on a different host/port.

### Installation

First, install bun: https://bun.sh/docs/installation
- Mac OS / Linux : `curl -fsSL https://bun.sh/install | bash`
- Windows: `powershell -c "irm bun.sh/install.ps1|iex"`

Then install our dependencies:

`bun i`

Finally, run the dev server to test the web app:

`bun run dev`

#### Troubleshooting
If you encounter issues with `bun run dev`, typically on Windows, you can try running this project using node.js and NPM.

##### Installing node.js
You can skip this step if you already have npm and node.js

Find node.js/npm installation instructions for your platform here:
https://nodejs.org/en/download/prebuilt-installer

#### Running with NPM

```
npm install
npm run dev
```

# Notes and attribution
This project is built on React + Typescript + Vite + Tailwindcss.

All UI components within `src/components/ui` are sourced from [Shadcn/ui](https://ui.shadcn.com/docs)