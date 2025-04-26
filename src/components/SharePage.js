import React from 'react';
import html2canvas from 'html2canvas';

function SharePage() {
  const captureScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      const imageURL = canvas.toDataURL('image/png');

      // Create a link to download the image
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'missed-screenshot.png';
      link.click();
    }).catch((error) => {
      console.error('Error capturing screenshot:', error);
    });
  };

  return (
    <div className="share-page">
      <button onClick={captureScreenshot}>Share Screenshot 📸</button>
    </div>
  );
}

export default SharePage;
