export const defaultSettings: TaskTimeTrackerSettings = {
    timestampFormat: "YY-MM-DD hh:mm:ss",
    csvDelimiter: ","
};

export interface TaskTimeTrackerSettings {

    timestampFormat: string;
    csvDelimiter: string;
    
}
