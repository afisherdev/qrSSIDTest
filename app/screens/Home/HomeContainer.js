import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Wifi from 'react-native-iot-wifi';

import { withNavigation } from 'react-navigation';


import Camera from 'react-native-camera';

import _ from 'lodash';
class TransactionScanner extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = '';
        this.state = {
            isBarcodeRead: false,
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
                barcodeFinderVisible: true,
                barcodeScannerEnabled: true
            }
        };
        this.onBarCodeRead = _.throttle(this.onBarCodeRead, 2000);
    }
  getRatios = async function() {
      const ratios = await this.camera.getSupportedRatios();
      return ratios;
  };
  onBarCodeRead(scanResult) {
      let ssid;
      if (!this.state.isBarcodeRead) {
          this.setState({isBarcodeRead: true});
          console.warn('Result:', scanResult);
          console.warn(scanResult.data);
          if (scanResult.data !== null) {
              ssid = scanResult.data; 
          }
          Wifi.connect(ssid, (error) => {
              console.log(error ? 'error: ' + error : 'connected to ' + ssid);
          });
          this.props.handleConnect;
          this.props.navigation.goBack();
      }
    
  }
  componentWillUnmount(){
      this.setState({ isBarcodeRead: false});
  }
  renderCamera() {
      const { height, width } = Dimensions.get('window');
      console.log({ height, width });
      const topMaskRowHeight = (height - 454) / 2;
      const bottomMaskRowHeight = (height - 146) / 2;
      const maskColWidth = (width - 300) / 2;

      if (this.props.barcodeCodes !== '') {
          this.handleNavigate;
      }
      return (
          <View>
              <View style={styles.container}>
                  <Camera
                      ref={cam => {
                          this.camera = cam;
                      }}
                      style={styles.preview}
                      aspect={this.state.camera.aspect}
                      captureTarget={this.state.camera.captureTarget}
                      type={this.state.camera.type}
                      flashMode={this.state.camera.flashMode}
                      onFocusChanged={() => {}}
                      onZoomChanged={() => {}}
                      defaultTouchToFocus
                      mirrorImage={false}
                      barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                      barcodeFinderWidth={280}
                      barcodeFinderHeight={220}
                      barcodeFinderBorderColor="red"
                      barcodeFinderBorderWidth={2}
                      zoom={0}
                      onBarCodeRead={this.onBarCodeRead.bind(this)}
                  >
                      <View style={styles.maskOutter}>
                          <View
                              style={[
                                  { height: topMaskRowHeight },
                                  styles.maskRow,
                                  styles.maskFrame
                              ]}
                          >
                          </View>
                          <View style={[{ flex: 30 }, styles.maskCenter]}>
                              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                              <View style={styles.maskInner} />
                              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                          </View>
                          <View
                              style={[
                                  { height: bottomMaskRowHeight },
                                  styles.maskRow,
                                  styles.maskFrame
                              ]}
                          >
                              <View style={styles.instructions}>
                                  <Text>
                    PLEASE SCAN THE QR CODE
                                  </Text>
                                  <Text >
                    TO PAIR WITH PHYN DEVICE
                                  </Text>
                              </View>
                              <Image source={'./phynlogo.png'} style={styles.imageStyle} />
                          </View>
                      </View>
                  </Camera>
              </View>
          </View>
      );
  }
  render() {
      return <View style={styles.container}>{this.renderCamera()}</View>;
  }
  takePicture = async function() {
      if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          console.log(data.uri);
      }
  };
}
const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default withNavigation(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TransactionScanner)
);