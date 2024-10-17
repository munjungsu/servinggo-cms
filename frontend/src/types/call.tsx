export enum CallDeviceType {
    None = 0,
    Bell,
    TableOrder,
    Etc,
}
export enum MapNodeType {
    None = 0,
    Home,
    Charging,
}
export class Call {
    No: number = 0;
    Type: CallDeviceType = CallDeviceType.None;
    SerialNo: string = "";
    CreatedAt: Date = new Date();
    MapNode_: MapNode = new MapNode();
}
export class MapNodeBase {
    No: number = 0;
    Index: number = 0;
}

export class MapNode extends MapNodeBase {
    Name: string = "";
    Type: MapNodeType = MapNodeType.None;
}
