'use client'
// import FormLoading from "@/components/loading-icon/formLoading";
// import { cn } from "@/lib/cn";
import { resizeImage } from "@/utils/resizeImage";
// import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Form2() {
  // const [loading, setLoading] = useState(false); // State untuk loading
  function convertToBase64(file: any, cb: any) {
    var reader = new FileReader();
    reader.onload = function (e) {
      cb(null, e?.target?.result)
    };
    reader.onerror = function (e) {
      cb(e);
    };
    reader.readAsDataURL(file);
  }
  const [files, setfiles] = useState({ url: '' }) as any


  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file, "<<<< ini file"); // Log file asli
    if (!file) return;

    // Hitung ukuran file asli dalam MB
    const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    console.log(originalSizeMB, "<<<< ini originalSizeMB"); // Log ukuran asli dalam MB

    convertToBase64(file, async function (err: any, data: any) {
      if (err) {
        // handle error
        return;
      }

      // Resize the image
      const { url, file: resizedFile } = await resizeImage(data);

      // Hitung ukuran file yang sudah di-resize dalam MB
      const resizedSizeMB = (resizedFile.size / (1024 * 1024)).toFixed(2);
      console.log(resizedSizeMB, "<<<< ini resizedSizeMB"); // Log ukuran resized dalam MB

      setfiles({ url, doc: resizedFile });
    });
    console.log(files, "<<<< ini filesnya");
  };


  useEffect(() => {
    console.log(files, "<<<< ini filesnya")
  }, [files])


  //   try {
  //     setLoading(true); // Set loading ke true saat mulai upload

  //     const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
  //     console.log(originalSizeMB, "<<<< ini originalSizeMB");

  //     // Resize gambar
  //     const resizedFile = await resizeImage(file, 1024, 1024);
  //     const resizedSizeMB = (resizedFile.size / (1024 * 1024)).toFixed(2);
  //     console.log(resizedSizeMB, "<<<< ini resizedSizeMB");

  //     formik.setFieldValue("images", resizedFile);

  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       formik.setFieldValue("imagesPreview", event.target?.result);
  //     };
  //     reader.readAsDataURL(resizedFile);
  //   } catch (error) {
  //     console.error("Error resizing image:", error);
  //   } finally {
  //     setLoading(false); // Set loading ke false setelah proses selesai
  //   }
  // };

  // if (loading) return <FormLoading />


  return (
    <>
      <div className='p-6 rounded-lg bg-white gap-x-4 border border-gray-300 max-md:col-span-3 max-lg:col-span-3 max-md:p-4 w-1/2'>
        <div className='flex items-center justify-center w-full h-full'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100
                        max-lg:p-4'
          >
            <input
              onChange={handleFile}
              name='images'
              id='dropzone-file'
              type='file'
              className='hidden'
            />
            <>
              <Image
                src={files?.url}
                alt='preview'
                width={300}
                height={300}
                className={`rounded-lg h-full w-full object-cover bg-cover ${!files.url && "hidden"}`}
              />
              <div
                className={`flex flex-col items-center justify-center pt-5 pb-6 h-full w-full ${files.url && "hidden"}`}
              >
                {/* <Icon icon='typcn:image' width='50' className='text-blue-500' /> */}
                <p className='font-semibold flex gap-2 items-center text-blue-500 pt-4 pb-2'>
                  {/* <Icon icon='icon-park-outline:upload-two' width={18} /> */}
                  <span>Upload Gambar</span>
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  <span>Upload gambar produk</span>{" "}
                  <span className='text-black'>jpeg / png</span>
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  <span>Rekomendasi Ukuran</span>{" "}
                  <span className='text-black'>600x600 (1:1)</span>
                </p>
              </div>
            </>
          </label>
        </div>
      </div >
    </>
  );
}
