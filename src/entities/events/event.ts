import { Session } from './session';

export class Event {
    name: string;
    startDt: string;
    endDt: string;
    campusOn: boolean;
    campusId: number | null;
    // 
    planning: { budget: number | null; date: string | null };
    sessions: Session[];

    constructor(initialValues: Partial<Event> = {}) {
        this.name = initialValues.name || "";
        this.startDt = initialValues.startDt || "";
        this.endDt = initialValues.endDt || "";
        this.campusOn = initialValues.campusOn || false;
        this.campusId = initialValues.campusId || null;
        this.planning = initialValues.planning || { budget: null, date: null };
        this.sessions = (initialValues.sessions || []).map(
            (session) => new Session(session)
        );
    }

    validateTab1(): string[] {
        const errors: string[] = [];
        if (!this.name) errors.push("Event name is required.");
        if (!this.startDt) errors.push("Start date is required.");
        if (!this.endDt) errors.push("End date is required.");
        if (this.startDt >= this.endDt) errors.push("Start date must be before end date.");
        return errors;
    }

    validateTab2(): string[] {
        const errors: string[] = [];
        if (this.campusOn) {
            if (!this.planning.budget) errors.push("Planning budget is required.");
            if (!this.planning.date) errors.push("Planning date is required.");
        }
        return errors;
    }

    validateTab3(): string[] {
        const errors: string[] = [];
        if (this.sessions.length === 0) errors.push("At least one session is required.");
        this.sessions.forEach((session, index) => {
            const sessionErrors = session.validate();
            if (sessionErrors.length) {
                errors.push(`Session ${index + 1}: ${sessionErrors.join(", ")}`);
            }
        });
        return errors;
    }

    syncSessionsWithEventDates() {
        const eventStart = new Date(this.startDt).getTime();
        const eventEnd = new Date(this.endDt).getTime();

        this.sessions = this.sessions.map((session) => {
            const sessionStart = new Date(session.startTime).getTime();
            const sessionEnd = new Date(session.endTime).getTime();

            if (sessionStart < eventStart || sessionEnd > eventEnd) {
                // Điều chỉnh session để nằm trong khoảng thời gian mới của event
                const adjustedStart = new Date(eventStart).toISOString();
                const adjustedEnd = new Date(Math.min(eventStart + 3600000, eventEnd)).toISOString(); // 1 giờ sau start hoặc trước end
                return new Session({
                    ...session,
                    startTime: adjustedStart,
                    endTime: adjustedEnd,
                });
            }
            return session;
        });
    }
}