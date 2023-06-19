const ENV = {
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_API_URL:
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_API_URL!,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
};

const IS_SERVER = typeof window === "undefined";

Object.entries(ENV).forEach(([key, value]) => {
  if (value === undefined) {
    if (IS_SERVER)
      throw new Error(`${key} environment variable is not defined`);
  }
});

export default ENV;
