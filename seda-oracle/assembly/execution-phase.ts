import {
  Bytes,
  Console,
  Process,
  httpFetch,
} from "@seda-protocol/as-sdk/assembly";

// API response structure for weather data
@json
class WeatherConditionResponse {
  weather!: WeatherDescription[];
}

@json
class WeatherDescription {
  main!: string; // Main weather condition (e.g., "Clear", "Rain", "Clouds")
  description!: string; // Detailed description of the weather condition (e.g., "few clouds")
}

/**
 * Executes the data request phase to fetch weather condition.
 * This phase fetches weather data based on latitude and longitude from an external weather API (e.g., OpenWeatherMap).
 * The input specifies the latitude and longitude (e.g., "12.9716,77.5946").
 */
export function executionPhase(): void {
  // Retrieve the input parameters for the data request (DR).
  // Expected format: "lat,lon" (e.g., "12.9716,77.5946").
  const drInputsRaw = Process.getInputs().toUtf8String();

  // Log the latitude and longitude being used for the weather query.
  Console.log(`Fetching weather condition for coordinates: ${drInputsRaw}`);

  // Split the input string into latitude and longitude.
  const drInputs = drInputsRaw.split(",");
  const latitude = drInputs[0];
  const longitude = drInputs[1];

  // OpenWeatherMap API key (you need to replace this with your actual API key).
  const apiKey = "b1ab55aba7131337415bb958f44c0ed0";

  // Make an HTTP request to OpenWeatherMap API to get the weather for the given coordinates.
  const response = httpFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );

  // Check if the HTTP request was successfully fulfilled.
  if (!response.ok) {
    Console.error(
      `HTTP Response was rejected: ${response.status.toString()} - ${response.bytes.toUtf8String()}`
    );
    Process.error(Bytes.fromUtf8String("Error while fetching weather data"));
    return;
  }

  // Log the raw response (for debugging purposes)
  Console.log(response.bytes.toUtf8String());

  // Parse the API response to extract the weather condition.
  let data: WeatherConditionResponse | null = null;
  if (response.bytes.length > 0) {
    // Parse the response if it's not empty
    data = response.bytes.toJSON<WeatherConditionResponse>();
  }

  // Ensure that the weather data is present before trying to access it
  if (data && data.weather && data.weather.length > 0) {
    const weatherCondition = data.weather[0].main;
    const weatherDescription = data.weather[0].description;

    // Log the weather condition and description.
    Console.log(
      `Weather Condition: ${weatherCondition} - ${weatherDescription}`
    );

    // Report the weather condition back to the SEDA network.
    const result = Bytes.fromUtf8String(
      `Condition: ${weatherCondition} - ${weatherDescription}`
    );
    Process.success(result);
  } else {
    Console.error("Weather condition data is missing or malformed");
    Process.error(
      Bytes.fromUtf8String("No weather data found or data is malformed")
    );
  }
}
