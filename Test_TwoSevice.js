var util = require('util');

var bleno = require('./index');

//AGGIUNTO DA ME//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var sys = require('sys');
var exec = require('child_process').exec;
var fs = require('fs');

///// METODO I° /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//var options = { flags: 'w', encoding: 'hex', mode: 0666 };
var options = {flags:'a'};
var wstream = fs.createWriteStream('/tmp/msgfifoSone', options);
//var wstream = fs.createWriteStream('/tmp/msgfifo');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var BlenoPrimaryService = bleno.PrimaryService;
var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

console.log('bleno');

//################################################################################################################################
//#                                         GENERIC READ ONLY CHARACTERISTIC                                                     #
//################################################################################################################################
var StaticReadOnlyCharacteristic = function() {
  StaticReadOnlyCharacteristic.super_.call(this, {
    uuid: 'affffffffffffffffffffffffffffff1',
    properties: ['read'],
    value: new Buffer('value'),
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'PIPPO user description'
      })
    ]
  });
};
util.inherits(StaticReadOnlyCharacteristic, BlenoCharacteristic);

//################################################################################################################################
//#                                    GENERIC DYNAMIC READ ONLY CHARACTERISTIC                                                  #
//################################################################################################################################
var DynamicReadOnlyCharacteristic = function() {
  DynamicReadOnlyCharacteristic.super_.call(this, {
    uuid: 'affffffffffffffffffffffffffffff2',
    properties: ['read']
  });
};

util.inherits(DynamicReadOnlyCharacteristic, BlenoCharacteristic);

DynamicReadOnlyCharacteristic.prototype.onReadRequest = function(offset, callback) {
  var result = this.RESULT_SUCCESS;
  var data = new Buffer('dynamic value');

  if (offset > data.length) {
    result = this.RESULT_INVALID_OFFSET;
    data = null;
  }

  callback(result, data);
};

//################################################################################################################################
//#                                         GENERIC WRITE ONLY CHARACTERISTIC                                                    #
//################################################################################################################################
var WriteOnlyCharacteristic = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'affffffffffffffffffffffffffffff3',
    properties: ['write', 'writeWithoutResponse']
  });
};

util.inherits(WriteOnlyCharacteristic, BlenoCharacteristic);

WriteOnlyCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristic write request: XXX' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('XXX'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                LIGHT LED                                                                     #
//################################################################################################################################
var WriteOnlyCharacteristicLED = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff0',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Led'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicLED, BlenoCharacteristic);

WriteOnlyCharacteristicLED.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicLED write request: S01' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('S01'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                LIGHT RED                                                                     #
//################################################################################################################################
var WriteOnlyCharacteristicRED = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffffa',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Red'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicRED, BlenoCharacteristic);

WriteOnlyCharacteristicRED.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicRED write request: S02' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('S02'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                LIGHT GREEN                                                                   #
//################################################################################################################################
var WriteOnlyCharacteristicGREEN = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffffb',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Green'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicGREEN, BlenoCharacteristic);

WriteOnlyCharacteristicGREEN.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicGREEN write request: S03' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('S03'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                  LIGHT BLU                                                                   #
//################################################################################################################################
var WriteOnlyCharacteristicBLU = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffffc',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Blu'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicBLU, BlenoCharacteristic);

WriteOnlyCharacteristicBLU.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicBLU write request: S04' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('S04'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                      MASTER VOLUME                                                           #
//################################################################################################################################
var WriteOnlyCharacteristicMSVOLUME = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffffd',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Volume'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicMSVOLUME, BlenoCharacteristic);

WriteOnlyCharacteristicMSVOLUME.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicMSVOLUME write request: VOL' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('VOL'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                      CHANNEL VOLUME                                                           #
//################################################################################################################################
var WriteOnlyCharacteristicCHVOLUME = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffffe',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Channel'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicCHVOLUME, BlenoCharacteristic);

WriteOnlyCharacteristicCHVOLUME.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicCHVOLUME write request: MLR' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('MLR'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                       DECADIMENTO                                                            #
//################################################################################################################################
var WriteOnlyCharacteristicDEC = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'ffffffffffffffffffffffffffffffff',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Falling'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicDEC, BlenoCharacteristic);

WriteOnlyCharacteristicDEC.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicDEC write request: DEC' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('DEC'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                     PATTERN STIX                                                             #
//################################################################################################################################
var WriteOnlyCharacteristicPATTERN1 = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff1',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Stix'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicPATTERN1, BlenoCharacteristic);

WriteOnlyCharacteristicPATTERN1.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicPATTERN1 write request: P02' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('P02'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                   PATTERN SPECTRUM                                                           #
//################################################################################################################################
var WriteOnlyCharacteristicPATTERN2 = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff2',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Spectrum'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicPATTERN2, BlenoCharacteristic);

WriteOnlyCharacteristicPATTERN2.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicPATTERN2 write request: P01' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('P01'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                     PATTERN SPACE                                                            #
//################################################################################################################################
var WriteOnlyCharacteristicPATTERN3 = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff3',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Space'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicPATTERN3, BlenoCharacteristic);

