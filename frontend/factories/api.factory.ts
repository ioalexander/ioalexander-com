import { formApi } from "~/api/form.api";

export function createApiClient(config: { baseUrl: string }) {
  return {
    form: formApi({ ...config }),
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
