// const { RESTDataSource } = require("apollo-datasource-rest");
// //private functions represent the direct api call that our app makes to noaa-buoy
// //public functions are api calls make internally by our app that will be exposed to others.
// class BuoyAPI extends RESTDataSource {
//   constructor() {
//     super();
//     this.baseURL = "https://www.ndbc.noaa.gov/data";
//   }
//   private async getStandardDataByID(id: string): Promise<Object> {
//     const response = await this.get(`/realtime2/${id}.txt`);
//     return response;
//   }
//   standardDataReducer() {}
//   spectralDataReducer() {}
//   buoyDataReducer() {}
//   private async getSpectralDataByID(id: string): Promise<Object> {
//     const response = await this.get(`/realtime2/${id}.spec`);
//     return response;
//   }
//   public async getbyID(id: string): Object {
//     //This should return a Buoy Object eventually
//     const results = await Promise.all([
//       this.getSpectralDataByID(id),
//       this.getStandardDataByID(id),
//     ]);
//     const buoyData = { ...results[0], ...results[1] };
//     return buoyData;
//   }
//   private async getAllLatest(): Promise<Object> {
//     const response = await this.get("/latest_obs/latest_obs.txt");
//     return response;
//   }
//   public async getBuoyByID(id: string) {
//     await this.getSpectralData();
//     await this.getStandardData();
//   }
//   // leaving this inside the class to make the class easier to test
// }
// export default BuoyAPI;
