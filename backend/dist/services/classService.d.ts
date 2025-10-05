import type { CreateClassDto, UpdateClassDto, ClassFilters, PaginatedResponse, ClassWithSchedules } from "../types/type.js";
import type { Class } from "@prisma/client";
export declare const classService: {
    getAll(filters?: ClassFilters): Promise<PaginatedResponse<ClassWithSchedules>>;
    getById(id: string): Promise<ClassWithSchedules>;
    create(data: CreateClassDto): Promise<Class>;
    update(id: string, data: UpdateClassDto): Promise<Class>;
    delete(id: string): Promise<Class>;
};
//# sourceMappingURL=classService.d.ts.map