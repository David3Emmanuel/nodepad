import { Plugin } from "obsidian"
import { NodepadView, VIEW_TYPE } from "./view"
import { NodepadSettingTab, type NodepadSettings, DEFAULT_SETTINGS } from "./settings"

export default class NodepadPlugin extends Plugin {
  settings!: NodepadSettings

  async onload() {
    await this.loadSettings()

    this.registerView(VIEW_TYPE, (leaf) => new NodepadView(leaf, this))
    this.registerExtensions(["nodepad"], VIEW_TYPE)

    this.addRibbonIcon("layout-dashboard", "New Nodepad Space", () => this.createNewSpace())

    this.addCommand({
      id: "new-nodepad-space",
      name: "New Nodepad Space",
      callback: () => this.createNewSpace(),
    })

    this.addSettingTab(new NodepadSettingTab(this.app, this))
  }

  async createNewSpace() {
    const name = `Untitled Space ${Date.now()}.nodepad`
    const file = await this.app.vault.create(name, JSON.stringify({ nodes: [] }, null, 2))
    const leaf = this.app.workspace.getLeaf("tab")
    await leaf.openFile(file)
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  onunload() {}
}
