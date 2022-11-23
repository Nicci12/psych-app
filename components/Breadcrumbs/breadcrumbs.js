// import * as React from 'react';
// import {Breadcrumbs}from '@mui/material';
// import {Link}from '@mui/material';
// import { GiMushroomGills, GiPill, GiMedicines } from "react-icons/gi";
// import { FaCannabis, FaClinicMedical } from "react-icons/fa";
// import { RiPsychotherapyFill} from "react-icons/ri";
// // import {HomeIcon} from '@mui/icons-material/Home';
// // import {WhatshotIcon} from '@mui/icons-material/Whatshot';
// // import {GrainIcon} from '@mui/icons-material/Grain';

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

// export default function IconBreadcrumbs() {
//   return (
//     <div role="presentation" onClick={handleClick}>
//       <Breadcrumbs aria-label="breadcrumb">
//         <Link
//           sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
//           color="inherit"
//           href="/"
//         >
//       < GiMushroomGills className='mushrooms' />
//           Mushroom Strains
//         </Link>
//         <Link
//           sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none'  }}
//           color="inherit"
//           href="/material-ui/getting-started/installation/"
//         >
//         < GiPill className='pills' />
//           Psychadelic Types
//         </Link>
//         <Link
//             color="inherit"
//             href="/material-ui/getting-started/installation/"
//           sx={{ display: 'flex', alignItems: 'center' ,textDecoration: 'none'  }}
//         >
//       <FaCannabis className='cannabis'  />
//           Cannabis Strains
//         </Link>
//         <Link
//           sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none'  }}
//           color="inherit"
//           href="/material-ui/getting-started/installation/"
//         >
//         < RiPsychotherapyFill className='psych' />
//           Resources
//         </Link>
//         <Link
//           sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
//           color="inherit"
//           href="/material-ui/getting-started/installation/"
//         >
//         < FaClinicMedical className='medical'  />
//           Retreats
//         </Link>
//       </Breadcrumbs>
//     </div>
//   );
// }