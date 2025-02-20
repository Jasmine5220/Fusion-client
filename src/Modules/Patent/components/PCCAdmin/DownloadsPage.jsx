import React, { useState } from "react";
import { Button, Container, Card, Text } from "@mantine/core";
import { ArrowCircleDown } from "@phosphor-icons/react";
import "../../style/Pcc_Admin/DownloadsPage.css";

function DownloadsPage() {
  const [downloadsData] = useState([
    {
      id: 1,
      title: "Intellectual Property Filing Form",
      link: "https://www.iiitdmj.ac.in/rspc.iiitdmj.ac.in/DRSPC/IPRM/Annexure%20I.pdf",
    },
    {
      id: 2,
      title: "Request for Provisional Patent Filing",
      link: "https://www.iiitdmj.ac.in/rspc.iiitdmj.ac.in/DRSPC/IPRM/Annexure%20II.pdf",
    },
    {
      id: 3,
      title: "Intellectual Property Policy Document",
      link: "https://www.iiitdmj.ac.in/downloads/IPR%20Policy%20Final%20V1%2016_6_2020.pdf",
    },
  ]);

  return (
    <Container className="manage-attorney-container">
      <Text className="page-heading-title">Download Forms and Documents</Text>
      <Text className="description">
        You can review the document title and click the "Download" button to
        access the desired file.
      </Text>
      <Card className="table-card">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Document Title</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {downloadsData.map((download, index) => (
              <tr key={download.id}>
                <td>{index + 1}</td>
                <td>{download.title}</td>
                <td>
                  <Button
                    component="a"
                    href={download.link}
                    target="_blank"
                    color="blue"
                    variant="outline"
                    className="download-button"
                  >
                    <ArrowCircleDown size={16} style={{ marginRight: "8px" }} />
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Container>
  );
}

export default DownloadsPage;