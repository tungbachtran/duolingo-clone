import { http, HttpResponse } from "msw";

export const handlers = [
  // ví dụ mock login (để sẵn, chưa dùng cũng không sao)
  http.post("/api/auth/login", async () => {
    return HttpResponse.json({ access_token: "fake-token" }, { status: 200 });
  }),
];
