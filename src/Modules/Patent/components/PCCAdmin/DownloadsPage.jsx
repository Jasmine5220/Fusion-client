import React, { useState } from "react";
import { Button, Container, Text, TextInput, Group } from "@mantine/core";
import { ArrowCircleDown, Plus, Trash } from "@phosphor-icons/react";
import "../../style/Pcc_Admin/DownloadsPage.css";

function DownloadsPage() {
  const [downloadsData, setDownloadsData] = useState([
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

  const [newDocument, setNewDocument] = useState({
    title: "",
    link: "",
  });

  const handleAddDocument = () => {
    if (!newDocument.title || !newDocument.link) {
      alert("Please fill in both title and link fields");
      return;
    }

    const newId = Math.max(...downloadsData.map((doc) => doc.id), 0) + 1;
    setDownloadsData([...downloadsData, { ...newDocument, id: newId }]);
    setNewDocument({ title: "", link: "" });
  };

  const handleDeleteDocument = (id) => {
    setDownloadsData(downloadsData.filter((doc) => doc.id !== id));
  };

  return (
    <Container size="xl" className="downloads-container">
      <Text align="center" className="downloads-title" mb={20}>
        Download Forms and Documents
      </Text>
      <Text align="center" className="downloads-description" mb={20}>
        You can review the document title and click the "Download" button to
        access the desired file.
      </Text>

      {/* Add Document Form */}
      <div className="add-document-form">
        <Text className="add-document-form-title">Add New Document</Text>
        <Group spacing="sm">
          <TextInput
            placeholder="Document Title"
            value={newDocument.title}
            onChange={(e) =>
              setNewDocument({ ...newDocument, title: e.target.value })
            }
            style={{ flex: 2 }}
          />
          <TextInput
            placeholder="Document Link"
            value={newDocument.link}
            onChange={(e) =>
              setNewDocument({ ...newDocument, link: e.target.value })
            }
            style={{ flex: 3 }}
          />
          <Button
            onClick={handleAddDocument}
            color="green"
            leftIcon={<Plus size={16} />}
            className="add-document-button"
          >
            Add
          </Button>
        </Group>
      </div>

      <div style={{ overflowX: "auto", width: "100%" }}>
        <table className="downloads-table">
          <thead>
            <tr>
              <th style={{ width: "8%" }}>S.No.</th>
              <th style={{ width: "57%" }}>Document Title</th>
              <th style={{ width: "25%" }}>Download</th>
              <th style={{ width: "10%" }}>Action</th>
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
                    fullWidth
                  >
                    <ArrowCircleDown size={16} style={{ marginRight: "8px" }} />
                    Download
                  </Button>
                </td>
                <td>
                  <Button
                    color="red"
                    variant="outline"
                    onClick={() => handleDeleteDocument(download.id)}
                    fullWidth
                    className="delete-button"
                  >
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default DownloadsPage;
