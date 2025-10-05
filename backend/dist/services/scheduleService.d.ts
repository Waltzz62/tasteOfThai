import type { CreateScheduleDto, UpdateScheduleDto, ScheduleWithDetails } from '../types/type.js';
import type { Schedule } from '@prisma/client';
export declare const scheduleService: {
    getAll(): Promise<ScheduleWithDetails[]>;
    getByStaff(staffId: string): Promise<ScheduleWithDetails[]>;
    create(data: CreateScheduleDto): Promise<Schedule>;
    update(id: string, data: UpdateScheduleDto): Promise<Schedule>;
    delete(id: string): Promise<Schedule>;
};
//# sourceMappingURL=scheduleService.d.ts.map