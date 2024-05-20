# Bun
This project requires bun https://bun.sh/. It's not guaranteed to work with Node.js/NPM or yarn.

# Running

## Prerequisites
Before proceeding, ensure you have a [capsim](https://github.com/reasv/capsim) API server running.

Create a .env file following the syntax in `.env.example`, setting `VITE_REACT_APP_API_URL=http://127.0.0.1:5000`

Adjust the URL if your API server runs on a different host/port.

## Installation

First, install bun: https://bun.sh/docs/installation
- Mac OS / Linux : `curl -fsSL https://bun.sh/install | bash`
- Windows: `powershell -c "irm bun.sh/install.ps1|iex"`

Then install our dependencies:

`bun i`

Finally, run the dev server to test the web app:

`bun run dev`

# Notes
This project uses React + Typescript + Vite