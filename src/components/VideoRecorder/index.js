import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import RightTopMenu from './RightTopMenu';
import VideoTimings from './VideoTimings';
import Zooming from './Zooming';
// import * as RNVisionCamera from 'react-native-vision-camera';

const VideoCamRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isFlip, flipCam] = useState(false);
    const [isFlash, setFlashState] = useState(false);
    const [zoomValue, setZoomValue] = useState(1);
    
    const cameraRef = useRef(null);
    const back_devices = useCameraDevices('wide-angle-camera')
    const front_devices = useCameraDevices('ultra-wide-angle-camera')
    const device = isFlip ? back_devices.back : front_devices.front

    const startRecording = async () => {
        setIsRecording(true);
        try {
            const options = {
                videoBitrate: 12000000, // 12Mbps
                audioBitrate: 256000, // 256Kbps
                fps: 30,
                codec: 'H264',
                enableAudio: true,
                onRecordingFinished: (video) => console.log("onRecordingFinished:", video),
                onRecordingError: (error) => console.log("onRecordingError:", error),
            };
            const recording = await cameraRef.current?.startRecording(options);
            console.log('Recording started');
        } catch (error) {
            console.log("startRecording", error);
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            const recording = await cameraRef.current?.stopRecording();
            console.log('Recording stopped', recording);
        } catch (error) {
            console.log("stopRecording Err: ", error);
        }
    };

    return (
        <View style={styles.container}>
            {device &&
                <Camera
                    ref={cameraRef}
                    device={device}
                    video={true}
                    isActive={true}
                    torch={isFlash?'on':'off'}
                    enableZoomGesture={true}
                    zoom={zoomValue}
                    style={StyleSheet.absoluteFill} />
            }
            <RightTopMenu
                is_flip={isFlip}
                is_flash={isFlash}
                onClick={async (event_type, value) => {
                    if (event_type == 'flip') flipCam(value)
                    if (event_type == 'flash') setFlashState(value)
                }} />
            <View style={styles.controlsContainer}>
                <Zooming
                    defaultValue={zoomValue}
                    setZoomValue={(v)=>{ setZoomValue(v) }}/>
                <View style={{ height: 10 }} />
                <VideoTimings />
                <View style={{ height: 10 }} />
                {isRecording ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={stopRecording}>
                        <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={startRecording}>
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    controlsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        position: 'absolute',
        bottom: 20,
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 100,
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default VideoCamRecorder;
