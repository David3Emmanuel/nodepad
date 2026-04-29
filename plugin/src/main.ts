import { Plugin } from "obsidian"
import { NodepadView, VIEW_TYPE } from "./view"
import { NodepadSettingTab, type NodepadSettings, DEFAULT_SETTINGS } from "./settings"

export default class NodepadPlugin extends Plugin {
  settings!: NodepadSettings

  async onload() {
    await this.loadSettings()

    this.registerView(VIEW_TYPE, (leaf) => new NodepadView(leaf, this))

    this.addRibbonIcon("layout-dashboard", "Open Nodepad", () => this.activateView())

    this.addCommand({
      id: "open-nodepad",
      name: "Open Nodepad",
      callback: () => this.activateView(),
    })

    this.addSettingTab(new NodepadSettingTab(this.app, this))
  }

  async activateView() {
    const { workspace } = this.app
    let leaf = workspace.getLeavesOfType(VIEW_TYPE)[0]
    if (!leaf) {
      leaf = workspace.getLeaf("tab")
      await leaf.setViewState({ type: VIEW_TYPE, active: true })
    }
    workspace.revealLeaf(leaf)
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  onunload() {}
}
