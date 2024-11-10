import { Tally, Process, Bytes, Console } from "@seda-protocol/as-sdk/assembly";

/**
 * Executes the tally phase within the SEDA network.
 * This phase retrieves and returns the first revealed weather condition from the execution phase.
 */
export function tallyPhase(): void {
  // Retrieve consensus reveals from the tally phase.
  const reveals = Tally.getReveals();

  if (reveals.length > 0) {
    // Get the first revealed weather condition.
    const firstCondition = reveals[0].reveal.toUtf8String();
    Console.log(
      `Returning first revealed weather condition: ${firstCondition}`
    );

    // Report the first valid weather condition as the result in the tally phase.
    Process.success(Bytes.fromUtf8String(firstCondition));
  } else {
    // If no valid conditions were revealed, report an error.
    Process.error(Bytes.fromUtf8String("No weather conditions revealed"));
  }
}
