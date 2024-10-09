import UrlRepository from "@/repositories/UrlRepository";
import { customAlphabet } from "nanoid";

export class UrlShortenerService {
  private urlRepository;
  constructor() {
    this.urlRepository = new UrlRepository();
  }

  async shortenUrl(
    originalUrl?: string,
    shortPart?: string | null
  ): Promise<string> {
    if (!originalUrl) {
      return "";
    }

    let url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
    if (url) {
      return url.shortUrl;
    }

    let shortUrl = shortPart;

    if (!shortPart) {
      const nanoid = customAlphabet(originalUrl.replace(/\W/g, ""), 5);
      shortUrl = nanoid();
      url = await this.urlRepository.getUrlByShortUrl(shortUrl);

      while (url) {
        shortUrl = nanoid();
        url = await this.urlRepository.getUrlByShortUrl(shortUrl);
      }
    }

    await this.urlRepository.createUrl(originalUrl, `/${shortUrl}`);

    return shortUrl || "";
  }

  async getAllUrls() {
    return await this.urlRepository.getAllUrls();
  }

  async getUrlByShortUrl(shortUrl: string) {
    return await this.urlRepository.getUrlByShortUrl(shortUrl);
  }

  async getUrlById(id: string) {
    return await this.urlRepository.getUrlById(id);
  }

  async deleteUrlById(id: string) {
    return await this.urlRepository.deleteUrl(id);
  }

  async incrementVisitsCount(id: string) {
    const url = await this.urlRepository.getUrlById(id);
    if (url) {
      return await this.urlRepository.updateUrl(id, {
        visits: url.visits + 1,
      });
    }
  }
}
