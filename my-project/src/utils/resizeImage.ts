export function resizeImage(base64Str: any, maxWidth = 400, maxHeight = 350) {
    return new Promise<{ url: string; file: File }>((resolve) => {
        let img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = maxWidth;
            const MAX_HEIGHT = maxHeight;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);

            // Mengonversi canvas ke data URL
            const dataURL = canvas.toDataURL();

            // Mengonversi data URL ke Blob
            fetch(dataURL)
                .then(res => res.blob())
                .then(blob => {
                    // Membuat URL dari Blob
                    const fileUrl = URL.createObjectURL(blob);
                    // Membuat file dari Blob
                    const file = new File([blob], 'resized_image.png', { type: blob.type });

                    resolve({ url: fileUrl, file });
                });
        };
    });
}
