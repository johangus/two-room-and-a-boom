import type { NextApiRequest, NextApiResponse } from "next";
import { getPlayerRoles } from "../../../../../../services/gameService";
import { Role } from "../../../../../../types/domain";
import { ErrorDTO } from "../../../../../../types/dto";

export default function playerRoleHandler(
  req: NextApiRequest,
  res: NextApiResponse<Role[] | ErrorDTO>
) {
  if (req.method === "GET") {
    const gameId = req.query.gameId as string;
    const playerId = req.query.playerId as string;

    return getPlayerRoles(gameId, playerId)
      .then((roles) => res.status(200).json(roles))
      .catch((err) => {
        res
          .status(404)
          .json({ message: `Unable get the role: ${err?.message ?? err}` });
      });
  } else {
    res.status(404).json({ message: "Method not supported" });
  }
}
