import { Plugin } from "obsidian";
import { defaultSettings, SimpleTimeTrackerSettings } from "./settings";
import { SimpleTimeTrackerSettingsTab } from "./settings-tab";
import { displayTracker, loadTracker } from "./src/tracker";

export default class SimpleTimeTrackerPlugin extends Plugin {

	settings: SimpleTimeTrackerSettings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new SimpleTimeTrackerSettingsTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("simple-time-tracker", (s, e, i) => {
			let tracker = loadTracker(s);
			e.empty();
			displayTracker(tracker, e, () => i.getSectionInfo(e), this.settings);
		});

		this.addCommand({
			id: `insert`,
			name: `Insert Time Tracker`,
			editorCallback: (e, _) => {
				e.replaceSelection("```simple-time-tracker\n```\n");
			}
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, defaultSettings, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
