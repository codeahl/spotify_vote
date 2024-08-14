// import { useState } from "react";

// const ListGroup = () => {
//   let cities = ["New York", "Dheli", "Shanghai", "Los Angeles"];
//   let selectedIndex = -1;

//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const getMessage = () => {
//     return cities.length == 0 ? <p>No item found</p> : null;
//   };
//   return (
//     <>
//       <h1>Testing</h1>
//       {getMessage()}
//       <ul className="list-group">
//         {cities.map((city, index) => (
//           <li
//             class={
//               selectedIndex == index
//                 ? "list-group-item active"
//                 : "list-group-item"
//             }
//             key={city}
//             onClick={() => {
//               setSelectedIndex(index);
//             }}
//           >
//             {city}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default ListGroup;
