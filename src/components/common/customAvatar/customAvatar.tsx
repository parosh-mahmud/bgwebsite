// import Avatar from '@mui/material/Avatar'
// import { useState } from 'react'

// export default function CustomAvatar({ src, name }) {
//   const [imageLoaded, setImageLoaded] = useState(true)

//   return (
//     <Avatar
//       src={imageLoaded ? src : undefined} // Only set src if image loads
//       alt={name}
//       onError={() => setImageLoaded(false)} // If image fails, fallback to initials
//       className="w-12 h-12"
//     >
//       {!imageLoaded && name.charAt(0)} {/* Show first letter as fallback */}
//     </Avatar>
//   )
// }
