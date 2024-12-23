/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    
    
    images:{
       
        remotePatterns:[
            {
                protocol:"https",
                hostname:"altclan-brands-api-1-1.onrender.com",
                port:"",
                pathname:"/media/**"
            },
            {
                protocol:"https",
                hostname:"altclan-api-v1.onrender.com",
                port:"",
                pathname:"/media/**"
            }
        ],
        domains: ['res.cloudinary.com', "altclan-api-v1.onrender.com",  "altclan-brands-api-1-1.onrender.com"],
    },
   
}

module.exports = nextConfig