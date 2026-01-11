import { Request, Response } from "express";

export async function getPortfolio(req: Request, res: Response) {
  try {
    const user = req.userId;

    // const portfolio = await createUser(user);

    res.json({
      message: "Success",
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
