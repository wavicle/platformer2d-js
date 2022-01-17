export const Promises = {
  loadImage: function (src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function () {
        reject();
      };
    });
  },
};
