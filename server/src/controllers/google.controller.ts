import { GoogleService } from "@services/google.service";
import { Request, Response } from "express";

export class GoogleController {
  private googleService: GoogleService;

  constructor() {
    this.googleService = new GoogleService();
  }

  async getSuggestions(req: Request, res: Response) {
    const q: string = req.query.q?.toString() || "";

    if (q == "") return res.send("");
    const suggestions = await this.googleService.getSuggestions(q);

    return res.json({
      suggestions: suggestions,
    });
  }

  async getCoords(req: Request, res: Response) {
    const place_id: string = req.query.place_id?.toString() || "";

    if (place_id == "") return res.send("");

    const coords = await this.googleService.getCoords(place_id);

    return res.json({
      coords
    });
  }
}
