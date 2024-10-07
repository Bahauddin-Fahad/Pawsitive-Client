const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_BACKEND_URL,
  cloudinary_upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  cloudinary_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
};

export default envConfig;
