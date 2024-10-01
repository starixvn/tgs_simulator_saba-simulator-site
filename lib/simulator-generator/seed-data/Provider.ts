export enum Provider {
  JILI = "JILI",
  FACHAI = "FACHAI",
  UUSLOTS = "UUSLOTS",
  FS = "FS",
  SBPLAY = "SBPLAY",
  WE = "WE",
  ALLBET = "ALLBET",
  PP = "PP",
  MAXPLAY = "MAXPLAY",
  LIVE22 = "LIVE22",
  SIMULATOR = "SIM",
}

export enum GameType {
  SIMULATOR = "Simulator",
  MAXGAME = "MaxGame",
  KENO = "Keno",
  LOTTERY = "Lottery",
  TABLEGAME = "TableGame",
  SABAPLAY = "SabaPlay",
  LIVE22 = "Live22",
  FACHAI = "FaChai",
  FS = "FastSpin",
  PRAGMATIC_PLAY = "PragmaticPlay",
  PRAGMATIC_PLAY_CASINO = "PragmaticPlayCasino",
  UUSLOTS = "UuSlots",
  WORLDENTERTAINMENT = "WorldEntertainment",
  GTLIVE = "GTLive",
  ALLBET = "AllBet",
  SEXYCASINO = "SexyCasino",
  JILI = "JiLi"
}

export const ProviderGameTypes = {
  [Provider.SIMULATOR]: [GameType.SIMULATOR],
  [Provider.ALLBET]: [GameType.ALLBET],
  [Provider.FACHAI]: [GameType.FACHAI],
  [Provider.FS]: [GameType.FS],
  [Provider.JILI]: [GameType.JILI],
  [Provider.LIVE22]: [GameType.LIVE22],
  [Provider.MAXPLAY]: [GameType.KENO, GameType.LOTTERY, GameType.MAXGAME, GameType.TABLEGAME],
  [Provider.PP]: [GameType.PRAGMATIC_PLAY, GameType.PRAGMATIC_PLAY_CASINO],
  [Provider.SBPLAY]: [GameType.SABAPLAY],
  [Provider.UUSLOTS]: [GameType.UUSLOTS],
  [Provider.WE]: [GameType.WORLDENTERTAINMENT],
};