declare type Chain = 'AELF' | 'tDVV' | 'tDVW';
declare type ChainValue = { label: 'AELF' | 'tDVV' | 'tDVW'; value: string };
declare type Token = { [label: string]: { label: string; value: string; decimals: number; address: string } };

type SourceItemType = {
  value: string | number;
  label: string;
  disabled?: boolean;
  extra?: string | number;
};

type CheckboxItemType = {
  key: FilterKeyEnum;
  title: string;
  maxCount?: number;
  decimals?: number;
  AMOUNT_LENGTH?: number;
  type: FilterType.Checkbox;
  showClearAll?: boolean;
  data: SourceItemType[];
};

type SingleItemType = {
  key: string;
  title: string;
  type: FilterType.Single;
  show?: string;
  data: SourceItemType[];
};

type MultipleItemType = {
  key: string;
  title: string;
  type: FilterType.Multiple;
  show?: string;
  data: SourceItemType[];
};

type RangeItemType = {
  key: FilterKeyEnum;
  title: string;
  maxCount?: number;
  AMOUNT_LENGTH?: number;
  decimals?: number;
  type: FilterType.Range;
  showClearAll?: boolean;
  data?: SourceItemType[];
};

type SearchCheckBoxItemType = {
  key: FilterKeyEnum;
  title: string;
  type: FilterType.SearchCheckbox;
  showClearAll?: boolean;
  data?: SourceItemType[];
  maxCount?: number;
  AMOUNT_LENGTH?: number;
  decimals?: number;
};

declare type WalletInfoType = {
  address: string;
  publicKey?: string;
  token?: string;
  discoverInfo?: DiscoverInfo;
  portkeyInfo?: PortkeyInfo;
  aelfChainAddress?: string;
};

type ItemsSelectSourceType = {
  [x: string]: CheckboxSelectType | RangeSelectType;
};

interface IFilterSelect {
  [FilterKeyEnum.Status]: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.Chain]: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.Symbol]: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.Price]: {
    type: FilterType.Range;
    data: RangeType[];
  };
  [FilterKeyEnum.Generation]: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.Traits]?: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [FilterKeyEnum.ActivityType]?: {
    type: FilterType.Checkbox;
    data: SourceItemType[];
  };
  [key: string]: any;
}
type TagItemType = {
  label: string;
  type: string;
  value?: string | number;
  disabled?: boolean;
};

interface ICompProps {
  dataSource: FilterItemType;
  defaultValue: SourceItemType[] | RangeType[] | undefined;
  onChange: (val: ItemsSelectSourceType) => void;
  clearAll?: () => void;
  disableClearAll?: boolean;
  showSelectAll?: boolean;

  maxCount?: number;
  decimals?: number;
  AMOUNT_LENGTH?: number;
}

interface INftInfo {
  chainId: Chain;
  issueChainId: number;
  issueChainIdStr: Chain;
  description: string | null;
  file: string | undefined;
  fileExtension: string | null;
  id: string;
  isOfficial: boolean;
  issuer: string;
  chainIdStr: string;
  proxyIssuerAddress: string;
  latestDealPrice: number;
  latestDealTime: string;
  latestDealToken: SaleTokens | null;
  latestListingTime: string | null;
  listingAddress: string | null;
  canBuyFlag: boolean;
  showPriceType: NftInfoPriceType;
  listingId: string | null;
  listingPrice: number;
  listingQuantity: number;
  listingEndTime: string | null;
  listingToken: SaleTokens | null;
  maxOfferPrice: number;
  maxOfferEndTime: string | null;
  metadata: MetadataType | null;
  nftSymbol: string;
  nftTokenId: number;
  previewImage: string | null;
  tokenName: string;
  totalQuantity: number;
  uri: string | null;
  whitelistId: string | null;
  price?: number;
  priceDescription?: string;
  whitelistPrice: number;
  whitelistPriceToken: SaleTokens | null;
  minter: ICreator | null;
  owner: ICreator | null;
  realOwner?: ICreator | null;
  decimals: string | number;
  nftCollection: {
    chainId: Chain;
    creator: ICreator;
    creatorAddress: string;
    description: string | null;
    featuredImage: string | null;
    id: string;
    isBurnable: boolean;
    isOfficial: boolean;
    issueChainId: number;
    logoImage: string | null;
    metadata: MetadataType | null;
    symbol: string;
    tokenName: string;
    totalSupply: number;
    baseUrl: string;
  } | null;
  createTokenInformation: {
    category: string | null;
    tokenSymbol: string | null;
    expires: number | null;
    registered: number | null;
  } | null;
  alias?: string;
  ownerCount: number;
  inscriptionInfo?: {
    tick?: string;
    issuedTransactionId?: string;
    deployTime?: number;
    mintLimit?: number;
  };
  describe?: string;
  rarity?: string;
  level?: string;
  generation: number;
  traitPairsDictionary: Array<Pick<ITraitInfo, 'key' | 'value'>>;
  _rankStrForShow?: string;
}

type FormatListingType = {
  price: number;
  quantity: number;
  expiration: string;
  fromName: string;
  ownerAddress: string;
  whitelistHash: string | null;
  purchaseToken: { symbol: string };
  key: string;
  decimals: number;
  startTime: number;
  endTime: number;
};

interface IFixPriceList {
  offerTo: string;
  quantity: number;
  price: IPrice;
  startTime: ITimestamp;
}

declare interface IListParams {
  skipCount?: number;
  maxResultCount?: number;
}
