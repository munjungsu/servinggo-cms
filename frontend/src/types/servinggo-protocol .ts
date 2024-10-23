// Enums

export enum ResultCode {
    Success = 200,
    Accepted = 202,
    NoContent = 204,
    AlreadyReported = 208,

    // 3xx: Redirection
    MultipleChoices = 300,
    Redirection = 302,
    TemporaryRedirect = 307,

    // 4xx: Client Error
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    PreconditionFailed = 412,
    RequestEntityTooLarge = 413,
    RequestedRangeNotSatisfiable = 416,
    AccountUnverified = 417,
    RestrictedFromCountry = 418,
    AccountBlocked = 419,

    UnprocessableEntity = 422,
    Locked = 423,
    FailedMethod = 424,
    UpgradeRequired = 426,
    PreconditionRequired = 428,
    TooManyRequest = 429,
    RequestHeadersTooLarge = 431,
    UnavailableForLegalReasons = 451,
    TemporarilyUnavailable = 480,
    ChannelNotFound = 481,
    BusyHere = 486,
    RequestTerminated = 487,
    InvalidSession = 488,

    // 5xx: Server Error
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    VersionNotSupported = 505,
    BandwidthLimitExceeded = 509,
}

export enum DisconnectType {
    None = 0,
    SignOut,
    SocketDisconnect,
    TimeOut,
    Ban,
    Duplicate,
    Shutdown
}

export enum CmsConfigurationKeys {
    None = 0,
    CallLifeTime,
    CdnServerUrl,
}

export enum CallPreferenceType {
    Normal = 0,
    Favorite,
    Hate,
}

export enum CallDeviceType {
    None = 0,
    Bell,
    TableOrder,
    Etc,
}

export enum RobotState {
    None = 0,
    Ready,
    Going,
    Arrived,
    Emergency,
}

export enum RobotMode {
    None = 0,
    Serving,
    Calling,
    Cruising,
}

export enum AvoidType {
    StopAndGo = 0,
    Avoid1,
    Avoid2,
}

export enum MapNodeType {
    None = 0,
    Home,
    Charging,
}

// Models
export class CallBase {
    no: number = 0;
    type: CallDeviceType = CallDeviceType.None;
    serialNo: string = "";
    createdAt: Date = new Date();
}

export class Call extends CallBase {
    mapNode: MapNode = new MapNode();
}

export class CmsAccount {
    no: number = 0;
    id: string = "";
    grade: number = 0;
    createdAt: Date = new Date();
    lastLoggedInAt: Date = new Date();
}

export class CmsConfiguration {
    key: string = "";
    value: string = "";
}

export class MapNodeBase {
    no: number = 0;
    index: number = 0;
}

export class MapNode extends MapNodeBase {
    name: string = "";
    type: MapNodeType = MapNodeType.None;
}

export class MapBase {
    no: number = 0;
    name: string = "";
    hash: string = "";
}

export class Map extends MapBase {
    mapNodeList: MapNode[] = [];
}

export class Order {
    private static _genId: number = 1;
    no: number = 0;
    call: Call = new Call();
    createdAt: Date = new Date();
}

export class RobotBaseInfo {
    no: number = 0;
    id: string = "";
}

export class RobotProperty {
    selectedMapNo: number = 0;
    mappingPassword: string = "";
}

export class RobotStatus {
    state: RobotState = RobotState.None;
    mode: RobotMode = RobotMode.None;
    battery: number = 0;
    pause: boolean = false;
    ems: number = 0;
    trayCount: number = 0;
    brightness: number = 0;
    volume: number = 0;
    voice: string = "";
    alert: string = "";
    music: string = "";
    speed: number = 0;
    avoid: AvoidType = AvoidType.StopAndGo;
}

export class RobotProfile {
    model: string = "";
    board: string = "";
    rgbdCam: string = "";
    motorDriver: string = "";
    wheel: string = "";
    imu: string = "";
    frontDisplay: boolean = false;
    network: string = "";
}

export class RobotPathInfo {
    destNode: MapNode = new MapNode();
    progress: number = 0;
    restNodeIndexList: number[] = [];
}

export class RobotDefaultSummary {
    robotBaseInfo: RobotBaseInfo = new RobotBaseInfo();
    robotProperty: RobotProperty = new RobotProperty();
    robotStatus: RobotStatus = new RobotStatus();
    orderList: Order[] = [];
    robotPathInfo: RobotPathInfo = new RobotPathInfo();
}

export class RobotDetailSummary extends RobotDefaultSummary {
    robotProfile: RobotProfile = new RobotProfile();
    favoriteCallList: Call[] = [];
    normalCallList: Call[] = [];
    hateCallList: Call[] = [];
}

