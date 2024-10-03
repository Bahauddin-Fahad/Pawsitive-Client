const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_BACKEND_URL,
  cloudinary_upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  cloudinary_url: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
};

export default envConfig;
