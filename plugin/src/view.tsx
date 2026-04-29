import { TextFileView, WorkspaceLeaf } from "obsidian"
import { createRoot, type Root } from "react-dom/client"
import React from "react"
import type NodepadPlugin from "./main"

export const VIEW_TYPE = "nodepad-view"

export class NodepadView extends TextFileView {
  private root: Root | null = null
  readonly plugin: NodepadPlugin
  private fileData = ""

  constructor(leaf: WorkspaceLeaf, plugin: NodepadPlugin) {
    super(leaf)
    this.plugin = plugin
  }

  getViewType() { return VIEW_TYPE }
  getDisplayText() { return this.file?.basename ?? "Nodepad" }
  getIcon() { return "layout-dashboard" }

  // Called by Obsidian to load file contents into the view
  setViewData(data: string, clear: boolean) {
    this.fileData = data
    if (clear) this.renderRoot()
  }

  // Called by Obsidian when it needs to save the file
  getViewData() {
    return this.fileData
  }

  clear() {
    this.fileData = ""
  }

  async onOpen() {
    this.renderRoot()
  }

  async onClose() {
    this.root?.unmount()
    this.root = null
  }

  private renderRoot() {
    if (!this.root) {
      this.root = createRoot(this.containerEl.children[1])
    }
    this.root.render(
      <React.StrictMode>
        <NodepadApp plugin={this.plugin} fileName={this.file?.basename} />
      </React.StrictMode>
    )
  }
}

function NodepadApp({ plugin, fileName }: { plugin: NodepadPlugin; fileName?: string }) {
  const hasKey = !!plugin.settings.apiKey

  return (
    <div className="nodepad-view" style={{ padding: "2rem", fontFamily: "var(--font-interface)" }}>
      <h2 style={{ marginTop: 0 }}>{fileName ?? "Nodepad"}</h2>
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
