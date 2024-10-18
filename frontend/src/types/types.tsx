export interface Card {
    id: number,
    name: string,
    calls: string[],
}
export interface bells {
    id: string;
    table: string;
    check: boolean;
}
export interface DialogProps {
    open: boolean,
    title: string,
    content: string,
    action: ()=>void,
    onClose?: ()=>void,
}
export enum DisconnectType {
    None = 0,
    SocketDisconnect,
    CheckOut,
    TimeOut,
    Ban,
    Duplicate
}

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
    TooManyRequest = 429,               // Standard Http Error Code
    RequestHeadersTooLarge = 431,       // Standard Http Error Code
    UnavailableForLegalReasons = 451,   // Standard Http Error Code
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

export enum CmsConfigurationKeys {
    None = 0,
    CallLifeTime,
    CdnServerUrl,
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

export enum RobotSignOutReason {
    None = 0,
    SocketDisconnected,
    ForceSignOut,
    DuplicateSignIn,
    Shutdown,
    Restart,
}

export enum AvoidType {
    StopAndGo = 0,
    Avoid1,
    Avoid2,
}

export enum MapNodePreference {
    Normal = 0,
    Favorite,
    Hate,
}


// Models

class Call {
    No: number = 0;
    Type: CallDeviceType = CallDeviceType.None;
    SerialNo: string = "";
    CreatedAt: Date = new Date(Date.now());
    MapNodeNo: number = 0;
}

class CmsAccount {
    No: number = 0;
    Id: string = "";
    Grade: number = 0;
    CreatedAt: Date = new Date(Date.now());
    LastLoggedInAt: Date = new Date(Date.now());
}

class CmsConfiguration {
    Key: string = "";
    Value: string = "";
}

class MapNodeBase {
    No: number = 0;
    Index: number = 0;
}

class MapNode extends MapNodeBase {
    Name: string = "";
    Type: number = 0;
}

class MapBase {
    No: number = 0;
    Name: string = "";
    Hash: string = "";
}

class Map extends MapBase {
    MapNodeList: MapNode[] = [];
}

class DrivingMap extends MapBase {
    Progress: number = 0;
    MapNodeBaseList: MapNodeBase[] = [];
}

class Order {
    private static _genId: number = 1;
    No: number = 0;
    DestNode: MapNode = new MapNode();
    CreatedAt: Date = new Date(Date.now());
}

class RobotDefault {
    No: number = 0; // only server set 
    Id: string = "";
}

class RobotProperty extends RobotDefault {
    SelectedMapNo: number = 0;
    MappingPassword: string = "";
}

class RobotStatus {
    State: RobotState = RobotState.None;
    Mode: RobotMode = RobotMode.None;
    Battery: number = 0;
    Pause: boolean = false;
    Ems: number = 0;
    TrayCount: number = 0;
    Brightness: number = 0;
    Volume: number = 0;
    Voice: string = "";
    Alert: string = "";
    Music: string = "";
    Speed: number = 0;
    Avoid: AvoidType = AvoidType.StopAndGo;
}

class RobotProfile {
    Model: string = "";
    Board: string = "";
    RgbdCam: string = "";
    MotorDriver: string = "";
    Whell: string = "";
    Imu: string = "";
    FrontDiplay: boolean = false;
    Network: string = "";
}

class RobotSummary {
    RobotProperty: RobotProperty = new RobotProperty();
    RobotStatus: RobotStatus = new RobotStatus();
    RobotProfile: RobotProfile = new RobotProfile();

    OrderList: Order[] = [];
    DrivingMap: DrivingMap = new DrivingMap();

    FavoriteNodeList: MapNode[] = [];
    NormalNodeList: MapNode[] = [];
    HateNodeList: MapNode[] = [];
}



// Base Protocol
interface Request {
    //Param?: any;
}

interface NotifyBaseParameter {
}

interface BaseResponse {
    ResultCode: ResultCode;
    Description: string;
}

interface PageRequest extends Request {
    Page: number;
    PageSize: number;
    Skip: number;
}

// Cms
interface VersionRes extends BaseResponse {
    Origin: string;
    Endpoint: string;
    Environment: string;
    AssemblyVersion: string;
    FileVersion: string;
    Version: string;
}

// AuthorityController
interface CmsSignUpReq {
    Id: string;
    Password: string;
}

interface CmsSignUpRes extends BaseResponse {
    CmsAccount: CmsAccount;
}

interface CmsWithdrawReq extends Request {
    RobotNo: number;
    RobotId: string;
}

interface CmsWithdrawRes extends BaseResponse {
}

interface CmsSignInReq {
    Id: string;
    Password: string;
}

interface CmsSignInRes extends BaseResponse {
    No: number;
}

interface CmsSignOutReq {
    Id: string;
    Password: string;
}

interface CmsSignOutRes extends BaseResponse {
    No: number;
}

// CallDeviceController
interface GetAllCallListRes extends BaseResponse {
    CallList: Call[];
}

interface GetRegCallDeviceRes extends BaseResponse {
    Call: Call;
}

interface RegCallDeviceReq {
    Call: Call;
}

interface RegCallDeviceRes extends BaseResponse {
    Call: Call;
}

interface UpdateCallDeviceReq {
    Call: Call;
}

interface UpdateCallDeviceRes extends BaseResponse {
    Call: Call;
}

interface RemoveCallDeviceReq {
    CallDeviceNo: number;
}

interface RemoveCallDeviceRes extends BaseResponse {
}

// ManagementController
interface GetRobotRecencyVersionRes extends BaseResponse {
    Dummy: string;
}

// RobotController
interface GetRobotReq {
    RobotNo: number;
}

interface GetRobotRes extends BaseResponse {
    RobotSummary: RobotSummary;
}

interface GetAllRobotListRes extends BaseResponse {
    RobotSummaryList: RobotSummary[];
}

interface RobotGoHomeReq {
    RobotNo: number;
}

interface RobotGoHomeRes extends BaseResponse {
    RobotStatus: RobotStatus;
}

interface RobotPauseReq {
    RobotNo: number;
}

interface RobotPauseRes extends BaseResponse {
    RobotStatus: RobotStatus;
}

// MapNodeController
interface GetAllMapListRes extends BaseResponse {
    MapList: Map[];
}

interface GetMapNodeListReq {
    MapNo: number;
}

interface GetMapNodeListRes extends BaseResponse {
    NodeList: MapNode[];
}

interface ChangeNodePreferenceReq {
    RobotNo: number;
    ChangeMapNodeNo: number;
    FromPreference: MapNodePreference;
    ToPreference: MapNodePreference;
}

interface ChangeNodePreferenceRes extends BaseResponse {
    FavoriteNodeList: MapNode[];
    NormalNodeList: MapNode[];
    HateNodeList: MapNode[];
}

// OrderController
interface GetOrderListRes extends BaseResponse {
    OrderList: Order[];
}

interface OrderAllocateReq {
    RobotNo: number;
    OrderNo: number;
}

interface OrderAllocateRes extends BaseResponse {
    RobotSummary: RobotSummary;
    OrderList: Order[];
}

interface OrderDeallocateReq {
    RobotNo: number;
    OrderNo: number;
}

interface OrderDeallocateRes extends BaseResponse {
    RobotSummary: RobotSummary;
    OrderList: Order[];
}