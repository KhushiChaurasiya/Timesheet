import { Time } from "@angular/common";
import { Reason } from "./reason";
import { Workplace } from "./workplace";
import { ProjectTask } from "./projecttask";
import { Project } from "./project";

export class TimesheetTracker {
    id?: number;
    taskId?: number;
    taskDescription?: string;
    projectId?:number;
    workplaceId?:number;
    reasonId?:number;
    dates?:Date;
    times?:string;
    createdBy?:string;
    isSubmitted?:boolean;
    // timesheetTrackerD?:TimesheetTrackerD;
}

// export class TimesheetTrackerD{
//     reason?: Reason;
//     workplace?:Workplace;
//     projecttask?:ProjectTask;
//     project?:Project;
//     dateAndTimeDTO?:DateAndTimeDTO;
// }

// export class DateAndTimeDTO
// {
//     dates?:Date;
//     times?:string;
//    description?:string;
// }
