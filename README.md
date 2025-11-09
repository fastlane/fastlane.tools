# fastlane.tools
_A [grow](https://github.com/grow/grow) static site.

## Requirements
1. [uv](https://docs.astral.sh/uv/) - for managing virtual environments and dependencies
2. [Node.js](https://nodejs.org/en/download) - for JavaScript dependencies

## Local Development
1. `uv venv`
2. `source .venv/bin/activate`
3. `uv sync`
4. `uv run grow install`
5. `uv run grow run` 
6. Open your browser to `http://localhost:8080`
