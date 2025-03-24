/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Group,
  Paper,
  Title,
  Text,
  Textarea,
  Table,
  FileInput,
  Checkbox,
  Grid,
  ScrollArea,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import { useNavigate } from "react-router-dom"; // For redirecting to Saved Drafts page
import axios from "axios";
import PropTypes from "prop-types";

// Desktop Form Component
function DesktopForm({
  loading,
  error,
  step,
  applicationTitle,
  setApplicationTitle,
  inventors,
  handleInputChange,
  handleRemoveInventor,
  handleAddInventor,
  nextPage,
  prevPage,
  generalQuestions,
  handleGeneralInputChange,
  files,
  setFiles,
  iprOwnershipQuestions,
  handleIprOwnershipInputChange,
  handleNotifyInventors,
  handleViewStatus,
  handleSaveDraft,
  companies,
  handleCompanyInputChange,
  removeCompany,
  addNewCompany,
  handleCheckboxChange,
  handleDownload,
  handleSubmit,
}) {
  return (
    <Paper shadow="xs" p="xl" size="md" mx={32} pos="relative">
      <LoadingOverlay visible={loading} overlayBlur={2} />
      {error && (
        <Alert color="red" mb={20}>
          {error}
        </Alert>
      )}
      <Title order={1} align="center" mb={20} style={{ fontSize: "26px" }}>
        Intellectual Property Filing Form
      </Title>
      <Text align="center" size="sm" mb={20}>
        (Please use this form for all types of IP, including Patents, Copyright,
        Designs, Marks, and even Know-how)
      </Text>
      {step === 1 && (
        <form>
          <Title order={2} align="center" mb={20} style={{ fontSize: "24px" }}>
            Section - I : (Administrative and Technical Details)
          </Title>
          {/* Step 1: Title of Application */}
          <TextInput
            label="Title of Application"
            placeholder="Enter title of the application"
            value={applicationTitle}
            onChange={(e) => setApplicationTitle(e.target.value)}
            mb="md"
            align="center"
            required
          />
          <Text size="sm" mb={10}>
            1. Please list inventor(s) who have contributed in the main
            inventive step of the invention. (Inventor is a person who has
            actually participated in the inventive step, in case a person has
            worked under instructions, then he/she is not an inventor for the
            purpose of patent.)
          </Text>
          <Text size="sm" fw={700} mb={20}>
            Note : Students should provide their permanent (personal) Email-ID
          </Text>
          {inventors.map((inventor, index) => (
            <Group key={index} direction="column" grow mb="md">
              <TextInput
                label={`Inventor-${index + 1} Name`}
                placeholder="Name of Inventor"
                value={inventor.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                required
              />
              <TextInput
                label="Email"
                placeholder="Email of Inventor"
                value={inventor.email}
                onChange={(e) =>
                  handleInputChange(index, "email", e.target.value)
                }
                required
              />
              <TextInput
                label="Contact Address"
                placeholder="Contact Address of Inventor"
                value={inventor.address}
                onChange={(e) =>
                  handleInputChange(index, "address", e.target.value)
                }
                required
              />
              <TextInput
                label="Mobile Number"
                placeholder="Mobile Number of Inventor"
                value={inventor.mobile}
                onChange={(e) =>
                  handleInputChange(index, "mobile", e.target.value)
                }
                required
              />
              <Button
                style={{
                  alignSelf: "flex-end",
                  wordBreak: "break-word",
                  backgroundColor: "white",
                  color: "#0073e6",
                  border: "1px solid #0073e6",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onClick={() => handleRemoveInventor(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0073e6";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#0073e6";
                }}
              >
                Remove
              </Button>
            </Group>
          ))}

          {/* Add Inventor Button */}
          <Group position="center" mt="md">
            <Button onClick={handleAddInventor} color="blue">
              Add Inventor
            </Button>
          </Group>

          {/* Next Button */}
          <Group position="center" mt="lg">
            <Button onClick={nextPage} color="blue">
              Next
            </Button>
          </Group>
        </form>
      )}

      {step === 2 && (
        <form style={{ margin: "32px", width: "1250px", marginRight: "0px" }}>
          <Title order={2} align="center" mb={20} style={{ fontSize: "24px" }}>
            Section - I : (Administrative and Technical Details)
          </Title>
          <TextInput
            label="2. What is the area of the invention?"
            placeholder="Enter the area of the invention"
            value={generalQuestions.inventionArea}
            onChange={(e) =>
              handleGeneralInputChange("inventionArea", e.target.value)
            }
            mb="md"
            required
          />
          <TextInput
            label="3. What is the problem in the area?"
            placeholder="Enter the problem in the area"
            value={generalQuestions.problemArea}
            onChange={(e) =>
              handleGeneralInputChange("problemArea", e.target.value)
            }
            mb="md"
            required
          />
          <TextInput
            label="4. What is the objective of your invention?"
            placeholder="Enter the objective of the invention"
            value={generalQuestions.objective}
            onChange={(e) =>
              handleGeneralInputChange("objective", e.target.value)
            }
            mb="md"
            required
          />
          <TextInput
            label="5. What is the Novelty?"
            placeholder="Enter the novelty of the invention"
            value={generalQuestions.novelty}
            onChange={(e) =>
              handleGeneralInputChange("novelty", e.target.value)
            }
            mb="md"
            required
          />
          <TextInput
            label="6. What is the utility (advantages) of the present invention over comparable inventors available in literature including patents?"
            placeholder="Describe the advantages over comparable inventors"
            value={generalQuestions.utility}
            onChange={(e) =>
              handleGeneralInputChange("utility", e.target.value)
            }
            mb="md"
            required
          />
          <TextInput
            label="7. Has the invention been tested experimentally?"
            placeholder="Proof-of-concept/Prototype details"
            value={generalQuestions.tested}
            onChange={(e) => handleGeneralInputChange("tested", e.target.value)}
            mb="md"
            required
          />
          <FileInput
            label="If yes, please add the details of the proof of concept/Prototype"
            placeholder="Click here to upload proof of concept/Prototype"
            mb="md"
            multiple
            clearable
            value={files}
            onChange={setFiles}
            accept="image/*"
          />
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            {files.map((file, index) => (
              <div key={index}>
                <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)}{" "}
                KB)
              </div>
            ))}
          </div>
          <Textarea
            resize="vertical"
            label="8. Can you think of applications of your invention?"
            placeholder="List down applications of your invention"
            minRows={4}
            value={generalQuestions.applications}
            onChange={(e) =>
              handleGeneralInputChange("applications", e.target.value)
            }
            required
          />

          {/* Previous, Next, and Save Draft Buttons */}
          <Group position="apart" mt="lg">
            <Button color="blue" onClick={prevPage}>
              Previous
            </Button>
            <Button onClick={nextPage} color="blue">
              Next
            </Button>
            <Button onClick={handleSaveDraft} color="blue">
              Save Draft
            </Button>
          </Group>
        </form>
      )}

      {step === 3 && (
        <form style={{ margin: "32px", width: "1250px", marginRight: "0px" }}>
          {/* Step 3: IPR Ownership Questions */}
          <Title order={2} align="center" mb={20} style={{ fontSize: "24px" }}>
            Section - II : (IPR Ownership)
          </Title>
          <Textarea
            resize="vertical"
            label="1.	Was the intellectual property created with the significant use of funds or facilities of IIITDM Jabalpur?"
            placeholder="Describe the significant use of your invention"
            minRows={4}
            mb={10}
            value={iprOwnershipQuestions.significantUse}
            onChange={(e) =>
              handleIprOwnershipInputChange("significantUse", e.target.value)
            }
            required
          />
          <Textarea
            resize="vertical"
            label="2.	Please describe the source of funding for the invention."
            placeholder="Enter the funding source"
            minRows={4}
            mb={5}
            value={iprOwnershipQuestions.fundingSource}
            onChange={(e) =>
              handleIprOwnershipInputChange("fundingSource", e.target.value)
            }
            required
          />
          <FileInput
            label="If yes, Name of the funding agency and copy of agreement, letter of intent, must be uploaded here."
            placeholder="Click here to upload funding agency details"
            multiple
            clearable
            value={files}
            onChange={setFiles}
            accept="image/*"
          />
          <div style={{ marginTop: "5px", marginBottom: "10px" }}>
            {files.map((file, index) => (
              <div key={index}>
                <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)}{" "}
                KB)
              </div>
            ))}
          </div>
          <Textarea
            resize="vertical"
            label="3.	Have you presented/published  in any Journal/conference if yes, please give details?"
            placeholder="Enter presentation details"
            minRows={4}
            mb={10}
            value={iprOwnershipQuestions.presentationDetails}
            onChange={(e) =>
              handleIprOwnershipInputChange(
                "presentationDetails",
                e.target.value,
              )
            }
            required
          />
          <Textarea
            resize="vertical"
            label="4.	Was the intellectual property created in the course of or pursuant to a sponsored or a consultancy research agreement with IIITDM Jabalpur?"
            placeholder="Enter MOU details"
            minRows={4}
            mb={5}
            value={iprOwnershipQuestions.mOUDetails}
            onChange={(e) =>
              handleIprOwnershipInputChange("mOUDetails", e.target.value)
            }
            required
          />
          <FileInput
            label="If yes, please upload a copy of MOU with concerned project."
            placeholder="Click here to upload MOU details"
            multiple
            clearable
            value={files}
            onChange={setFiles}
            accept="image/*"
          />
          <div style={{ marginTop: "5px", marginBottom: "10px" }}>
            {files.map((file, index) => (
              <div key={index}>
                <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)}{" "}
                KB)
              </div>
            ))}
          </div>
          <Textarea
            resize="vertical"
            label="5.	Was the intellectual property created as a part of academic research leading towards a degree or otherwise?"
            placeholder="Describe academic research involvement"
            minRows={4}
            mb={10}
            value={iprOwnershipQuestions.academicResearch}
            onChange={(e) =>
              handleIprOwnershipInputChange("academicResearch", e.target.value)
            }
            required
          />

          {/* Previous, Save Draft and Submit Buttons */}
          <Group position="apart" mt="lg">
            <Button color="blue" onClick={prevPage}>
              Previous
            </Button>
            <Button onClick={nextPage} color="blue">
              Next
            </Button>
          </Group>
        </form>
      )}

      {step === 4 && (
        <form>
          <Title order={2} align="center" mb={20} style={{ fontSize: "24px" }}>
            Section - II : (IPR Ownership)
          </Title>
          <Text size="sm" mb={20}>
            6. Please disclose the extent of contribution of each inventor in
            the invention in percentage terms for revenue sharing.
          </Text>
          {inventors.map((inventor, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "30px",
                marginBottom: "10px",
              }}
            >
              <TextInput
                label={`Inventor ${index + 1} Name`}
                placeholder="Enter Inventor Name"
                value={inventor.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                style={{ width: "300px" }}
                required
              />
              <TextInput
                label={`Inventor ${index + 1} % Share`}
                placeholder="Enter Percentage Share"
                value={inventor.share}
                onChange={(e) =>
                  handleInputChange(index, "share", e.target.value)
                }
                required
              />
              <Group spacing="xs">
                {inventors.length > 1 && (
                  <Button
                    color="blue"
                    onClick={() => handleRemoveInventor(index)}
                    style={{ marginTop: "25px" }}
                  >
                    Remove
                  </Button>
                )}
                {index === inventors.length - 1 && (
                  <Button
                    color="blue"
                    onClick={handleAddInventor}
                    style={{ marginTop: "25px" }}
                  >
                    Add
                  </Button>
                )}
              </Group>
            </div>
          ))}
          <Text size="sm" mt={10}>
            * If this column is not filled then it will be assumed that all
            inventor(s) have equal contribution, however still all inventor(s)
            have to sign it. Once you have filled in the contribution
            percentages, you can click the "Notify Inventors" button to send
            notifications to all inventors involved. This notification will
            prompt them to review their contributions and digitally sign the
            revenue-sharing agreement. After sending the notifications, you can
            use the "View Status" button to check which inventors have submitted
            their contributions and consented to the agreement.
          </Text>

          {/* Notify Inventors and View Status Buttons */}
          <Group position="apart" mt="md">
            <Button color="blue" onClick={handleNotifyInventors}>
              Notify Inventors
            </Button>
            <Button color="blue" onClick={handleViewStatus}>
              View Status
            </Button>
          </Group>

          {/* Previous, Save Draft, and Next Buttons */}
          <Group position="apart" mt="lg">
            <Button color="blue" onClick={prevPage}>
              Previous
            </Button>
            <Button color="blue" onClick={nextPage}>
              Next
            </Button>
            <Button color="blue" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
          </Group>
        </form>
      )}

      {step === 5 && (
        <form style={{ margin: "32px", width: "1250px", marginRight: "0px" }}>
          <Title order={2} align="center" mb={20} style={{ fontSize: "24px" }}>
            Section - III : (Commercialization)
          </Title>
          {/* 1. Target Companies */}
          <Text size="sm" mb={10}>
            1. Who are the Target companies, both in India or abroad?
          </Text>
          <Text size="sm" mb={20}>
            Please give specific list of companies and contact details of the
            concerned person who can be contacted for initiating Technology
            Licensing.
          </Text>
          {/* Table for Company, Concerned Person, and Contact Number */}
          <Table>
            <thead>
              <tr>
                <th>Name of Company</th>
                <th>Name of Concerned Person</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index}>
                  <td>
                    <TextInput
                      placeholder="Company Name"
                      value={company.name}
                      onChange={(e) =>
                        handleCompanyInputChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <TextInput
                      placeholder="Concerned Person"
                      value={company.concernedPerson}
                      onChange={(e) =>
                        handleCompanyInputChange(
                          index,
                          "concernedPerson",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </td>
                  <td>
                    <TextInput
                      placeholder="Contact Number"
                      value={company.contact}
                      onChange={(e) =>
                        handleCompanyInputChange(
                          index,
                          "contact",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </td>
                  <td>
                    {/* Button to remove the company entry */}
                    <Button
                      type="button"
                      color="blue"
                      onClick={() => removeCompany(index)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Button to add more companies */}
          <Button
            type="button"
            color="blue"
            onClick={addNewCompany} // This function should be defined to add new entries
            mt={10}
          >
            + Add More Companies
          </Button>
          {/* 2. Development Stage */}
          <Text size="sm" mt={20} mb={10}>
            2. Development stage:
          </Text>
          <Text size="sm" mb={10}>
            In your opinion, which of the three best describes the current stage
            of development of the invention as it relates to its marketability:
          </Text>
          <Checkbox
            value="Embryonic"
            label="Embryonic (needs substantial work to bring to market)"
            onChange={handleCheckboxChange}
            size="sm"
            my={5}
          />
          <Checkbox
            value="Partially Developed"
            label="Partially developed (could be brought to market with significant investment)"
            onChange={handleCheckboxChange}
            my={5}
          />
          <Checkbox
            value="Off-the-shelf"
            label="Off-the-shelf (could be brought to market with nominal investment)"
            onChange={handleCheckboxChange}
            my={5}
          />
          <Text size="sm" mt={20} mb={10}>
            Download the following form, duly fill and sign it, and upload it
            afterward.
          </Text>
          <Button color="blue" mb={10} onClick={handleDownload}>
            Download Form-III
          </Button>
          <FileInput
            label="Please upload duly filled and signed Form-III"
            placeholder="Click here to upload form"
            multiple
            clearable
            value={files}
            mt={5}
            onChange={setFiles}
            accept="image/*"
          />
          <div style={{ marginBottom: "10px" }}>
            {files.map((file, index) => (
              <div key={index}>
                <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)}{" "}
                KB)
              </div>
            ))}
          </div>
          <Text size="sm" mt={20} mb={20} fw={700}>
            Undertaking: Intellectual Property is filing on the behalf of the
            Institute.
          </Text>
          {/* Previous, Save Draft, and Next Buttons */}
          <Group position="apart" mt="lg">
            <Button color="blue" onClick={prevPage}>
              Previous
            </Button>
            <Button color="blue" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button color="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </Group>
        </form>
      )}
    </Paper>
  );
}

DesktopForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  step: PropTypes.number.isRequired,
  applicationTitle: PropTypes.string.isRequired,
  setApplicationTitle: PropTypes.func.isRequired,
  inventors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      mobile: PropTypes.string,
    }),
  ).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleRemoveInventor: PropTypes.func.isRequired,
  handleAddInventor: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  generalQuestions: PropTypes.shape({
    inventionArea: PropTypes.string,
    problemArea: PropTypes.string,
    objective: PropTypes.string,
    novelty: PropTypes.string,
    utility: PropTypes.string,
    tested: PropTypes.string,
    applications: PropTypes.string,
  }).isRequired,
  handleGeneralInputChange: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  setFiles: PropTypes.func.isRequired,
  iprOwnershipQuestions: PropTypes.shape({
    significantUse: PropTypes.string,
    fundingSource: PropTypes.string,
    presentationDetails: PropTypes.string,
    mOUDetails: PropTypes.string,
    academicResearch: PropTypes.string,
  }).isRequired,
  handleIprOwnershipInputChange: PropTypes.func.isRequired,
  handleNotifyInventors: PropTypes.func.isRequired,
  handleViewStatus: PropTypes.func.isRequired,
  handleSaveDraft: PropTypes.func.isRequired,
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      concernedPerson: PropTypes.string,
      contact: PropTypes.string,
    }),
  ).isRequired,
  handleCompanyInputChange: PropTypes.func.isRequired,
  removeCompany: PropTypes.func.isRequired,
  addNewCompany: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

