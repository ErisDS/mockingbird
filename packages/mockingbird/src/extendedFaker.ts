import { faker } from "@faker-js/faker";

function weightedRandom(items: unknown[], weights: number[]) {
  let i;
  let localWeights = [...weights];

  for (i = 0; i < localWeights.length; i++) {
    localWeights[i] += localWeights[i - 1] || 0;
  }

  let random = Math.random() * localWeights[localWeights.length - 1];

  for (i = 0; i < localWeights.length; i++) {
    if (localWeights[i] > random) break;
  }

  return items[i];
}

const addressModule = Object.assign(
  {
    countryCodeISO2: () => extendedFaker.address.countryCode("alpha-2"),
    countryCodeISO3: () => extendedFaker.address.countryCode("alpha-3"),
    latitudeNumeric: () => parseFloat(extendedFaker.address.latitude()),
    longitudeNumeric: () => parseFloat(extendedFaker.address.longitude()),
  },
  faker.address
);

const browserModule = Object.assign(
  {
    searchEngineName() {
      const searchEngines = [
        "https://www.google.co.uk/",
        "https://www.bing.com/",
        "https://duckduckgo.com/",
        "https://yandex.com/",
        "https://yahoo.com",
      ];
      return faker.helpers.arrayElement(searchEngines);
    },
    osName() {
      const osNames = ["Linux", "Windows", "Mac OS"];
      return faker.helpers.arrayElement(osNames);
    },
    browserName() {
      const browserNames = ["Chrome", "Firefox", "IE", "Opera"];
      return faker.helpers.arrayElement(browserNames);
    },
    browserEngineName() {
      const browserEngineNames = ["Blink", "Gecko", "Trident"];
      return faker.helpers.arrayElement(browserEngineNames);
    },
  },
  {}
);

const datatypeModule = Object.assign(
  {
    int: (params: { min?: number | undefined; max?: number | undefined }) =>
      extendedFaker.datatype.number(params),
    uint: (params: { max?: number | undefined }) =>
      extendedFaker.datatype.number({ min: 0, max: params.max }),
    intString: (params: {
      min?: number | undefined;
      max?: number | undefined;
    }) => extendedFaker.datatype.number(params).toString(),
    uintString: (params: { max?: number | undefined }) =>
      extendedFaker.datatype.number({ min: 0, max: params.max }).toString(),
    floatString: (params: {
      min?: number | undefined;
      max?: number | undefined;
    }) => extendedFaker.datatype.float(params).toString(),
  },
  faker.datatype
);

const dateModule = Object.assign(
  {
    datetime: () => faker.date.recent().toISOString().slice(0, 19),
    datetimeBetween: (params: {
      start: string | number | Date;
      end: string | number | Date;
    }) =>
      faker.date.between(params.start, params.end).toISOString().slice(0, 19),
    datetimeLasthour: () =>
      faker.date
        .recent(1 / 24)
        .toISOString()
        .slice(0, 19),
    timestamp: () => faker.date.recent().toISOString(),
    timestampCurrent: () => new Date().toISOString(),
    timestampBetween: (params: {
      start: string | number | Date;
      end: string | number | Date;
    }) => faker.date.between(params.start, params.end).toISOString(),
    timestampLasthour: () => faker.date.recent(1 / 24).toISOString(),
  },
  faker.date
);

const valuesModule = {
  pick: (params: { values: unknown[] }) =>
    params.values[Math.floor(Math.random() * params.values.length)],
  pickWeighted: (params: { values: unknown[]; weights: number[] }) =>
    extendedFaker.helpers.weightedRandom(params.values, params.weights),
};

const extendedFaker = {
  ...faker,
  helpers: { ...faker.helpers, weightedRandom },
  address: addressModule,
  browser: browserModule,
  datatype: datatypeModule,
  date: dateModule,
  values: valuesModule,
};

export default extendedFaker;
