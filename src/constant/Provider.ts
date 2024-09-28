export const Provider = {
  UUSLOTS: "UUSLOTS",
  FS: "FS",
  SBPLAY: "SBPLAY",
  WE: "WE",
  ALLBET: "ALLBET",
  PP: "PP",
  MAXPLAY: "MAXPLAY",
  LIVE22: "LIVE22",
};

export const GameType = {
  ALLBET: "AllBet",
  FS: "FastSpin",
  LIVE22: "Live22",
  KENO: "Keno",
  LOTTERY: "Lottery",
  MAXGAME: "MaxGame",
  TABLEGAME: "TableGame",
  PRAGMATICPLAY: "PragmaticPlay",
  PRAGMATICPLAYCASINO: "PragmaticPlayCasino",
  FA_CHAI: "FaChai",
  JILI: "JiLi",
  SABAPLAY: "SabaPlay",
  UUSLOTS: "UuSlots",
  WORLD_ENTERTAINMENT: "WorldEntertainment",
};

export   const ProviderGameTypes = {
  [Provider.ALLBET]: [GameType.ALLBET],
  [Provider.FS]: [GameType.FS],
  [Provider.LIVE22]: [GameType.LIVE22],
  [Provider.MAXPLAY]: [GameType.KENO, GameType.LOTTERY, GameType.MAXGAME, GameType.TABLEGAME],
  [Provider.PP]: [GameType.ALLBET, GameType.PRAGMATICPLAY, GameType.PRAGMATICPLAYCASINO],
  [Provider.SBPLAY]: [
    GameType.PRAGMATICPLAYCASINO,
    GameType.SABAPLAY,
    GameType.TABLEGAME,
    GameType.UUSLOTS,
    GameType.WORLD_ENTERTAINMENT
  ],
  [Provider.UUSLOTS]: [GameType.UUSLOTS],
  [Provider.WE]: [GameType.WORLD_ENTERTAINMENT]
};

