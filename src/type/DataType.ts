type TDetail = {
  Type?: number;
  Name?: string;
  BetCount?: number;
  Stake?: number;
  Odds?: number | null;
  MatchId?: number;
};

type TTxn = {
  RefId: string;
  ParlayType?: string;
  BetAmount?: number;
  CreditAmount: number;
  DebitAmount: number;
  Detail?: TDetail[];
  TxId?: { $numberLong: string } | number;
  LicenseeTxId?: string;
  ActualAmount?: number;
  IsOddsChanged?: boolean;
  WinlostDate?: string;
  Odds?: number | null;
};

type TTicketDetail = {
  MatchId: number;
  HomeId?: number;
  AwayId?: number;
  HomeName?: string;
  AwayName?: string;
  KickOffTime?: string;
  SportType: number;
  SportTypeName?: string;
  BetType: number;
  BetTypeName?: string;
  OddsId: number;
  Odds: number;
  OddsType: number;
  BetChoice?: string;
  BetChoice_en?: string;
  LeagueId: number;
  LeagueName?: string;
  IsLive: boolean;
  Point?: string;
  Point2?: string;
  BetTeam?: string;
  HomeScore?: number;
  AwayScore?: number;
  BaStatus?: boolean;
  Excluding?: string;
  LeagueName_en?: string;
  SportTypeName_en?: string;
  HomeName_en?: string;
  AwayName_en?: string;
  BetTypeName_en?: string;
  MatchDateTime?: string;
  BetRemark?: string;
  IsOddsChanged?: boolean;
};

type TPlaceBetParlayMessage = {
  Action: string;
  OperationId: string;
  UserId: string;
  Currency: number;
  BetTime: string;
  UpdateTime: string;
  TotalBetAmount: number;
  IP: string;
  TsId: string;
  BetFrom: string;
  CreditAmount: number;
  DebitAmount: number;
  VendorTransId: string | null;
  Txns: TTxn[];
  TicketDetail: TTicketDetail[];
};

type TConfirmBetParlayMessage = {
  Action: string;
  OperationId: string;
  UserId: string;
  UpdateTime: string;
  CreditAmount: number;
  DebitAmount: number;
  Txns: TTxn[];
  TicketDetail: TTicketDetail[];
  TransactionTime: string;
};

type TPlaceBetMessage = {
  Action: string;
  OperationId: string;
  UserId: string;
  Currency: number;
  MatchId: number;
  HomeId: number;
  AwayId: number;
  HomeName: string;
  AwayName: string;
  KickOffTime: string;
  BetTime: string;
  BetAmount: number;
  ActualAmount: number;
  SportType: number;
  SportTypeName: string;
  BetType: number;
  BetTypeName: string;
  OddsType: number;
  OddsId: number;
  Odds: number;
  BetChoice: string;
  BetChoice_en: string;
  UpdateTime: string;
  LeagueId: number;
  LeagueName: string;
  LeagueName_en: string;
  SportTypeName_en: string;
  HomeName_en: string;
  AwayName_en: string;
  BetTypeName_en: string;
  IP: string;
  IsLive: boolean;
  RefId: string;
  TsId: string;
  Point: string;
  Point2: string;
  BetTeam: string;
  HomeScore: number;
  AwayScore: number;
  BaStatus: boolean;
  Excluding: string;
  BetFrom: string;
  CreditAmount: number;
  DebitAmount: number;
  OddsInfo: string;
  MatchDateTime: string;
  BetRemark: string;
  VendorTransId: string | null;
  MmrPercentage: number | null;
  Voucher: string | null;
};

type TConfirmBetMessage = {
  Action: string;
  OperationId: string;
  UserId: string;
  UpdateTime: string;
  TransactionTime: string;
  Txns: TTxn[];
};

type TCancelBetMessage = {
  Action: string;
  UserId: string;
  OperationId: string;
  UpdateTime: string;
  ErrorMessage: string;
  Txns: TTxn[];
};

type TGetBalanceMessage = {
  Action: string;
  UserId: string;
};

type TSettleMessage = {
  Action: string;
  OperationId: string;
  Txns: TTxn[];
};

type TReSettleMessage = {
  Action: string;
  OperationId: string;
  Txns: TTxn[];
};

type TUnSettleMessage = {
  Action: string;
  OperationId: string;
  Txns: TTxn[];
};

type TPlaceBetParlay = {
  key: string;
  message: TPlaceBetParlayMessage;
};

type TConfirmBetParlay = {
  key: string;
  message: TConfirmBetParlayMessage;
};

type TPlaceBet = {
  key: string;
  message: TPlaceBetMessage;
};

type TConfirmBet = {
  key: string;
  message: TConfirmBetMessage;
};

type TCancelBet = {
  key: string;
  message: TCancelBetMessage;
};

type TGetBalance = {
  key: string;
  message: TGetBalanceMessage;
};

type TSettle = {
  key: string;
  message: TSettleMessage;
};

type TReSettle = {
  key: string;
  message: TReSettleMessage;
};

type TUnSettle = {
  key: string;
  message: TUnSettleMessage;
};

type TData = {
  PlaceBetParlay: TPlaceBetParlay;
  ConfirmBetParlay: TConfirmBetParlay;
  PlaceBet: TPlaceBet;
  ConfirmBet: TConfirmBet;
  CancelBet: TCancelBet;
  GetBalance: TGetBalance;
  Settle: TSettle;
  ReSettle: TReSettle;
  UnSettle: TUnSettle;
};

export type {
  TDetail,
  TTxn,
  TTicketDetail,
  TPlaceBetParlayMessage,
  TConfirmBetParlayMessage,
  TPlaceBetMessage,
  TConfirmBetMessage,
  TCancelBetMessage,
  TGetBalanceMessage,
  TSettleMessage,
  TReSettleMessage,
  TUnSettleMessage,
  TPlaceBetParlay,
  TConfirmBetParlay,
  TPlaceBet,
  TConfirmBet,
  TCancelBet,
  TGetBalance,
  TSettle,
  TReSettle,
  TUnSettle,
  TData,
};
