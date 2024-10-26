"use client";

import React, { useState } from "react";
import { uploadImageToVideo } from "../lib/livepeer";
import styles from "../styles/ImageUpload.module.css";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const shareText = "Do you feel my vibe, LIVE?";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }

    setIsProcessing(true);
    console.log("Uploading file:", selectedFile.name);

    try {
      const { url } = await uploadImageToVideo(selectedFile);
      console.log("Video URL received:", url);
      setVideoUrl(`${url}`);
      setError(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to generate video. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, "_blank");
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(videoUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Time travel to the past</h1>
      <p className={styles.paragraph}>Breathe life into your old photos so your fans can pretend like they were already there LIVE WITH YOU even before you got famous.</p>

      {/* Only the Upload Photo button */}
      {!selectedFile ? (
        <label className={styles.uploadButton}>
          Upload Photo
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the original file input
          />
        </label>
      ) : (
        <>
          {/* Only show button if videoUrl is not set */}
          {!videoUrl && (
            <button onClick={handleUpload} disabled={isProcessing} className={styles.button}>
              {isProcessing ? "Processing..." : "Generate Video"}
            </button>
          )}
          {videoUrl && (
            <div className={styles.videoContainer}>
              <video
                controls
                className={styles.video}
                onError={() => setError("Video failed to load. Please try again.")}
                src={videoUrl}
              />
              <div className={styles.shareContainer}>
                <span className={styles.boldText}>Share with your FANS on </span>
                <button onClick={handleShareFacebook} className={styles.shareButton}>
                  <img 
                    src="https://cdn-icons-png.freepik.com/256/15707/15707770.png" 
                    alt="Share on Facebook" 
                    className={styles.shareIcon}
                  />
                </button>
                <button onClick={handleShareTwitter} className={styles.shareButton}>
                  <img 
                    src="https://cdn.icon-icons.com/icons2/4029/PNG/512/twitter_x_new_logo_x_rounded_icon_256078.png" 
                    alt="Share on Twitter" 
                    className={styles.shareIcon}
                  />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