export const ProviderWithGameTypeRequest = {
  [Provider.ALLBET]: {
    [GameType.ALLBET]: {
      TimeStamp: "2024/09/26 08:51:45.563",
      Seq: "cd165b3c-8321-4b26-a6b4-2f6e5f7fbb7d",
      Payload: {
        OperatorCustId: "4uo2mvesdzyn_test",
        WalletSideToken:
          "SABAPLUS-ALLBET@8300002@e85109c9-8c88-4ce3-84a5-e2b222cd9509",
        GameType: "AllBet",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "2407|$|4uo2mvesdzyn_test|$|465030024|$|4650300249141157",
            GameId: "2407",
            GameRoundId: "465030024",
            TransactionId: "4650300249141157",
            Stake: 100,
            ActualStake: 1100,
            Odds: 10.45,
            BetChoice: "BB_PLAYER1_SPR",
            TableCode: "BB001",
            OtherBetInfo: {
              VendorTranId: "1839226340440752128",
            },
          },
        ],
        GameProviderCode: "SABAPLUS-ALLBET",
      },
    },
  },
  [Provider.FS]: {
    [GameType.FS]: {
      TimeStamp: "2024/09/26 04:09:02.727",
      Seq: "ae89f80b-008c-4304-a5a5-ae5a939e842d",
      Payload: {
        OperatorCustId: "4uo2afsv3vl0_test",
        WalletSideToken:
          "SABAPLUS-FS@8100033@5528b689-09bd-4be9-acd3-df4fefda21d2",
        GameType: "FastSpin",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "11118|$|4uo2afsv3vl0_test|$|20240926120902713146811",
            GameId: "11118",
            GameRoundId: "20240926120902713146811",
            TransactionId: null,
            Stake: 40,
            ActualStake: 40,
            Odds: 0,
            BetChoice: null,
            TableCode: null,
            OtherBetInfo: null,
          },
        ],
        GameProviderCode: "SABAPLUS-FS",
      },
    },
  },
  [Provider.LIVE22]: {
    [GameType.LIVE22]: {
      TimeStamp: "2024/09/25 11:04:35.009",
      Seq: "e3d41017-4014-4033-a835-8da8d5ed188c",
      Payload: {
        OperatorCustId: "4uo2mvesdzyn_test",
        WalletSideToken:
          "SABAPLUS-LIVE22@8600004@e845ea48-d4f4-4bf6-aca0-d832c76e6143",
        GameType: "Live22",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "7604|$|4uo2mvesdzyn_test|$|255869974",
            GameId: "7604",
            GameRoundId: "255869974",
            TransactionId: null,
            Stake: 0.2,
            ActualStake: 0.2,
            Odds: 0,
            BetChoice: null,
            TableCode: null,
            OtherBetInfo: null,
          },
        ],
        GameProviderCode: "SABAPLUS-LIVE22",
      },
    },
  },
  [Provider.UUSLOTS]: {
    [GameType.UUSLOTS]: {
      TimeStamp: "2024/09/28 05:47:46.770",
      Seq: "c7c44420-b793-4776-b0b9-33b0d8970778",
      Payload: {
        OperatorCustId: "4uo2mw1jmaps_test",
        WalletSideToken:
          "SABAPLUS-UUSLOTS@9900011@62739033-d17b-4d71-ab6f-f8baefc53381",
        GameType: "UuSlots",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "10009|$|4uo2mw1jmaps_test|$|258144222",
            GameId: "10009",
            GameRoundId: "258144222",
            TransactionId: null,
            Stake: 0.1,
            ActualStake: 0.1,
            Odds: 0,
            BetChoice: null,
            TableCode: null,
            OtherBetInfo: null,
          },
        ],
        GameProviderCode: "SABAPLUS-UUSLOTS",
      },
    },
  },
  [Provider.WE]: {
    [GameType.WORLD_ENTERTAINMENT]: {
      TimeStamp: "2024/09/26 09:00:20.032",
      Seq: "d733c283-1cb2-4702-b935-55327a34407b",
      Payload: {
        OperatorCustId: "4uo2mvesdzyn_test",
        WalletSideToken:
          "SABAPLUS-WE@8700001@b401b94b-4275-40fb-9ad9-7e3a501c93fc",
        GameType: "WorldEntertainment",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo:
              "10301|$|4uo2mvesdzyn_test|$|a6cae7f8-4b0e-4c53-acb4-b155821c7060",
            GameId: "10301",
            GameRoundId: "MBASVN240926F17R0035",
            TransactionId: "a6cae7f8-4b0e-4c53-acb4-b155821c7060",
            Stake: 10,
            ActualStake: 10,
            Odds: 8,
            BetChoice: "BAC_TIE",
            TableCode: "STUDIO-BAS-71",
            OtherBetInfo: null,
          },
          {
            TicketNo:
              "10301|$|4uo2mvesdzyn_test|$|1bd13ff3-5673-46a5-916d-64becbca6bfa",
            GameId: "10301",
            GameRoundId: "MBASVN240926F17R0035",
            TransactionId: "1bd13ff3-5673-46a5-916d-64becbca6bfa",
            Stake: 10,
            ActualStake: 10,
            Odds: 1,
            BetChoice: "BAC_PLAYER",
            TableCode: "STUDIO-BAS-71",
            OtherBetInfo: null,
          },
        ],
        GameProviderCode: "SABAPLUS-WE",
      },
    },
  },
  [Provider.MAXPLAY]: {
    [GameType.KENO]: {
      TimeStamp: "09/27/2024 10:09:05",
      Seq: "df810cb2-3509-4c61-8e7f-fede103edebe",
      Payload: {
        OperatorCustId: "4uo2mwf6dow8_test",
        WalletSideToken:
          "SABAPLUS-MAXPLAY@7600023@5e195248-d3f6-41ce-b20e-274072475ee8",
        GameType: "Keno",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo:
              "1516|$|4uo2mwf6dow8_test|$|13388853|$|304075635691618304",
            GameId: "1516",
            GameRoundId: "13388853",
            TransactionId: "304075635691618304",
            Stake: 12,
            ActualStake: 12,
            Odds: 1.96,
            BetChoice: "SUM_BS_BIG",
            TableCode: "",
            OtherBetInfo: {
              EventDate: "2024-09-27",
            },
          },
        ],
        GameProviderCode: "SABAPLUS-MAXPLAY",
      },
    },
    [GameType.LOTTERY]: {
      TimeStamp: "09/26/2024 10:16:17",
      Seq: "3d0676f2-f0d8-41b7-847e-d19703554637",
      Payload: {
        OperatorCustId: "4uo2mwf6dow8_test",
        WalletSideToken:
          "SABAPLUS-MAXPLAY@7600055@577bbc37-9f30-43f0-acfc-19633c26a45c",
        GameType: "Lottery",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo:
              "1038|$|4uo2mwf6dow8_test|$|35183816|$|303706405943115776",
            GameId: "1038",
            GameRoundId: "35183816",
            TransactionId: "303706405943115776",
            Stake: 1,
            ActualStake: 1,
            Odds: 30,
            BetChoice: "DICE_BST_TRIPLE",
            TableCode: "",
            OtherBetInfo: {
              EventDate: "2024-09-26",
            },
          },
        ],
        GameProviderCode: "SABAPLUS-MAXPLAY",
      },
    },
    [GameType.MAXGAME]: {
      TimeStamp: "2024/09/28 06:28:37.541",
      Seq: "28ca6b16-bbf6-4e43-bd7a-1c69e40f2194",
      Payload: {
        OperatorCustId: "4uo2mvesdzyn_test",
        WalletSideToken:
          "SABAPLUS-MAXPLAY@7600001@72a27fda-31df-4dff-acba-38e67c029d08",
        GameType: "MaxGame",
        IpAddress: "202.78.231.34",
        BetDataSet: [
          {
            TicketNo: "5402|$|4uo2mvesdzyn_test|$|5402_30687081",
            GameId: "5402",
            GameRoundId: "5402_30687081",
            TransactionId: null,
            Stake: 10,
            ActualStake: 10,
            Odds: 0,
            BetChoice: null,
            TableCode: null,
            OtherBetInfo: null,
          },
        ],
        GameProviderCode: "SABAPLUS-MAXPLAY",
      },
    },
    [GameType.TABLEGAME]: {
      TimeStamp: "09/25/2024 06:14:32",
      Seq: "186863a8-1d90-435f-bdc2-ccd53aa2519c",
      Payload: {
        OperatorCustId: "4uo2x8xxn1cr_test",
        WalletSideToken:
          "SABAPLUS-MAXPLAY@7600019@669ae42b-5ec8-4175-95fb-2161dc996327",
        GameType: "TableGame",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo:
              "4908|$|4uo2x8xxn1cr_test|$|35090656|$|303273022268112896",
            GameId: "4908",
            GameRoundId: "35090656",
            TransactionId: "303273022268112896",
            Stake: 10,
            ActualStake: 10,
            Odds: 2,
            BetChoice: "BAC_BANKER",
            TableCode: "",
            OtherBetInfo: {
              EventDate: "2024-09-25",
            },
          },
        ],
        GameProviderCode: "SABAPLUS-MAXPLAY",
      },
    },
  },
  [Provider.PP]: {
    [GameType.ALLBET]: {
      TimeStamp: "2024/09/25 08:24:46.520",
      Seq: "12ceaefe-6fda-4361-9374-37552fa325a3",
      Payload: {
        OperatorCustId: "4uo2mvoa86vs_test",
        WalletSideToken:
          "SABAPLUS-PP@7900362@a8eb32f4-9b2e-4221-be5a-8df7e1632913",
        GameType: "AllBet",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "2401|$|4uo2mvoa86vs_test|$|464940572|$|4649405721380554",
            GameId: "2401",
            GameRoundId: "464940572",
            TransactionId: "4649405721380554",
            Stake: 100,
            ActualStake: 100,
            Odds: 1,
            BetChoice: "BAC_PLAYER",
            TableCode: "IB001",
            OtherBetInfo: {
              VendorTranId: "1838857162340909056",
            },
          },
        ],
        GameProviderCode: "SABAPLUS-PP",
      },
    },
    [GameType.PRAGMATICPLAY]: {
      TimeStamp: "2024/09/28 05:45:26.376",
      Seq: "65f760816eb6448d8ce0904d06561fa1",
      Payload: {
        OperatorCustId: "4uo2mw1jmaps_test",
        WalletSideToken:
          "SABAPLUS-PP@7900187@796b93b5-e2b6-4763-a13b-5ab673324eb3",
        GameType: "PragmaticPlay",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "4138|$|4uo2mw1jmaps_test|$|665919509000",
            GameId: "4138",
            GameRoundId: "665919509000",
            TransactionId: null,
            Stake: 0.5,
            ActualStake: 0.5,
            Odds: 0,
            BetChoice: null,
            TableCode: null,
            OtherBetInfo: {
              ContributionAmount: "0",
              ContributionRate: "0",
            },
          },
        ],
        GameProviderCode: "SABAPLUS-PP",
      },
    },
    [GameType.PRAGMATICPLAYCASINO]: {
      TimeStamp: "2024/09/28 05:56:24.332",
      Seq: "f134b854-5733-4b40-bd32-36f6edf18272",
      Payload: {
        OperatorCustId: "4uo2mw1jmaps_test",
        WalletSideToken:
          "SABAPLUS-PP@7900396@fd9fa069-e473-4569-8633-ac3c836500de",
        GameType: "PragmaticPlayCasino",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "3748|$|4uo2mw1jmaps_test|$|27567116201008",
            GameId: "3748",
            GameRoundId: "27567116201008",
            TransactionId: "66f79a888d8449214762b641",
            Stake: 180,
            ActualStake: 180,
            Odds: 0,
            BetChoice: null,
            TableCode: null,
            OtherBetInfo: null,
          },
        ],
        GameProviderCode: "SABAPLUS-PP",
      },
    },
  },
  [Provider.SBPLAY]: {
    [GameType.PRAGMATICPLAYCASINO]: {
      TimeStamp: "2024/09/27 08:57:07.038",
      Seq: "44526f37-88e3-48ef-afd3-44453674bb7b",
      Payload: {
        OperatorCustId: "4uo3hn5wkpsb",
        WalletSideToken:
          "SABAPLUS-SBPLAY@8400002@a069fb99-fec6-4451-8fb3-e5cc64014692",
        GameType: "PragmaticPlayCasino",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "3747|$|4uo3hn5wkpsb|$|27559235601008",
            GameId: "3747",
            GameRoundId: "27559235601008",
            TransactionId: "66f67362efe02f3f4b7879f9",
            Stake: 2.4,
            ActualStake: 2.4,
            Odds: 0,
            BetChoice: null,
            TableCode: null,
            OtherBetInfo: null,
          },
        ],
        GameProviderCode: "SABAPLUS-SBPLAY",
      },
    },
    [GameType.SABAPLAY]: {
      TimeStamp: "2024/09/28 06:29:53.107",
      Seq: "c8566317-ea43-43e6-97c2-215082050f38",
      Payload: {
        OperatorCustId: "4uo2x8xxn1cr_test",
        WalletSideToken:
          "SABAPLUS-SBPLAY@8400001@208e9141-539a-4fbe-88f9-1a3059c373a3",
        GameType: "SabaPlay",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "Nb|$|3803|$|4uo2x8xxn1cr_test|$|3410268",
            GameId: "3803",
            GameRoundId: "3410268",
            TransactionId: null,
            Stake: 100,
            ActualStake: 100,
            Odds: 0,
            BetChoice: null,
            TableCode: null,
            OtherBetInfo: {
              FreeBet: "False",
              FreeSpin: "False",
              ContributionAmount: "0.0",
              ContributionRate: "0.0",
            },
          },
        ],
        GameProviderCode: "SABAPLUS-SBPLAY",
      },
    },
    [GameType.UUSLOTS]: {
      TimeStamp: "2024/09/20 07:42:40.120",
      Seq: "c3f7edb3-d1d0-48c4-b806-fdff5f6a22b7",
      Payload: {
        OperatorCustId: "4uo3hn5wkpsb",
        WalletSideToken:
          "SABAPLUS-SBPLAY@8400002@a069fb99-fec6-4451-8fb3-e5cc64014692",
        GameType: "UuSlots",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo: "10000|$|4uo3hn5wkpsb|$|252217408",
            GameId: "10000",
            GameRoundId: "252217408",
            TransactionId: null,
            Stake: 0.2,
            ActualStake: 0.2,
            Odds: 0,
            BetChoice: null,
            TableCode: null,
            OtherBetInfo: null,
          },
        ],
        GameProviderCode: "SABAPLUS-SBPLAY",
      },
    },
    [GameType.WORLD_ENTERTAINMENT]: {
      TimeStamp: "2024/09/26 07:25:23.281",
      Seq: "e5ee3894-97ef-4de3-a8ae-7b39134964fd",
      Payload: {
        OperatorCustId: "4uo3hn5wkpsb",
        WalletSideToken:
          "SABAPLUS-SBPLAY@8400002@a069fb99-fec6-4451-8fb3-e5cc64014692",
        GameType: "WorldEntertainment",
        IpAddress: "120.72.109.34",
        BetDataSet: [
          {
            TicketNo:
              "10307|$|4uo3hn5wkpsb|$|871a8ec8-4092-415e-9b4f-b3f9ec9b022f",
            GameId: "10307",
            GameRoundId: "VBAA03240926F11R0041",
            TransactionId: "871a8ec8-4092-415e-9b4f-b3f9ec9b022f",
            Stake: 1,
            ActualStake: 1,
            Odds: 1,
            BetChoice: "BAC_PLAYER",
            TableCode: "STUDIO-BAA-82",
            OtherBetInfo: null,
          },
        ],
        GameProviderCode: "SABAPLUS-SBPLAY",
      },
    },
  },
};