// Mobile Form Component
function MobileForm({
  loading,
  error,
  step,
  applicationTitle,
  setApplicationTitle,
  inventors,
  handleInputChange,
  handleRemoveInventor,
  handleAddInventor,
  nextPage,
  prevPage,
  generalQuestions,
  handleGeneralInputChange,
  files,
  setFiles,
  iprOwnershipQuestions,
  handleIprOwnershipInputChange,
  handleNotifyInventors,
  handleViewStatus,
  handleSaveDraft,
  companies,
  handleCompanyInputChange,
  removeCompany,
  addNewCompany,
  handleCheckboxChange,
  handleDownload,
  handleSubmit,
}) {
  return (
    <Paper shadow="xs" p="md" mx={16} pos="relative">
      <LoadingOverlay visible={loading} overlayBlur={2} />
      {error && (
        <Alert color="red" mb={20}>
          {error}
        </Alert>
      )}
      <Title order={1} align="center" mb={20} style={{ fontSize: "1.5rem" }}>
        Intellectual Property Filing Form
      </Title>
      <Text align="center" size="sm" mb={20}>
        (Please use this form for all types of IP, including Patents, Copyright,
        Designs, Marks, and even Know-how)
      </Text>
      {step === 1 && (
        <form>
          <Title
            order={2}
            align="center"
            mb={20}
            style={{ fontSize: "1.25rem" }}
          >
            Section - I : (Administrative and Technical Details)
          </Title>
          {/* Step 1: Title of Application */}
          <TextInput
            label="Title of Application"
            placeholder="Enter title of the application"
            value={applicationTitle}
            onChange={(e) => setApplicationTitle(e.target.value)}
            mb="md"
            required
          />
          <Text size="sm" mb={10}>
            1. Please list inventor(s) who have contributed in the main
            inventive step of the invention.
          </Text>
          <Text size="sm" fw={700} mb={20}>
            Note : Students should provide their permanent (personal) Email-ID
          </Text>
          {inventors.map((inventor, index) => (
            <Grid key={index} gutter="sm" mb="md">
              <Grid.Col span={12} sm={6}>
                <TextInput
                  label={`Inventor-${index + 1} Name`}
                  placeholder="Name of Inventor"
                  value={inventor.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={12} sm={6}>
                <TextInput
                  label="Email"
                  placeholder="Email of Inventor"
                  value={inventor.email}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={12} sm={6}>
                <TextInput
                  label="Contact Address"
                  placeholder="Contact Address of Inventor"
                  value={inventor.address}
                  onChange={(e) =>
                    handleInputChange(index, "address", e.target.value)
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={12} sm={6}>
                <TextInput
                  label="Mobile Number"
                  placeholder="Mobile Number of Inventor"
                  value={inventor.mobile}
                  onChange={(e) =>
                    handleInputChange(index, "mobile", e.target.value)
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Button
                  color="red"
                  onClick={() => handleRemoveInventor(index)}
                  fullWidth
                >
                  Remove
                </Button>
              </Grid.Col>
            </Grid>
          ))}

          {/* Add Inventor Button */}
          <Group position="center" mt="md">
            <Button onClick={handleAddInventor} color="blue" fullWidth>
              Add Inventor
            </Button>
          </Group>

          {/* Next Button */}
          <Group position="center" mt="lg">
            <Button onClick={nextPage} color="blue" fullWidth>
              Next
            </Button>
          </Group>
        </form>
      )}

      {step === 2 && (
        <form>
          <Title
            order={2}
            align="center"
            mb={20}
            style={{ fontSize: "1.25rem" }}
          >
            Section - I : (Administrative and Technical Details)
          </Title>
          <Grid gutter="sm">
            <Grid.Col span={12}>
              <TextInput
                label="2. What is the area of the invention?"
                placeholder="Enter the area of the invention"
                value={generalQuestions.inventionArea}
                onChange={(e) =>
                  handleGeneralInputChange("inventionArea", e.target.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="3. What is the problem in the area?"
                placeholder="Enter the problem in the area"
                value={generalQuestions.problemArea}
                onChange={(e) =>
                  handleGeneralInputChange("problemArea", e.target.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="4. What is the objective of your invention?"
                placeholder="Enter the objective of the invention"
                value={generalQuestions.objective}
                onChange={(e) =>
                  handleGeneralInputChange("objective", e.target.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="5. What is the Novelty?"
                placeholder="Enter the novelty of the invention"
                value={generalQuestions.novelty}
                onChange={(e) =>
                  handleGeneralInputChange("novelty", e.target.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="6. What is the utility (advantages) of the present invention over comparable inventors available in literature including patents?"
                placeholder="Describe the advantages over comparable inventors"
                value={generalQuestions.utility}
                onChange={(e) =>
                  handleGeneralInputChange("utility", e.target.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="7. Has the invention been tested experimentally?"
                placeholder="Proof-of-concept/Prototype details"
                value={generalQuestions.tested}
                onChange={(e) =>
                  handleGeneralInputChange("tested", e.target.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <FileInput
                label="If yes, please add the details of the proof of concept/Prototype"
                placeholder="Click here to upload proof of concept/Prototype"
                multiple
                clearable
                value={files}
                onChange={setFiles}
                accept="image/*"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                resize="vertical"
                label="8. Can you think of applications of your invention?"
                placeholder="List down applications of your invention"
                minRows={4}
                value={generalQuestions.applications}
                onChange={(e) =>
                  handleGeneralInputChange("applications", e.target.value)
                }
                required
              />
            </Grid.Col>
          </Grid>

          {/* Previous, Next, and Save Draft Buttons */}
          <Group position="apart" mt="lg">
            <Button color="blue" onClick={prevPage} fullWidth>
              Previous
            </Button>
            <Button onClick={nextPage} color="blue" fullWidth>
              Next
            </Button>
            <Button onClick={handleSaveDraft} color="blue" fullWidth>
              Save Draft
            </Button>
          </Group>
        </form>
      )}

      {step === 3 && (
        <form>
          {/* Step 3: IPR Ownership Questions */}
          <Title
            order={2}
            align="center"
            mb={20}
            style={{ fontSize: "1.25rem" }}
          >
            Section - II : (IPR Ownership)
          </Title>
          <Grid gutter="sm">
            <Grid.Col span={12}>
              <Textarea
                resize="vertical"
                label="1. Was the intellectual property created with the significant use of funds or facilities of IIITDM Jabalpur?"
                placeholder="Describe the significant use of your invention"
                minRows={4}
                value={iprOwnershipQuestions.significantUse}
                onChange={(e) =>
                  handleIprOwnershipInputChange(
                    "significantUse",
                    e.target.value,
                  )
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                resize="vertical"
                label="2. Please describe the source of funding for the invention."
                placeholder="Enter the funding source"
                minRows={4}
                value={iprOwnershipQuestions.fundingSource}
                onChange={(e) =>
                  handleIprOwnershipInputChange("fundingSource", e.target.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <FileInput
                label="If yes, Name of the funding agency and copy of agreement, letter of intent, must be uploaded here."
                placeholder="Click here to upload funding agency details"
                multiple
                clearable
                value={files}
                onChange={setFiles}
                accept="image/*"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                resize="vertical"
                label="3. Have you presented/published in any Journal/conference if yes, please give details?"
                placeholder="Enter presentation details"
                minRows={4}
                value={iprOwnershipQuestions.presentationDetails}
                onChange={(e) =>
                  handleIprOwnershipInputChange(
                    "presentationDetails",
                    e.target.value,
                  )
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                resize="vertical"
                label="4. Was the intellectual property created in the course of or pursuant to a sponsored or a consultancy research agreement with IIITDM Jabalpur?"
                placeholder="Enter MOU details"
                minRows={4}
                value={iprOwnershipQuestions.mOUDetails}
                onChange={(e) =>
                  handleIprOwnershipInputChange("mOUDetails", e.target.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <FileInput
                label="If yes, please upload a copy of MOU with concerned project."
                placeholder="Click here to upload MOU details"
                multiple
                clearable
                value={files}
                onChange={setFiles}
                accept="image/*"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                resize="vertical"
                label="5. Was the intellectual property created as a part of academic research leading towards a degree or otherwise?"
                placeholder="Describe academic research involvement"
                minRows={4}
                value={iprOwnershipQuestions.academicResearch}
                onChange={(e) =>
                  handleIprOwnershipInputChange(
                    "academicResearch",
                    e.target.value,
                  )
                }
                required
              />
            </Grid.Col>
          </Grid>

          {/* Previous, Save Draft and Submit Buttons */}
          <Group position="apart" mt="lg">
            <Button color="blue" onClick={prevPage} fullWidth>
              Previous
            </Button>
            <Button onClick={nextPage} color="blue" fullWidth>
              Next
            </Button>
          </Group>
        </form>
      )}

      {step === 4 && (
        <form>
          <Title
            order={2}
            align="center"
            mb={20}
            style={{ fontSize: "1.25rem" }}
          >
            Section - II : (IPR Ownership)
          </Title>
          <Text size="sm" mb={20}>
            6. Please disclose the extent of contribution of each inventor in
            the invention in percentage terms for revenue sharing.
          </Text>
          {inventors.map((inventor, index) => (
            <Grid key={index} gutter="sm" mb="md">
              <Grid.Col span={12}>
                <TextInput
                  label={`Inventor ${index + 1} Name`}
                  placeholder="Enter Inventor Name"
                  value={inventor.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label={`Inventor ${index + 1} % Share`}
                  placeholder="Enter Percentage Share"
                  value={inventor.share}
                  onChange={(e) =>
                    handleInputChange(index, "share", e.target.value)
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                {/* Remove Button for Mobile Version */}
                {inventors.length > 1 && (
                  <Button
                    color="red"
                    onClick={() => handleRemoveInventor(index)}
                    fullWidth
                  >
                    Remove Inventor
                  </Button>
                )}
              </Grid.Col>
            </Grid>
          ))}

          {/* Add Button for Mobile Version */}
          <Grid>
            <Grid.Col span={12}>
              <Button color="blue" onClick={handleAddInventor} fullWidth>
                Add Inventor
              </Button>
            </Grid.Col>
          </Grid>

          {/* Notify Inventors and View Status Buttons */}
          <Group position="apart" mt="md">
            <Button color="blue" onClick={handleNotifyInventors} fullWidth>
              Notify Inventors
            </Button>
            <Button color="blue" onClick={handleViewStatus} fullWidth>
              View Status
            </Button>
          </Group>

          {/* Previous, Save Draft, and Next Buttons */}
          <Group position="apart" mt="lg">
            <Button color="blue" onClick={prevPage} fullWidth>
              Previous
            </Button>
            <Button color="blue" onClick={nextPage} fullWidth>
              Next
            </Button>
            <Button color="blue" onClick={handleSaveDraft} fullWidth>
              Save as Draft
            </Button>
          </Group>
        </form>
      )}

      {step === 5 && (
        <form>
          <Title
            order={2}
            align="center"
            mb={20}
            style={{ fontSize: "1.25rem" }}
          >
            Section - III : (Commercialization)
          </Title>
          {/* 1. Target Companies */}
          <Text size="sm" mb={10}>
            1. Who are the Target companies, both in India or abroad?
          </Text>
          <Text size="sm" mb={20}>
            Please give specific list of companies and contact details of the
            concerned person who can be contacted for initiating Technology
            Licensing.
          </Text>
          {/* Table for Company, Concerned Person, and Contact Number */}
          <ScrollArea>
            <Table>
              <thead>
                <tr>
                  <th>Name of Company</th>
                  <th>Name of Concerned Person</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company, index) => (
                  <tr key={index}>
                    <td>
                      <TextInput
                        placeholder="Company Name"
                        value={company.name}
                        onChange={(e) =>
                          handleCompanyInputChange(
                            index,
                            "name",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </td>
                    <td>
                      <TextInput
                        placeholder="Concerned Person"
                        value={company.concernedPerson}
                        onChange={(e) =>
                          handleCompanyInputChange(
                            index,
                            "concernedPerson",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </td>
                    <td>
                      <TextInput
                        placeholder="Contact Number"
                        value={company.contact}
                        onChange={(e) =>
                          handleCompanyInputChange(
                            index,
                            "contact",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </td>
                    <td>
                      <Button
                        type="button"
                        color="red"
                        onClick={() => removeCompany(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
          {/* Button to add more companies */}
          <Button
            type="button"
            color="blue"
            onClick={addNewCompany}
            mt={10}
            fullWidth
          >
            + Add More Companies
          </Button>
          {/* 2. Development Stage */}
          <Text size="sm" mt={20} mb={10}>
            2. Development stage:
          </Text>
          <Text size="sm" mb={10}>
            In your opinion, which of the three best describes the current stage
            of development of the invention as it relates to its marketability:
          </Text>
          <Checkbox
            value="Embryonic"
            label="Embryonic (needs substantial work to bring to market)"
            onChange={handleCheckboxChange}
            size="sm"
            my={5}
          />
          <Checkbox
            value="Partially Developed"
            label="Partially developed (could be brought to market with significant investment)"
            onChange={handleCheckboxChange}
            my={5}
          />
          <Checkbox
            value="Off-the-shelf"
            label="Off-the-shelf (could be brought to market with nominal investment)"
            onChange={handleCheckboxChange}
            my={5}
          />
          <Text size="sm" mt={20} mb={10}>
            Download the following form, duly fill and sign it, and upload it
            afterward.
          </Text>
          <Button color="blue" mb={10} onClick={handleDownload} fullWidth>
            Download Form-III
          </Button>
          <FileInput
            label="Please upload duly filled and signed Form-III"
            placeholder="Click here to upload form"
            multiple
            clearable
            value={files}
            mt={5}
            onChange={setFiles}
            accept="image/*"
          />
          <Text size="sm" mt={20} mb={20} fw={700}>
            Undertaking: Intellectual Property is filing on the behalf of the
            Institute.
          </Text>
          {/* Previous, Save Draft, and Next Buttons */}
          <Group position="apart" mt="lg">
            <Button color="blue" onClick={prevPage} fullWidth>
              Previous
            </Button>
            <Button color="blue" onClick={handleSaveDraft} fullWidth>
              Save as Draft
            </Button>
            <Button color="blue" onClick={handleSubmit} fullWidth>
              Submit
            </Button>
          </Group>
        </form>
      )}
    </Paper>
  );
}

MobileForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  step: PropTypes.number.isRequired,
  applicationTitle: PropTypes.string.isRequired,
  setApplicationTitle: PropTypes.func.isRequired,
  inventors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      mobile: PropTypes.string,
    }),
  ).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleRemoveInventor: PropTypes.func.isRequired,
  handleAddInventor: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  generalQuestions: PropTypes.shape({
    inventionArea: PropTypes.string,
    problemArea: PropTypes.string,
    objective: PropTypes.string,
    novelty: PropTypes.string,
    utility: PropTypes.string,
    tested: PropTypes.string,
    applications: PropTypes.string,
  }).isRequired,
  handleGeneralInputChange: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  setFiles: PropTypes.func.isRequired,
  iprOwnershipQuestions: PropTypes.shape({
    significantUse: PropTypes.string,
    fundingSource: PropTypes.string,
    presentationDetails: PropTypes.string,
    mOUDetails: PropTypes.string,
    academicResearch: PropTypes.string,
  }).isRequired,
  handleIprOwnershipInputChange: PropTypes.func.isRequired,
  handleNotifyInventors: PropTypes.func.isRequired,
  handleViewStatus: PropTypes.func.isRequired,
  handleSaveDraft: PropTypes.func.isRequired,
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      concernedPerson: PropTypes.string,
      contact: PropTypes.string,
    }),
  ).isRequired,
  handleCompanyInputChange: PropTypes.func.isRequired,
  removeCompany: PropTypes.func.isRequired,
  addNewCompany: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function ApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inventors, setInventors] = useState([
    { name: "", email: "", address: "", mobile: "" },
  ]);
  const [applicationTitle, setApplicationTitle] = useState("");
  const [step, setStep] = useState(1); // Tracks the current step (or page) of the form
  const [generalQuestions, setGeneralQuestions] = useState({
    inventionArea: "",
    problemArea: "",
    objective: "",
    novelty: "",
    utility: "",
    tested: "",
    applications: "",
  });
  const [files, setFiles] = useState([]);
  const [iprOwnershipQuestions, setIprOwnershipQuestions] = useState({
    significantUse: "",
    fundingSource: "",
    presentationDetails: "",
    mOUDetails: "",
    academicResearch: "",
  });

  const [companies, setCompanies] = useState([
    { name: "", concernedPerson: "", contact: "" },
  ]);

  // State variables for development stages
  const [developmentStage, setDevelopmentStage] = useState({
    embryonic: false,
    partiallyDeveloped: false,
    offTheShelf: false,
  });

  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile

  const navigate = useNavigate(); // To navigate to saved drafts page

  // Function to check if the screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px is a common breakpoint for mobile devices
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
    };
  }, []);

  // Function to handle adding a new inventor
  const handleAddInventor = () => {
    setInventors([
      ...inventors,
      { name: "", email: "", address: "", mobile: "" },
    ]);
  };

  // Function to handle removing an inventor
  const handleRemoveInventor = (index) => {
    const updatedInventors = inventors.filter((_, i) => i !== index);
    setInventors(updatedInventors);
  };

  // Function to handle input changes for each inventor
  const handleInputChange = (index, field, value) => {
    const updatedInventors = inventors.map((inventor, i) =>
      i === index ? { ...inventor, [field]: value } : inventor,
    );
    setInventors(updatedInventors);
  };

  // Function to handle general question changes
  const handleGeneralInputChange = (field, value) => {
    setGeneralQuestions({ ...generalQuestions, [field]: value });
  };

  // Function to handle IPR ownership question changes
  const handleIprOwnershipInputChange = (field, value) => {
    setIprOwnershipQuestions({ ...iprOwnershipQuestions, [field]: value });
  };

  const handleNotifyInventors = () => {
    // Logic for notifying inventors
    alert("Inventors notified!");
  };

  const handleViewStatus = () => {
    // Logic for viewing status
    alert("Viewing status!");
  };

  // Method to handle input change in the company table
  const handleCompanyInputChange = (index, field, value) => {
    const updatedCompanies = [...companies];
    updatedCompanies[index][field] = value;
    setCompanies(updatedCompanies);
  };

  // Method to add a new row for company details
  const addNewCompany = () => {
    setCompanies([
      ...companies,
      { name: "", concernedPerson: "", contact: "" },
    ]);
  };

  const removeCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
  };

  // Method to handle checkbox change for development stage
  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setDevelopmentStage((prevStage) => ({
      ...prevStage,
      [value]: !prevStage[value],
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate application title
      if (!applicationTitle.trim()) {
        throw new Error("Application title is required");
      }

      // Validate inventors
      if (inventors.length === 0) {
        throw new Error("At least one inventor is required");
      }

      // Check if all inventor fields are filled
      const invalidInventor = inventors.find(
        (inventor) =>
          !inventor.name.trim() ||
          !inventor.email.trim() ||
          !inventor.address.trim() ||
          !inventor.mobile.trim(),
      );

      if (invalidInventor) {
        throw new Error(
          "Please fill all inventor details (name, email, address, and mobile)",
        );
      }

      // Validate general questions
      const requiredGeneralFields = {
        inventionArea: "Area of invention",
        problemArea: "Problem in the area",
        objective: "Objective of invention",
        novelty: "Novelty",
        utility: "Utility/advantages",
        tested: "Testing status",
        applications: "Applications",
      };

      Object.entries(requiredGeneralFields).forEach(([field, label]) => {
        if (!generalQuestions[field].trim()) {
          throw new Error(`${label} is required`);
        }
      });

      // Validate IPR ownership questions
      const requiredIprFields = {
        significantUse: "Significant use of funds/facilities",
        fundingSource: "Source of funding",
        presentationDetails: "Presentation/publication details",
        mOUDetails: "MOU details",
        academicResearch: "Academic research involvement",
      };

      Object.entries(requiredIprFields).forEach(([field, label]) => {
        if (!iprOwnershipQuestions[field].trim()) {
          throw new Error(`${label} is required`);
        }
      });

      // Validate companies
      if (companies.length === 0) {
        throw new Error("At least one target company is required");
      }

      // Check if all company fields are filled
      const invalidCompany = companies.find(
        (company) =>
          !company.name.trim() ||
          !company.concernedPerson.trim() ||
          !company.contact.trim(),
      );

      if (invalidCompany) {
        throw new Error(
          "Please fill all company details (name, concerned person, and contact)",
        );
      }

      // Validate development stage selection
      if (!Object.values(developmentStage).some((value) => value)) {
        throw new Error("Please select a development stage");
      }

      // Create the main application data
      const applicationData = {
        title: applicationTitle,
        status: "PENDING",
        decision_status: "PENDING",
        decision_date: new Date().toISOString(),
      };

      // Create section I data
      const sectionIData = {
        area: generalQuestions.inventionArea,
        problem: generalQuestions.problemArea,
        objective: generalQuestions.objective,
        novelty: generalQuestions.novelty,
        advantages: generalQuestions.utility,
        is_tested: generalQuestions.tested.toLowerCase().includes("yes"),
        applications: generalQuestions.applications,
      };

      // Create section II data
      const sectionIIData = {
        existing_tech: iprOwnershipQuestions.significantUse,
        limitation: iprOwnershipQuestions.fundingSource,
        present_invention: iprOwnershipQuestions.presentationDetails,
        comparison: iprOwnershipQuestions.mOUDetails,
        differences: iprOwnershipQuestions.academicResearch,
        trial_status: "PENDING",
      };

      // Create section III data
      const sectionIIIData = {
        potential_industry: companies.map((company) => company.name).join(", "),
        potential_customer: companies
          .map((company) => `${company.concernedPerson} (${company.contact})`)
          .join(", "),
        future_plans: Object.entries(developmentStage)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(", "),
        commercialization: "PENDING",
        licensing_interest: "PENDING",
      };

      // Combine all data
      const formPayload = {
        application: applicationData,
        section_i: sectionIData,
        section_ii: sectionIIData,
        section_iii: sectionIIIData,
        inventors: inventors.map(({ name, email, address, mobile, share }) => ({
          name,
          email,
          address,
          mobile,
          share: share || "0",
        })),
      };

      // Make API call to submit the form
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/patentsystem/applicant/applications/submit",
        formPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        },
      );

      if (response.status === 200 || response.status === 201) {
        alert("Form submitted successfully!");
        navigate("/patent/applicant/applications");
      } else {
        throw new Error(response.data?.message || "Submission failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while submitting the form. Please try again.",
      );
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to go to the next page of the form
  const nextPage = () => {
    setStep(step + 1);
  };

  // Function to go to the previous page of the form
  const prevPage = () => {
    setStep(step - 1);
  };

  // Function to save the draft
  const handleSaveDraft = () => {
    const draft = {
      applicationTitle,
      inventors,
      generalQuestions,
      iprOwnershipQuestions,
    };

    // Save the draft in localStorage (or you can use a backend API call)
    const savedDrafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    savedDrafts.push(draft);
    localStorage.setItem("savedDrafts", JSON.stringify(savedDrafts));

    alert("Draft saved successfully!");
    navigate("/patent/applicant/");
  };

  const handleDownload = () => {
    window.open("https://example.com/sample.pdf", "_blank");
  };

  // Render the appropriate form based on screen width
  return isMobile ? (
    <MobileForm
      loading={loading}
      error={error}
      step={step}
      applicationTitle={applicationTitle}
      setApplicationTitle={setApplicationTitle}
      inventors={inventors}
      handleInputChange={handleInputChange}
      handleRemoveInventor={handleRemoveInventor}
      handleAddInventor={handleAddInventor}
      nextPage={nextPage}
      prevPage={prevPage}
      generalQuestions={generalQuestions}
      handleGeneralInputChange={handleGeneralInputChange}
      files={files}
      setFiles={setFiles}
      iprOwnershipQuestions={iprOwnershipQuestions}
      handleIprOwnershipInputChange={handleIprOwnershipInputChange}
      handleNotifyInventors={handleNotifyInventors}
      handleViewStatus={handleViewStatus}
      handleSaveDraft={handleSaveDraft}
      companies={companies}
      handleCompanyInputChange={handleCompanyInputChange}
      removeCompany={removeCompany}
      addNewCompany={addNewCompany}
      handleCheckboxChange={handleCheckboxChange}
      handleDownload={handleDownload}
      handleSubmit={handleSubmit}
    />
  ) : (
    <DesktopForm
      loading={loading}
      error={error}
      step={step}
      applicationTitle={applicationTitle}
      setApplicationTitle={setApplicationTitle}
      inventors={inventors}
      handleInputChange={handleInputChange}
      handleRemoveInventor={handleRemoveInventor}
      handleAddInventor={handleAddInventor}
      nextPage={nextPage}
      prevPage={prevPage}
      generalQuestions={generalQuestions}
      handleGeneralInputChange={handleGeneralInputChange}
      files={files}
      setFiles={setFiles}
      iprOwnershipQuestions={iprOwnershipQuestions}
      handleIprOwnershipInputChange={handleIprOwnershipInputChange}
      handleNotifyInventors={handleNotifyInventors}
      handleViewStatus={handleViewStatus}
      handleSaveDraft={handleSaveDraft}
      companies={companies}
      handleCompanyInputChange={handleCompanyInputChange}
      removeCompany={removeCompany}
      addNewCompany={addNewCompany}
      handleCheckboxChange={handleCheckboxChange}
      handleDownload={handleDownload}
      handleSubmit={handleSubmit}
    />
  );
}

export default ApplicationForm;