// Protocols
export interface IPublish {
    protocolId: number;
}

export interface ISubscribe {
    protocolId: number;
    result: ResultCode;
    description: string;
}

export interface INotify {
    protocolId: number;
}

export class Request {
    protocolId: number = 0;
}

export class NotifyBaseParameter {
    protocolId: number = 0;
}

export class BaseResponse {
    protocolId: number = 0;
    result: ResultCode = ResultCode.Success;
    description: string = "";
}

export class PageRequest extends Request {
    page: number = 0;
    pageSize: number = 10;

    get skip(): number {
        return this.page * this.pageSize;
    }
}

// Cms Protocol

// Common
export class VersionRes extends BaseResponse {
    origin: string = "";
    endpoint: string = "";
    environment: string = "";
    assemblyVersion: string = "";
    fileVersion: string = "";
    version: string = "";
}

// AuthorityController
export class CmsSignUpReq {
    id: string = "";
    password: string = "";
}

export class CmsSignUpRes extends BaseResponse {
    cmsAccount: CmsAccount = new CmsAccount();
}

export class CmsWithdrawReq {
    robotNo: number = 0;
    robotId: string = "";
}

export class CmsWithdrawRes extends BaseResponse { }

export class CmsSignInReq {
    id: string = "";
    password: string = "";
}

export class CmsSignInRes extends BaseResponse {
    no: number = 0;
}

export class CmsSignOutReq {
    id: string = "";
    password: string = "";
}

export class CmsSignOutRes extends BaseResponse {
    no: number = 0;
}

// CallDeviceController
export class GetAllCallListRes extends BaseResponse {
    callList: Call[] = [];
}

export class GetRegCallDeviceRes extends BaseResponse {
    call: CallBase = new CallBase();
    unAllocateMapList: Map[] = [];
}

export class RegCallDeviceReq {
    call: Call = new Call();
}

export class RegCallDeviceRes extends BaseResponse {
    call: Call = new Call();
}

export class UpdateCallDeviceReq {
    call: Call = new Call();
}

export class UpdateCallDeviceRes extends BaseResponse {
    call: Call = new Call();
}

export class RemoveCallDeviceReq {
    callDeviceNo: number[] = [];
}

export class RemoveCallDeviceRes extends BaseResponse { }

// ManagementController
export class GetRobotRecencyVersionRes extends BaseResponse {
    dummy: string = "Dummy";
}

// RobotController
export class GetRobotReq {
    robotNo: number = 0;
}

export class GetRobotRes extends BaseResponse {
    robotDetailSummary: RobotDetailSummary = new RobotDetailSummary();
}

export class GetAllRobotListRes extends BaseResponse {
    robotDetailSummaryList: RobotDetailSummary[] = [];
}

export class RobotGoHomeReq {
    robotNo: number = 0;
}

export class RobotGoHomeRes extends BaseResponse {
    robotDetailSummary: RobotDetailSummary = new RobotDetailSummary();
}

export class RobotPauseReq {
    robotNo: number = 0;
}

export class RobotPauseRes extends BaseResponse {
    robotDetailSummary: RobotDetailSummary = new RobotDetailSummary();
}

export class RobotWithdrawReq {
    robotNo: number = 0;
    robotId: string = "";
}

export class RobotWithdrawRes extends BaseResponse { }

// MapNodeController
export class GetAllMapListRes extends BaseResponse {
    mapList: Map[] = [];
}

export class GetMapNodeListReq {
    mapNo: number = 0;
}

export class GetMapNodeListRes extends BaseResponse {
    nodeList: MapNode[] = [];
}

export class ChangeCallPreferenceReq {
    robotNo: number = 0;
    favoriteCallList: Call[] = [];
    hateCallList: Call[] = [];
}

export class ChangeCallPreferenceRes extends BaseResponse {
    robotDetailSummary: RobotDetailSummary = new RobotDetailSummary();
}

// OrderController
export class GetOrderListRes extends BaseResponse {
    orderList: Order[] = [];
}

export class OrderAllocateReq {
    robotNo: number = 0;
    orderNo: number = 0;
}

export class OrderAllocateRes extends BaseResponse {
    robotDefaultSummary: RobotDefaultSummary = new RobotDefaultSummary();
    orderList: Order[] = [];
}

export class OrderDeallocateReq {
    robotNo: number = 0;
    orderNo: number = 0;
}

export class OrderDeallocateRes extends BaseResponse {
    robotDefaultSummary: RobotDefaultSummary = new RobotDefaultSummary();
    orderList: Order[] = [];
}
