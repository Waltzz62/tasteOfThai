import type { RegisterData, LoginCredentials, AuthResponse } from '../types/type.js';
export declare const authService: {
    register(data: RegisterData): Promise<AuthResponse>;
    login(credentials: LoginCredentials): Promise<AuthResponse>;
    staffLogin(credentials: LoginCredentials): Promise<AuthResponse>;
};
//# sourceMappingURL=authService.d.ts.map