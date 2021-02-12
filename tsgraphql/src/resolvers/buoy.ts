import { Field, ObjectType, Int, Float, Query } from "type-graphql";

const spectralData = "https://www.ndbc.noaa.gov/data/realtime2/46221.spec";
const standardData = "https://www.ndbc.noaa.gov/data/realtime2/46221.txt";
const latest = "http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt";

@ObjectType()
class metric {
  @Field()
  unit: string;

  @Field()
  value: number;
}

@ObjectType({ description: "Measurements from buoy" })
class BuoyStats {
  @Field()
  dateTime: Date;
  @Field()
  wdir: metric;
  @Field()
  wspd: metric;
  @Field()
  gst: metric;
  @Field()
  wvht: metric;
  @Field()
  dpd: metric;
  @Field()
  apd: metric;
  @Field()
  mwd: metric;
  @Field()
  pres: metric;
  @Field()
  atmp: metric;
  @Field()
  wtmp: metric;
  @Field()
  vis: metric;
  @Field()
  ptdy: metric;
  @Field()
  tide: metric;
}

@ObjectType()
export class BuoyResolver {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  lat: number;

  @Field()
  long: number;

  @Field()
  latestStatsDt: Date;

  @Query((returns) => BuoyStats)
  latestStats() {
    return { dateTime: new Date(), wdir: { unit: "ms", value: 23 } };
  }

  @Field((returns) => [BuoyStats])
  history: BuoyStats[];
}
