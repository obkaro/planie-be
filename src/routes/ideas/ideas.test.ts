import { describe, it, expect, expectTypeOf } from "vitest";
import router from "./ideas.index";
import createApp, { createTestApp } from "@/lib/create-app";
import { testClient } from "hono/testing";
import { env } from "@/env-runtime";
import { timeout } from "hono/timeout";

if (env.NODE_ENV !== "test") {
  throw new Error("This file should only be run in test mode");
}

const client = testClient(createApp().route("/", router));

describe("Ideas", () => {
  // it(
  //   "should generate ideas",
  //   {
  //     timeout: 15000,
  //   },
  //   async () => {
  //     const testApp = createTestApp(router);

  //     const response = await testApp.request("/generate", {
  //       method: "POST",
  //       headers: {
  //         Authorization: "Bearer SECRET",
  //       },
  //       body: JSON.stringify({
  //         trip: {
  //           title: "Paris Trip",
  //           location: {
  //             city: "Paris",
  //             state: "Île-de-France",
  //             country: "France",
  //           },
  //           startDate: "2024-01-01",
  //           endDate: "2024-01-05",
  //           numberOfIdeas: 2,
  //         },
  //       }),
  //     });
  //     const result = await response.json();
  //     if (response.status === 200) {
  //       console.log(result);
  //       expect(response.status).toBe(200);
  //     } else {
  //       console.log(response);
  //       throw new Error("Failed to generate ideas");
  //     }
  //   }
  // );

  it("should generate ideas array", { timeout: 15000 }, async () => {
    await client.generate
      .$post({
        header: {
          Authorization: `Bearer ${env.CLIENT_API_KEY}`,
        },
        json: {
          trip: {
            title: "Paris Trip",
            location: {
              city: "Paris",
              state: "Île-de-France",
              country: "France",
            },
            startDate: "2024-01-01",
            endDate: "2024-01-05",
            numberOfIdeas: 2,
          },
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          const result = await response.json();
          console.log(result);
          expectTypeOf(result.ideas).toBeArray();
        } else {
          console.log(response);
          throw new Error("Failed to generate ideas");
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  });
});
