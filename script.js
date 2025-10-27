document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("qrCodeInput");
  const button = document.getElementById("qrButton");
  const qrContainer = document.getElementById("qrcode");
  const downloadBtn = document.getElementById("downloadBtn");

  let qr;

  button.addEventListener("click", () => {
    const url = input.value.trim();
    if (!url) {
      alert("Please enter a URL first, brotha 😎");
      return;
    }

    // Clear old QR
    qrContainer.innerHTML = "";
    qrContainer.style.display = "block";

    // Generate new QR
    qr = new QRCode(qrContainer, {
      text: url,
      width: 200,
      height: 200,
    });

    // Show download button
    downloadBtn.style.display = "inline-block";

    // Wait for QR code to render before attaching click event
    setTimeout(() => {
      const qrImage = qrContainer.querySelector("img") || qrContainer.querySelector("canvas");

      if (qrImage) {
        qrImage.style.cursor = "pointer";
        qrImage.title = "Click to download QR code";

        qrImage.addEventListener("click", () => {
          const link = document.createElement("a");
          link.href = qrImage.src || qrImage.toDataURL("image/png");
          link.download = "qrcode.png";
          link.click();
        });
      }
    }, 300);
  });

  // Keep the manual download button working too
  downloadBtn.addEventListener("click", () => {
    const img = qrContainer.querySelector("img") || qrContainer.querySelector("canvas");
    if (!img) return;

    const link = document.createElement("a");
    link.href = img.src || img.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
  });
});
