export const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = new Image();
    image.src = imageSrc;
  
    // Wait for the image to load
    await new Promise((resolve) => {
      image.onload = resolve;
    });
  
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    // Set canvas dimensions to the cropped area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    // Draw the cropped portion of the image onto the canvas
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    // Return the cropped image as a Blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };