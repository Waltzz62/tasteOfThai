import type { CreateStaffDto, UpdateStaffDto, StaffWithoutPassword } from "../types/type.js";
export declare const staffService: {
    getAll(): Promise<StaffWithoutPassword[]>;
    getById(id: string): Promise<StaffWithoutPassword>;
    create(data: CreateStaffDto): Promise<StaffWithoutPassword>;
    update(id: string, data: UpdateStaffDto): Promise<StaffWithoutPassword>;
    delete(id: string): Promise<void>;
};
//# sourceMappingURL=staffService.d.ts.map