

export const PlayListType = {
    Default: 1,
    Standby: 2,
    Dest: 3,
};

export class SourceItem {
	constructor(type, fileName, playSec) {
	  this.Type = type;
	  this.FileName = fileName;
	  this.PlaySec = playSec;
	}
}

export class DestItem {
	constructor(dest, sourceItems) {
	  this.Dest = dest;
	  this.SourceItems = sourceItems;
	}
}

export class MediaPlayList {
	constructor(version, defaultPlayList, standbyPlayList, destPlayList) {
	  this.Version = version;
	  this.DefaultPlayList = defaultPlayList;
	  this.StandbyPlayList = standbyPlayList;
	  this.DestPlayList = destPlayList;
	}

	getPlayList(playListType, dest) {
		switch (playListType) {
			case PlayListType.Default:
				return DefaultPlayList;
				
			case PlayListType.Standby:
				return StandbyPlayList;

			case PlayListType.Dest:
				const sourceItemlist = DestPlayList.year.find((item) => item.Dest == dest);
				if (undefined == sourceItemlist) return new Array();
				return sourceItemlist;
		}

		return new Array();
	}
}

export const MediaPlayListInst = new MediaPlayList("", new Array(), new Array(), new Array());


export class GuiConfig {
	constructor(mediaVolume) {
	  this.MediaVolume = dest;
	}
}
export const GuiConfigInst = new GuiConfig(50);

module.exports = playlistModels;