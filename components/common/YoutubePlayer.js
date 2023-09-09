import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { WebView } from "react-native-webview";

const YoutubePlayer = ({videoUrl}) => {
  const [htmlContent, setHtmlContent] = useState("");

  const { width } = useWindowDimensions();
  useEffect(() => {
    const getVideoIdFromUrl = (url) => {
      const match = url.match(/[?&]v=([^&]+)/);
      return match && match[1];
    };

    const videoId = getVideoIdFromUrl(videoUrl);
    if (videoId) {
      const embedCode = `
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/${videoId}?rel=0"
          frameborder="0"
          allowfullscreen
        ></iframe>
      `;
      setHtmlContent(`<html><body style='background:black'>${embedCode}</body></html>`);
    }
  }, [videoUrl]);

  return (
    <WebView
    // androidHardwareAccelerationDisabled={true}
      originWhitelist={["*"]}
      allowsFullscreenVideo={true}
      javaScriptEnabled={true}
      scrollEnabled={false}
      scalesPageToFit={false}
      style={{ width:width, height: width/1.5,opacity:0.90 }}
      automaticallyAdjustContentInsets={false}
      mixedContentMode="always"
      source={{ html: htmlContent }}
    />
  );
};

export default YoutubePlayer;
