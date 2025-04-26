import React from 'react';
import html2canvas from 'html2canvas';

function SharePage() {
  const captureAndShare = async () => {
    try {
      const canvas = await html2canvas(document.body);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      const file = new File([blob], 'missed-screenshot.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Cute Site by Aadi 🥰',
          text: 'Sharing this jilo moment ❤️',
        });
        console.log('Share successful');
      } else {
        // fallback: just download the image
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'missed-screenshot.png';
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error capturing or sharing screenshot:', error);
    }
  };

  return (
    <div className="share-page">
      <button onClick={captureAndShare}>Share Screenshot 📸</button>
    </div>
  );
}

export default SharePage;