WriteOnlyCharacteristicPATTERN3.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicPATTERN3 write request: P03' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('P03'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                   PATTERN AMBIANCE                                                           #
//################################################################################################################################
var WriteOnlyCharacteristicPATTERN4 = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff4',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Ambiance'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicPATTERN4, BlenoCharacteristic);

WriteOnlyCharacteristicPATTERN4.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicPATTERN3 write request: P04' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('P04'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                                  REBOOT & SHUTDOWN                                                           #
//################################################################################################################################
var WriteOnlyCharacteristicREBOOT = function() {
  WriteOnlyCharacteristic.super_.call(this, {
    uuid: 'fffffffffffffffffffffffffffffff5',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'Reboot & Shutdown'
      })
    ]
  });
};

util.inherits(WriteOnlyCharacteristicREBOOT, BlenoCharacteristic);

WriteOnlyCharacteristicREBOOT.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('WriteOnlyCharacteristicREBOOT write request: STP' + data.toString('hex') + ' ' + offset + ' ' + withoutResponse);
  wstream.write('STP'+data.toString('hex'));
  callback(this.RESULT_SUCCESS);
};

//################################################################################################################################
//#                                         GENERIC NOTIFY ONLY CHARACTERISTIC                                                   #
//################################################################################################################################
var NotifyOnlyCharacteristic = function() {
  NotifyOnlyCharacteristic.super_.call(this, {
    uuid: 'affffffffffffffffffffffffffffff4',
    properties: ['notify']
  });
};

util.inherits(NotifyOnlyCharacteristic, BlenoCharacteristic);

NotifyOnlyCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('NotifyOnlyCharacteristic subscribe');

  this.counter = 0;
  this.changeInterval = setInterval(function() {
    var data = new Buffer(4);
    data.writeUInt32LE(this.counter, 0);

    console.log('NotifyOnlyCharacteristic update value: ' + this.counter);
    updateValueCallback(data);
    this.counter++;
  }.bind(this), 5000);
};

NotifyOnlyCharacteristic.prototype.onUnsubscribe = function() {
  console.log('NotifyOnlyCharacteristic unsubscribe');

  if (this.changeInterval) {
    clearInterval(this.changeInterval);
    this.changeInterval = null;
  }
};

NotifyOnlyCharacteristic.prototype.onNotify = function() {
  console.log('NotifyOnlyCharacteristic on notify');
};

//################################################################################################################################
//#                                                   LIGHT SERVICE                                                              #
//################################################################################################################################
function SampleService() {
  SampleService.super_.call(this, {
    uuid: '0ffffffffffffffffffffffffffffff1',
    characteristics: [
      //new StaticReadOnlyCharacteristic(),
      //new DynamicReadOnlyCharacteristic(),
      //new WriteOnlyCharacteristic(),
      //new NotifyOnlyCharacteristic(),
      new WriteOnlyCharacteristicLED(),
      new WriteOnlyCharacteristicRED(),
      new WriteOnlyCharacteristicGREEN(),
      new WriteOnlyCharacteristicBLU(),
      new WriteOnlyCharacteristicMSVOLUME(),
      new WriteOnlyCharacteristicCHVOLUME(),
      new WriteOnlyCharacteristicDEC(),
      new WriteOnlyCharacteristicPATTERN1(),
      new WriteOnlyCharacteristicPATTERN2(),
      new WriteOnlyCharacteristicPATTERN3(),
      new WriteOnlyCharacteristicPATTERN4(),
      new WriteOnlyCharacteristicREBOOT()
    ]
  });
}

util.inherits(SampleService, BlenoPrimaryService);

//################################################################################################################################
//#                                                   SETUP SERVICE                                                              #
//################################################################################################################################
function TestService() {
  TestService.super_.call(this, {
    uuid: '0ffffffffffffffffffffffffffffff2',
    characteristics: [
      //new StaticReadOnlyCharacteristic(),
      //new DynamicReadOnlyCharacteristic(),
      new WriteOnlyCharacteristic()
      //new NotifyOnlyCharacteristic(),
    ]
  });
}

util.inherits(TestService, BlenoPrimaryService);

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('LightAni', ['0ffffffffffffffffffffffffffffff0']);
  } else {
    bleno.stopAdvertising();
  }
});

// Linux only events /////////////////
bleno.on('accept', function(clientAddress) {
  console.log('on -> accept, client: ' + clientAddress);

  if (bleno.updateRssi) {
    bleno.updateRssi();
  }
});

bleno.on('disconnect', function(clientAddress) {
  console.log('on -> disconnect, client: ' + clientAddress);
});

bleno.on('rssiUpdate', function(rssi) {
  console.log('on -> rssiUpdate: ' + rssi);
});
//////////////////////////////////////

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new SampleService(),
      new TestService()
    ]);
  }
});

bleno.on('advertisingStop', function() {
  console.log('on -> advertisingStop');
});

bleno.on('servicesSet', function() {
  console.log('on -> servicesSet');
});
