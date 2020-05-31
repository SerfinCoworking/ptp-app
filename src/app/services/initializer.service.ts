import { AuthService } from '@auth/services/auth.service';
import { RolesService } from '@permissions/services/roles.service';

export function servicesOnRun(authService: AuthService, rolesService: RolesService) {
  return async () => {
    await rolesService.load();
    await authService.load();
  };
}
