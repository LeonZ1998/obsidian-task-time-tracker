import { Plugin, Notice, Editor } from "obsidian";
import { defaultSettings, TaskTimeTrackerSettings } from "./settings";
import { TaskTimeTrackerSettingsTab } from "./settings-tab";
import { displayTracker, loadTracker } from "./tracker";

export default class TaskTimeTrackerPlugin extends Plugin {
	settings: TaskTimeTrackerSettings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new TaskTimeTrackerSettingsTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor("task-time-tracker", (s, e, i) => {
			let tracker = loadTracker(s);
			e.empty();
			displayTracker(tracker, e, () => i.getSectionInfo(e), this.settings);
		});

		this.addCommand({
			id: `insert`,
			name: `Insert Task Time Tracker`,
			editorCallback: (e, _) => {
				e.replaceSelection("```task-time-tracker\n```\n");
			}
		});

		this.addCommand({
			id: `clear`,
			name: `Clear Content of Task Time Tracker`,
			editorCallback: (e, _) => {
				e.replaceSelection("{\"entries\":[]");
			},
			hotkeys: [{modifiers:["Alt"], key:'v'}],
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, defaultSettings, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onunload() {

	}

}
