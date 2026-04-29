# Nodepad — Obsidian Plugin

Not yet listed in the Obsidian community plugins directory. Install manually using the steps below.

---

## Installation

### 1. Build

```bash
cd plugin
npm install
npm run build
```

This produces `plugin/main.js`.

### 2. Copy files into your vault

Create the plugin folder inside your vault:

```
<your-vault>/.obsidian/plugins/nodepad/
```

Copy these three files into it:

| File | Location after copy |
|---|---|
| `main.js` | `.obsidian/plugins/nodepad/main.js` |
| `manifest.json` | `.obsidian/plugins/nodepad/manifest.json` |
| `styles.css` | `.obsidian/plugins/nodepad/styles.css` |

### 3. Enable the plugin

1. Open Obsidian → **Settings** → **Community plugins**
2. Turn off **Restricted mode** if prompted
3. Find **Nodepad** in the installed list and toggle it on

### 4. Add your API key

1. Go to **Settings** → **Nodepad**
2. Choose a provider (OpenRouter, OpenAI, Anthropic, or Z.ai)
3. Paste your API key
4. Set the model ID (e.g. `openai/gpt-4o` for OpenRouter, `claude-sonnet-4-6` for Anthropic)

### 5. Open Nodepad

Click the **layout-dashboard** icon in the left ribbon, or run **Open Nodepad** from the command palette (`Ctrl/Cmd + P`).

---

## Development (hot reload)

Instead of copying files each time, symlink the plugin folder directly into your vault:

**macOS / Linux**
```bash
ln -s "$(pwd)/plugin" "<your-vault>/.obsidian/plugins/nodepad"
```

**Windows (PowerShell, run as Administrator)**
```powershell
New-Item -ItemType Junction -Path "<your-vault>\.obsidian\plugins\nodepad" -Target (Resolve-Path .\plugin)
```

Then run the dev watcher:

```bash
cd plugin
npm run dev
```

Obsidian will pick up changes automatically if you have the [Hot Reload plugin](https://github.com/pjeby/hot-reload) installed, or you can reload manually with `Ctrl/Cmd + R`.
