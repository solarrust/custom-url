import URL, { IURL } from "@/models/Url";
import connectDB from "@/config/db";

export default class UrlRepository {
  private urlModel;
  constructor() {
    connectDB();
    this.urlModel = URL;
  }

  async getUrlById(id: string): Promise<IURL | null> {
    return await this.urlModel.findById(id).lean();
  }

  async getUrlByShortUrl(shortUrl: string): Promise<IURL | null> {
    return await this.urlModel.findOne({ shortUrl }).lean();
  }

  async getUrlByOriginalUrl(originalUrl: string): Promise<IURL | null> {
    return await this.urlModel.findOne({ originalUrl }).lean();
  }

  async getAllUrls(): Promise<IURL[] | null> {
    return await this.urlModel.find().lean();
  }

  async deleteUrl(id: string): Promise<IURL | null> {
    return await this.urlModel.findByIdAndDelete(id).lean();
  }

  async createUrl(originalUrl: string, shortUrl: string): Promise<IURL> {
    return await this.urlModel.create({ originalUrl, shortUrl });
  }

  //TODO: Add updateUrl method
}
