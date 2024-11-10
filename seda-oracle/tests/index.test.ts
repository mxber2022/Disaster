import { afterEach, describe, it, expect, mock } from "bun:test";
import { file } from "bun";
import {
  testOracleProgramExecution,
  testOracleProgramTally,
} from "@seda-protocol/dev-tools";

const WASM_PATH = "build/debug.wasm";

const fetchMock = mock();

// Reset mock after each test
afterEach(() => {
  fetchMock.mockRestore();
});

describe("data request execution", () => {
  it("should fetch the weather condition from the weather API", async () => {
    // Mock the weather API response for the execution phase
    fetchMock.mockImplementation((url) => {
      if (url.host === "api.openweathermap.org") {
        return new Response(
          JSON.stringify({
            weather: [{ description: "Clear sky" }],
          })
        );
      }

      return new Response("Unknown request");
    });

    // Load the WebAssembly oracle program
    const oracleProgram = await file(WASM_PATH).arrayBuffer();

    // Run the oracle program with a lat/lon input
    const vmResult = await testOracleProgramExecution(
      Buffer.from(oracleProgram),
      Buffer.from("13.719711, 100.574572"), // Example lat/lon coordinates
      fetchMock
    );

    console.log("Weather condition result: ", vmResult);

    // Check if the execution was successful
    expect(vmResult.exitCode).toBe(0);

    // Extract the weather condition from the result (assuming it's utf8 encoded)
    const result = Buffer.from(vmResult.result).toString("utf8");
    //expect(result).toEqual("Clear sky"); // Expect the condition to match the mock response
  });

  it("should tally the first valid weather condition", async () => {
    // Load the WebAssembly oracle program for the tally phase
    const oracleProgram = await file(WASM_PATH).arrayBuffer();

    // Mock the result from the execution phase (e.g., "Clear sky" from multiple reveals)
    const vmResult = await testOracleProgramTally(
      Buffer.from(oracleProgram),
      Buffer.from("tally-inputs"),
      [
        {
          exitCode: 0,
          gasUsed: 0,
          inConsensus: true,
          result: Buffer.from("Clear sky"), // Mocking the condition for consensus
        },
        {
          exitCode: 0,
          gasUsed: 0,
          inConsensus: true,
          result: Buffer.from("Partly cloudy"), // Another mock result
        },
      ]
    );

    // Ensure the tally phase finished successfully
    expect(vmResult.exitCode).toBe(0);

    // Extract the weather condition from the result (assuming it's utf8 encoded)
    const result = Buffer.from(vmResult.result).toString("utf8");
    expect(result).toEqual("Clear sky"); // Expecting the first condition in consensus
  });
});
