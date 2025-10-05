import type { CreateStaffApplicationDto, UpdateStaffApplicationDto, StaffApplicationWithUser } from '../types/type.js';
export declare const staffApplicationService: {
    create(userId: string, data: CreateStaffApplicationDto): Promise<StaffApplicationWithUser>;
    getAll(): Promise<StaffApplicationWithUser[]>;
    getById(id: string): Promise<StaffApplicationWithUser>;
    update(id: string, data: UpdateStaffApplicationDto): Promise<StaffApplicationWithUser>;
};
//# sourceMappingURL=staffApplicationService.d.ts.map