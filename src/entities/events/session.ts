export class Session {
    name: string;
    startTime: string;
    endTime: string;

    constructor(initialValues: Partial<Session> = {}) {
        this.name = initialValues.name || "";
        this.startTime = initialValues.startTime || "";
        this.endTime = initialValues.endTime || "";
    }

    validate(): string[] {
        const errors: string[] = [];
        if (!this.name) errors.push("Session name is required.");
        if (!this.startTime) errors.push("Start time is required.");
        if (!this.endTime) errors.push("End time is required.");
        if (this.startTime >= this.endTime) errors.push("Start time must be before end time.");
        return errors;
    }
}