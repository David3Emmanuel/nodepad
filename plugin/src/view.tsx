import { ItemView, WorkspaceLeaf } from "obsidian"
import { createRoot, type Root } from "react-dom/client"
import React from "react"
import type NodepadPlugin from "./main"

export const VIEW_TYPE = "nodepad-view"

export class NodepadView extends ItemView {
  private root: Root | null = null
  readonly plugin: NodepadPlugin

  constructor(leaf: WorkspaceLeaf, plugin: NodepadPlugin) {
    super(leaf)
    this.plugin = plugin
  }

  getViewType() { return VIEW_TYPE }
  getDisplayText() { return "Nodepad" }
  getIcon() { return "layout-dashboard" }

  async onOpen() {
    this.root = createRoot(this.containerEl.children[1])
    this.root.render(
      <React.StrictMode>
        <NodepadApp plugin={this.plugin} />
      </React.StrictMode>
    )
  }

  async onClose() {
    this.root?.unmount()
    this.root = null
  }
}

function NodepadApp({ plugin }: { plugin: NodepadPlugin }) {
  const hasKey = !!plugin.settings.apiKey

  return (
    <div className="nodepad-view" style={{ padding: "2rem", fontFamily: "var(--font-interface)" }}>
      <h2 style={{ marginTop: 0 }}>Nodepad</h2>
      {!hasKey && (
        <p style={{ color: "var(--text-muted)" }}>
          No API key set. Open Settings → Nodepad to configure your provider.
        </p>
      )}
      {hasKey && (
        <p style={{ color: "var(--text-muted)" }}>
          Connected via <strong>{plugin.settings.provider}</strong> · {plugin.settings.modelId}
        </p>
      )}
    </div>
  )
}
