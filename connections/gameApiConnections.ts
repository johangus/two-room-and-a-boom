import { Game, Role, Player } from "../types/domain";
import { GameUpdateDTO, NewGameDTO, TransferPlayerRoleDTO } from "../types/dto";

export const getGames = () => {
  return fetch(`/api/games`, {
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (res.ok) {
      return res.json() as Promise<Game[]>;
    } else {
      throw await res.text();
    }
  });
};

export const getGame = (gameId: string) => {
  return fetch(`/api/games/${gameId}`, {
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (res.ok) {
      return res.json() as Promise<Game>;
    } else {
      throw await res.text();
    }
  });
};

export const getPlayerRoles = (gameId: string, playerId: string) => {
  return fetch(`/api/games/${gameId}/players/${playerId}/roles`, {
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Role[];
    } else {
      throw await res.text();
    }
  });
};

export const joinGame = (gameId: string, player: Player) => {
  return fetch(`/api/games/${gameId}/players`, {
    method: "POST",
    body: JSON.stringify(player),
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Game;
    } else {
      throw await res.text();
    }
  });
};

export const startGame = (gameId: string) => {
  return fetch(`/api/games/${gameId}/start`, {
    method: "POST",
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Game;
    } else {
      throw await res.text();
    }
  });
};

export const updateGameRoles = (gameId: string, roleIds: string[]) => {
  const payload: GameUpdateDTO = {
    roleIds,
  };
  return fetch(`/api/games/${gameId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Game;
    } else {
      throw await res.text();
    }
  });
};

export const createGame = async (game: NewGameDTO) => {
  const res = await fetch("/api/games", {
    method: "POST",
    body: JSON.stringify(game),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    return await res.json();
  } else {
    throw await res.text();
  }
};

export const transferRole = async (
  gameId: string,
  fromPlayerId: string,
  toPlayerId: string,
  roleId: string
) => {
  const data: TransferPlayerRoleDTO = {
    fromPlayerId,
    toPlayerId,
    roleId,
  };
  const res = await fetch(`/api/games/${gameId}/players/transferRole`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    return (await res.json()) as Role[];
  } else {
    throw await res.text();
  }
};
