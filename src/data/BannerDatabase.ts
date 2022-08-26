import { Banner } from "../model/Banner";
import { BaseDatabase } from "./BaseDatabase";


export class BannerDatabase extends BaseDatabase {

  private static TABLE_NAME = "Banner_Condor";

  public async createNewBanner(banner: Banner): Promise<void> {

    try {
      await this.getConnection()
        .insert({
          banner_id: banner.getId(),
          name: banner.getName(),
          image: banner.getImage(),
          customer_id: banner.getCustomerId(),
          endAt: banner.getEndAt(),
          startAt: banner.getStartAt(),
          status: banner.getStatus()
        })
        .into(BannerDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getAllBanners(): Promise<Banner> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(BannerDatabase.TABLE_NAME)

      return result[0] && Banner.toBannerModel(result[0]);

    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  public async getBannerById(id: string): Promise<Banner> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(BannerDatabase.TABLE_NAME)
        .where({ id });

      return result[0] && Banner.toBannerModel(result[0]);

    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
export default new BannerDatabase()