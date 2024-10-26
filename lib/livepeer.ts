// lib/livepeer.ts

import axios from "axios";

export const uploadImageToVideo = async (file: File) => {
  const formData = new FormData();
  formData.append("model_id", "stabilityai/stable-video-diffusion-img2vid-xt-1-1");
  formData.append("image", file);

  const response = await axios.post("https://dream-gateway.livepeer.cloud/image-to-video", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Return the video URL from the response
  return response.data.images[0];
};
