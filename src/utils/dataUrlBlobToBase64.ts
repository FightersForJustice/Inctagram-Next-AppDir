export const convertBlobUrlToBase64 = async (blobUrl: string) => {
    // Fetch the blob from the blob URL
    const response = await fetch(blobUrl);
    const blob = await response.blob();
  
    // Use FileReader to convert the blob to a data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Extract the base64 string (remove the prefix 'data:image/png;base64,')
        //@ts-ignore
        const base64String = reader.result.replace(/^data:.+;base64,/, '');
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }