// import { Box, Button, ScrollArea, Table, Title, Text } from "@mantine/core";
// import { Eye } from "@phosphor-icons/react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../style/director/SubmittedApplications.css";

// function SubmittedApplications({ setActiveTab }) {
//   const navigate = useNavigate();
//   const [applicationsData, setApplicationsData] = useState([]);

//   const columnNames = [
//     "Token Number",
//     "Patent Title",
//     "Submitted By",
//     "Department",
//     "Date-Time",
//     "Assigned Attorney",
//     "View",
//   ];

//   useEffect(() => {
//     const fetchApplications = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Authentication token not found");
//         return;
//       }

//       try {
//         const response = await fetch(
//           "http://127.0.0.1:8000/patentsystem/director/applications/new/",
//           {
//             headers: {
//               Token: token,
//             },
//           }
//         );

//         if (!response.ok) throw new Error("Failed to fetch applications");

//         const data = await response.json();

//         // Transform API response to match frontend structure
//         const formattedData = Object.values(data.applications).map((app) => ({
//           tokenNumber: app.token_no,
//           title: app.title,
//           submitter: app.submitted_by,
//           Department: app.department,
//           date: app.forwarde_on, // Note the backend typo in key name
//           attorney: app.assigned_attorney,
//         }));

//         setApplicationsData(formattedData);
//       } catch (error) {
//         console.error("Error fetching applications:", error);
//       }
//     };

//     fetchApplications();
//   }, []);

//   const handleViewDetails = (applicationId) => {
//     console.log(`Viewing details for application ID: ${applicationId}`);
//     setActiveTab("1.1");
//   };

//   const rows = applicationsData.map((item, index) => (
//     <tr key={index} className="tableRow">
//       <td>{item.tokenNumber}</td>
//       <td>{item.title}</td>
//       <td>{item.submitter}</td>
//       <td>{item.Department}</td>
//       <td>{item.date}</td>
//       <td>{item.attorney}</td>
//       <td>
//         <Button
//           variant="outline"
//           color="blue"
//           size="xs"
//           onClick={() => handleViewDetails(item)}
//           className="viewButton"
//         >
//           <Eye size={16} /> <span>   View</span>
//         </Button>
//       </td>
//     </tr>
//   ));

//   return (
//     <Box>
//       <Title
//         order={2}
//         className="title"
//         style={{ marginLeft: "32px", marginTop: "0px" }}
//       >
//         <span>Applications Forwarded by PCC Admin</span>
//       </Title>
//       <Text
//         size="md"
//         color="dimmed"
//         className="description"
//         style={{ marginLeft: "64px" }}
//       >
//         The following is a list of patent applications forwarded by PCC Admin for
//         your review. Please examine the details and click on the "View" button to see more
//         information.
//       </Text>
//       <Box className="outerContainer">
//         <ScrollArea>
//           <div className="tableWrapper">
//             <Table highlightOnHover striped withBorder className="styledTable">
//               <thead className="fusionTableHeader">
//                 <tr>
//                   {columnNames.map((columnName, index) => (
//                     <th key={index}>{columnName}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>{rows}</tbody>
//             </Table>
//           </div>
//         </ScrollArea>
//       </Box>
//     </Box>
//   );
// }

// export default SubmittedApplications;

import { Box, Button, ScrollArea, Table, Title, Text } from "@mantine/core";
import { Eye } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const API_BASE_URL = "http://127.0.0.1:8000/patentsystem";

function SubmittedApplications({ setActiveTab }) {
  const [applicationsData, setApplicationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken");

  const columnNames = [
    "Application ID",
    "Token Number",
    "Patent Title",
    "Submitted By",
    "Department",
    "Date-Time",
    "Assigned Attorney",
    "View",
  ];

  useEffect(() => {
    const fetchApplicationData = async () => {
      if (!authToken) {
        setError("Authorization token is missing. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/director/applications/new/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          },
        );

        const formattedData = Object.entries(response.data.applications).map(
          ([key, app]) => ({
            applicationId: key,
            tokenNumber: app.token_no,
            title: app.title,
            submitter: app.submitted_by,
            Department: app.department,
            date: new Date(app.forwarde_on).toLocaleString(),
            attorney: app.assigned_attorney,
          }),
        );

        setApplicationsData(formattedData);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applications");
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [authToken]);

  const handleViewDetails = (application) => {
    localStorage.setItem("selectedApplicationId", application.applicationId);
    localStorage.setItem("selectedApplicationToken", application.tokenNumber);
    setActiveTab("1.1");
  };

  const rows = applicationsData.map((item, index) => (
    <tr key={index} className="tableRow">
      <td>{item.applicationId}</td>
      <td>{item.tokenNumber}</td>
      <td>{item.title}</td>
      <td>{item.submitter}</td>
      <td>{item.Department}</td>
      <td>{item.date}</td>
      <td>{item.attorney}</td>
      <td>
        <Button
          variant="outline"
          color="blue"
          size="xs"
          onClick={() => handleViewDetails(item)}
          className="viewButton"
        >
          <Eye size={16} /> <span> View</span>
        </Button>
      </td>
    </tr>
  ));

  return (
    <Box>
      <Title
        order={2}
        className="title"
        style={{ marginLeft: "32px", marginTop: "0px" }}
      >
        Applications Forwarded by PCC Admin
      </Title>

      <Text
        size="md"
        color="dimmed"
        className="description"
        style={{ marginLeft: "64px" }}
      >
        The following is a list of patent applications forwarded for review.
        Click "View" to examine details.
      </Text>

      <Box className="outerContainer">
        {loading ? (
          <Text align="center" py="md">
            Loading applications...
          </Text>
        ) : error ? (
          <Text color="red" align="center" py="md">
            Error: {error}
          </Text>
        ) : applicationsData.length === 0 ? (
          <Text align="center" py="md">
            No applications found
          </Text>
        ) : (
          <ScrollArea>
            <div className="tableWrapper">
              <Table
                highlightOnHover
                striped
                withBorder
                className="styledTable"
              >
                <thead className="fusionTableHeader">
                  <tr>
                    {columnNames.map((columnName, index) => (
                      <th key={index}>{columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </div>
          </ScrollArea>
        )}
      </Box>
    </Box>
  );
}

// ✅ Add prop validation
SubmittedApplications.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

export default SubmittedApplications;
