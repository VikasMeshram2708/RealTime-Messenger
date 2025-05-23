import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../app";

describe("GET /send", () => {
  it("should return hello message", async () => {
    const res = await request(app).get("/api/v1/chat/send");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: "Hello,from CHAT server!!!",
    });
  });
});
