export const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = url;
      });
  
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      -pixelCrop.width / 2,
      -pixelCrop.height / 2,
      pixelCrop.width,
      pixelCrop.height
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, "image/png");
    });
  };
  