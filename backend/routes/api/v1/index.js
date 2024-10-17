const { execSync } = require("child_process");
const { execPing } = require("child_process");
const express = require("express");
const router = express.Router();
const path = require("path");
const Mutex = require("async-mutex").Mutex;
const pingus = require("pingus");
const rosnodejs = require("rosnodejs");
const std_msgs = rosnodejs.require("std_msgs").msg;
const sensor_msgs = rosnodejs.require("sensor_msgs").msg;
const _ = require("lodash");
// const crequireona_msgs = rosnodejs.require("cona").srv;
const getConfig = {
  name : "aa",
  volume : 50,
  
}
const logger = require('./winston');
var ping = require('ping');

const fs = require('fs');
const dayjs = require("dayjs");

// const version = execSync("git rev-list release --count")
//   .toString()
//   .trim();
//const version = "0.1.1"

let fmsIp = '';
let apIp = '';
let cmsIp = '';
let deviceIp = '';
let cmsPort = '5000';
setInterval(async () => {

  if (0 < deviceIp.length) {
    var res = await ping.promise.probe(deviceIp);
    var msg = 'Device ping ' + deviceIp + ' : ' + JSON.stringify(res);
    logger.info(msg);
  }

if (0 < cmsIp.length) {
  pingus.tcp({ host: cmsIp, port: cmsPort }).then((result) => {
    const res = JSON.stringify(result)
    logger.info("CMS ping " + res)
  }).catch((err) => {
    const error = JSON.stringify(err)
    logger.info("CMS ping " + error)
  });
}

if (0 < apIp.length) {
  var res = await ping.promise.probe(apIp);
  var msg = 'AP ping ' + apIp + ' : ' + JSON.stringify(res);
  logger.info(msg);
}

}, 3000);


// const version = execSync("git rev-list release --count")
//   .toString()
//   .trim();
//const version = "0.1.0"

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

let srvCmd = null;
let pubCmd = null;
let subCmd = null;
let subImg = null;
let lastMapName = null;
let imgBase64;
let mtx = new Mutex();
let res_map = new Map();

rosnodejs.initNode("/guiServer").then((rosNode) => {

  
  // srvCmd = rosNode.serviceClient("/cmdGUI_v2", cona_msgs.cmd_srv);
  const options = {};
  options.queueSize = 100;
  options.tcpNoDelay = true;
  pubCmd = rosNode.advertise("/cmdGUI_v2_req", std_msgs.String, options);
  subCmd = rosNode.subscribe(
    "/cmdGUI_v2_res",
    std_msgs.String,
    (data) => {
      let res_data = JSON.parse(data.data);
      if (res_data.req_time) {
        res_map.set(res_data.req_time, res_data);
      }
    },
    options
  );
  subImg = rosNode.subscribe("/imgGUI", sensor_msgs.CompressedImage, (data) => {
    var buf = Buffer.from(data.data);
    imgBase64 = buf.toString("base64");
  });
});

async function waitFor(target_time) {
  // var output = null;
  for (var i = 0; i < 50; i++) {
    await sleep(20);
    if (res_map.has(target_time)) {
      // output = _.cloneDeep(res_map.get(target_time));
      // res_map.delete(target_time);
      // break;
      return true;
    }
  }
  // return output;
  return false;
}

// NOTE  GET /
// @desc    Get Media PlayList 
// @route   Get /api/v1/getMediaPlayList?playListType=1&dest=destName
// @access  public

// NOTE  POST /
// @desc    Get/Set with cmd
// @route   POST /api/v1
// @access  public
router.post("/", async (req, res) => {
  await mtx.runExclusive(async () => {
    try {
      logger.info(JSON.stringify(req.body));
      
      //req.body.version = "gui_v3." + version;      //logger.info("client IP: " +requestIp.getClientIp(req));
      //logger.info(version);
      req.body.req_time = Date.now().toString();

      let response;
      // let req_msg = new cona_msgs.cmd_srv.Request();
      switch (req.body.cmd) {
        // Get video Setting
        case "getVideoSettings" :
          try {
            const filePath = path.join(__filename, '../data/videoSetting.json')
            const data = fs.readFileSync(filePath, 'utf8')
            response = JSON.parse(data);
          }catch(e){
            response = {msg : "error"}
          }

          break;

        // Get Commands
        case "getPlayList" :
          try {
            const filePath = path.join(__filename, '../data/playlist.json')
            const data = fs.readFileSync(filePath, 'utf8')
            response = JSON.parse(data);
          }catch(e){
            response = {msg : "error"}
          }
          // const filePath = path.join(__filename, '../data/playlist.json')
          // const data = fs.readFileSync(filePath, 'utf8')
          //response = JSON.parse(data);
        break;
        case "getRobot":
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              let response_root = JSON.parse(res_msg.response);
              response = _.clone(response_root.getRobot);if (0 < port.length) apIp += (':' + port);
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            await waitFor(req.body.req_time).then((res_data) => {
              if (res_data) {
                response = res_map.get(req.body.req_time).getRobot;
                res_map.delete(req.body.req_time);
              }
            });
          }
          break;
        case "getMaps":
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              let response_root = JSON.parse(res_msg.response);
              response = response_root.getMaps;
              response.img = imgBase64;

              const selectedMap = response.maps.find((map) => map.selected);
              if (selectedMap) {      //logger.info("client IP: " +requestIp.getClientIp(req));
                lastMapName = selectedMap.name;
              }
            });
          }      //logger.info("client IP: " +requestIp.getClientIp(req));
          //logger.info(version);
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            await waitFor(req.body.req_time).then((res_data) => {
              if (res_data) {
                response = res_map.get(req.body.req_time).getMaps;
                res_map.delete(req.body.req_time);
                response.img = imgBase64;

                const selectedMap = response.maps.find((map) => map.selected);
                if (selectedMap) {
                  lastMapName = selectedMap.name;
                }
              }
            });
          }
          break;
        case "getUserSettings":      //logger.info("client IP: " +requestIp.getClientIp(req));
        //logger.info(version);
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              let response_root = JSON.parse(res_msg.response);
              response = response_root.getUserSettings;
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            await waitFor(req.body.req_time).then((res_data) => {
              if (res_data) {
                response = res_map.get(req.body.req_time).getUserSettings;
                res_map.delete(req.body.req_time);
              }
            });
          }
          break;
        case "getManagerSettings":
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              let response_root = JSON.parse(res_msg.response);      //logger.info("client IP: " +requestIp.getClientIp(req));
              //logger.info(version);
              response = response_root.getManagerSettings;
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            await waitFor(req.body.req_time).then((res_data) => {
              if (res_data) {
                response = res_map.get(req.body.req_time).getManagerSettings;
                res_map.delete(req.body.req_time);
              }
            });
          }

          logger.info('res getManagerSettings : ' + JSON.stringify(response));
          if (response.hasOwnProperty('useFms') &&
          true == response['useFms'] &&
          response.hasOwnProperty('fmsIp') &&
          0 == fmsIp.length) {
            fmsIp = response['fmsIp'];

            var portSplits = fmsIp.split(':');
            if (1 <= portSplits.length)
            {
              deviceIp = portSplits[0];
              cmsIp = portSplits[0] + ':' + cmsPort;

              apIp = '';
              var splits = deviceIp.split('.');
              for (var i = 0; i < splits.length - 1; i++) {
                apIp += splits[i];
                apIp += '.';
              }
              apIp += '1';
            }
          }

          break;
        case "getSystemLog":
          //do something
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              let response_root = JSON.parse(res_msg.response);
              response = response_root.getSystemLog;
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            await waitFor(req.body.req_time).then((res_data) => {
              if (res_data) {
                response = res_map.get(req.body.req_time).getSystemLog;
                res_map.delete(req.body.req_time);
              }
            });
          }
          break;
        case "getDrivingLog":
          //do something
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              let response_root = JSON.parse(res_msg.response);
              response = response_root.getDrivingLog;
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            await waitFor(req.body.req_time).then((res_data) => {
              if (res_data) {
                response = res_map.get(req.body.req_time).getDrivingLog;
                res_map.delete(req.body.req_time);
              }
            });
          }
          break;

        // Set Commands

        //SetVideoSetting
        case "setVideoSettings" :
          //console.log(req.body.value)
            const newValue = req.body.value;
            const filePath = path.join(__filename, '../data/videoSetting.json')
            fs.readFile(filePath, 'utf8', (err, data)=>{
              if(err){
                console.log("데러데러ㅔ더렏");;
                response = {msg : "첫번째 에러"}
                return;
              }
              let jsonData = JSON.parse(data);

              jsonData = newValue;

              const updateData = JSON.stringify(jsonData, null, 2);

              fs.writeFile(filePath, updateData, (err)=>{
                if(err){
                  console.log("두번째 에러");
                  response = {msg : "두번쨰 에러"}
                  return;
                }
              })
            })
            response = {msg : "ok"}
            break;
    
        case "setRobot":
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              response = { msg: "ok" };
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            await waitFor(req.body.req_time).then((res_data) => {
              if (res_data) {
                response = res_map.get(req.body.req_time).setRobot;
                res_map.delete(req.body.req_time);
              }
            });
          }
          break;
        case "setMaps":
          if (req.body.value == "save") {
            if (lastMapName) {
              req.body.name = lastMapName;
            } else {
              req.body.name = "";
            }
          } else if (req.body.value == "load") {
            lastMapName = req.body.name;
          }
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              response = { msg: "ok" };
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            response = { msg: "ok" };
          }
          break;
        case "setUserSettings":
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              response = { msg: "ok" };
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            response = { msg: "ok" };
          }
          break;
        case "setManagerSettings":
          if (req.body.hasOwnProperty('value') && req.body.value.hasOwnProperty('fmsIp') && 0 == fmsIp.length) {
            fmsIp = req.body.value.fmsIp.toString();

            var portSplits = fmsIp.split(':');
            if (1 <= portSplits.length)
            {
              deviceIp = portSplits[0];
              cmsIp = portSplits[0] + ':' + cmsPort;

              apIp = '';
              var splits = deviceIp.split('.');
              for (var i = 0; i < splits.length - 1; i++) {
                apIp += splits[i];
                apIp += '.';
              }
              apIp += '1';
            }
          }

          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              response = { msg: "ok" };
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            response = { msg: "ok" };
          }
          break;
        case "setSystem":
          if (srvCmd) {
            req_msg.request = JSON.stringify(req.body);
            await srvCmd.call(req_msg).then((res_msg) => {
              response = { msg: "ok" };
            });
          }
          if (pubCmd) {
            pubCmd.publish({ data: JSON.stringify(req.body) });
            response = { msg: "ok" };
          }
          break;

        default:
          break;
      }

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(500).json({ msg: "sub error" });
        logger.error(JSON.stringify(response));
      }
    } catch (err) {
      res.status(500).json({ msg: "Something is broken." });
      logger.error(err);
    }
  });
});

module.exports = router;
