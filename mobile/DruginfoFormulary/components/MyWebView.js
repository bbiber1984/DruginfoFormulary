import React, {useEffect, useState} from 'react';
import {
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';

const MyWebView= ({handleClose}) => {
  const BASE_URL = 'https://formulary.druginfo.co.kr/';
  const [webview, setWebview] = useState();
  const [goBackable, setGoBackable] = useState(false);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        console.log('goBackable', goBackable);
        if (goBackable) webview.goBack();
        else handleClose();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [goBackable]);
  useEffect(() => {
    if (webview && webview.clearCache) webview.clearCache();
  }, [webview]);
  return (
    <WebView
        pullToRefreshEnabled={true}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        source={{uri: BASE_URL}}
        mixedContentMode={'compatibility'}
        originWhitelist={['https://*', 'http://*']}
        overScrollMode={'never'}
        onMessage={(event) => {
        const url = event.nativeEvent.data;
        setGoBackable(url !== BASE_URL);
        console.log('onMessage', event.nativeEvent.data);
        }}
    />
  );
};

export default MyWebView;