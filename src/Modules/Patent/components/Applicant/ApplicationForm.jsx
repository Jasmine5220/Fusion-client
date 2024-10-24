/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
  TextInput,
  Button,
  Group,
  Container,
  Title,
  Text,
  Textarea,
  Table,
} from "@mantine/core";
import { useNavigate } from "react-router-dom"; // For redirecting to Saved Drafts page

function ApplicationForm() {
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

  const navigate = useNavigate(); // To navigate to saved drafts page

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
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Application Title:", applicationTitle);
    console.log("Inventor Details:", inventors);
    console.log("General Questions:", generalQuestions);
    console.log("IPR Ownership Questions:", iprOwnershipQuestions);
    alert("Form submitted successfully!");
    navigate("/patent/applicant/applications");
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
    navigate("/patent/applicant/drafts"); // Navigate to the Saved Drafts page
  };

  return (
    <Container size="lg" my={30}>
      <Title order={1} align="center" mb={20}>
        Intellectual Property Filing Form
      </Title>

      <Text align="center" size="sm" mb={20}>
        (Please use this form for all types of IP, including Patents, Copyright,
        Designs, Marks, and even Know-how)
      </Text>
      {step === 1 && (
        <form>
          <Title order={2} align="center" mb={20}>
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
                color="red"
                style={{ alignSelf: "flex-end", wordBreak: "break-word" }}
                onClick={() => handleRemoveInventor(index)}
              >
                Remove Inventor
              </Button>
            </Group>
          ))}

          {/* Add Inventor Button */}
          <Group position="center" mt="md">
            <Button onClick={handleAddInventor} color="green">
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
        <div>
          {/* Step 2: General Questions */}
          <form>
            <Title order={2} align="center" mb={20}>
              Section - I : (Administrative and Technical Details)
            </Title>
            <Text size="lg" weight={500} mb={10}>
              General Questions
            </Text>

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
              label="5. What is the novelty?"
              placeholder="Enter the novelty of the invention"
              value={generalQuestions.novelty}
              onChange={(e) =>
                handleGeneralInputChange("novelty", e.target.value)
              }
              mb="md"
              required
            />
            <TextInput
              label="6. What is the utility (advantages) of the present invention over comparable inventors?"
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
              onChange={(e) =>
                handleGeneralInputChange("tested", e.target.value)
              }
              mb="md"
              required
            />
            <Textarea
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
              <Button color="gray" onClick={prevPage}>
                Previous
              </Button>
              <Button onClick={nextPage} color="blue">
                Next
              </Button>
              <Button onClick={handleSaveDraft} color="orange">
                Save Draft
              </Button>
            </Group>
          </form>
        </div>
      )}

      {step === 3 && (
        <div>
          {/* Step 3: IPR Ownership Questions */}
          <form>
            <Title order={2} align="center" mb={20}>
              Section - II : (IPR Ownership)
            </Title>
            <Text size="lg" weight={500} mb={10}>
              IPR Ownership Questions
            </Text>

            <Textarea
              label="9. What is the significant use of your invention?"
              placeholder="Describe the significant use of your invention"
              minRows={4}
              value={iprOwnershipQuestions.significantUse}
              onChange={(e) =>
                handleIprOwnershipInputChange("significantUse", e.target.value)
              }
              required
            />
            <Textarea
              label="10. What is the source of funding?"
              placeholder="Enter the funding source"
              minRows={4}
              value={iprOwnershipQuestions.fundingSource}
              onChange={(e) =>
                handleIprOwnershipInputChange("fundingSource", e.target.value)
              }
              required
            />
            <Textarea
              label="11. What is the detailed presentation of the invention?"
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
            <Textarea
              label="12. Details of any MOU, if applicable"
              placeholder="Enter MOU details"
              minRows={4}
              value={iprOwnershipQuestions.mOUDetails}
              onChange={(e) =>
                handleIprOwnershipInputChange("mOUDetails", e.target.value)
              }
              required
            />
            <Textarea
              label="13. Any involvement in academic research?"
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

            {/* Previous, Save Draft and Submit Buttons */}
            <Group position="apart" mt="lg">
              <Button color="gray" onClick={prevPage}>
                Previous
              </Button>
              <Button onClick={nextPage} color="blue">
                Next
              </Button>
            </Group>
          </form>
        </div>
      )}
      {/* Step 4: IPR Ownership Questions */}
      {step === 4 && (
        <form>
          <div>
            <Title order={2} align="center" mb={20}>
              Section - II : (IPR Ownership)
            </Title>
            <Text size="sm" mb={20}>
              Please disclose the extent of contribution of each inventor in the
              invention in percentage terms for revenue sharing.
            </Text>
            <div>
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
                        color="red"
                        onClick={() => handleRemoveInventor(index)}
                        style={{ marginTop: "25px" }}
                      >
                        Remove
                      </Button>
                    )}
                    {index === inventors.length - 1 && (
                      <Button
                        color="green"
                        onClick={handleAddInventor}
                        style={{ marginTop: "25px" }}
                      >
                        Add
                      </Button>
                    )}
                  </Group>
                </div>
              ))}
            </div>

            <Text size="xs" mt={10}>
              * If this column is not filled then it will be assumed that all
              inventor(s) have equal contribution, however still all inventor(s)
              have to sign it. Once you have filled in the contribution
              percentages, you can click the "Notify Inventors" button to send
              notifications to all inventors involved. This notification will
              prompt them to review their contributions and digitally sign the
              revenue-sharing agreement. After sending the notifications, you
              can use the "View Status" button to check which inventors have
              submitted their contributions and consented to the agreement.
            </Text>

            {/* Notify Inventors and View Status Buttons */}
            <Group position="apart" mt="md">
              <Button color="cyan" onClick={handleNotifyInventors}>
                Notify Inventors
              </Button>
              <Button color="grape" onClick={handleViewStatus}>
                View Status
              </Button>
            </Group>

            {/* Previous, Save Draft, and Next Buttons */}
            <Group position="apart" mt="lg">
              <Button color="gray" onClick={prevPage}>
                Previous
              </Button>
              <Button color="blue" onClick={nextPage}>
                Next
              </Button>
              <Button color="orange" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
            </Group>
          </div>
        </form>
      )}

      {step === 5 && (
        <form>
          <div>
            <Title order={2} align="center" mb={20}>
              Section - III : (Commercialization)
            </Title>
            {/* 1. Target Companies */}
            <div>
              <h4>1. Who are the Target companies, both in India or abroad?</h4>
              <p>
                Please give specific list of companies and contact details of
                the concerned person who can be contacted for initiating
                Technology Licensing.
              </p>

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
                        {/* Button to remove the company entry */}
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

              {/* Button to add more companies */}
              <div style={{ marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={addNewCompany} // This function should be defined to add new entries
                  className="btn btn-primary"
                  style={{ marginTop: "10px" }}
                >
                  + Add More Companies
                </button>
              </div>
            </div>

            {/* 2. Development Stage */}
            <div style={{ marginTop: "30px" }}>
              <h4>2. Development stage:</h4>
              <p>
                In your opinion, which of the three best describes the current
                stage of development of the invention as it relates to its
                marketability:
              </p>
              <div>
                <label htmlFor="Embryonic">
                  <input
                    type="checkbox"
                    value="Embryonic"
                    onChange={handleCheckboxChange}
                  />
                  Embryonic (needs substantial work to bring to market)
                </label>
              </div>
              <div>
                <label htmlFor="Partially Developed">
                  <input
                    type="checkbox"
                    value="Partially Developed"
                    onChange={handleCheckboxChange}
                  />
                  Partially developed (could be brought to market with
                  significant investment)
                </label>
              </div>
              <div>
                <label htmlFor="Off-the-shelf">
                  <input
                    type="checkbox"
                    value="Off-the-shelf"
                    onChange={handleCheckboxChange}
                  />
                  Off-the-shelf (could be brought to market with nominal
                  investment)
                </label>
              </div>
            </div>

            {/* Previous, Save Draft, and Next Buttons */}
            <Group position="apart" mt="lg">
              <Button color="gray" onClick={prevPage}>
                Previous
              </Button>
              <Button color="orange" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              <Button color="green" onClick={handleSubmit}>
                Submit
              </Button>
            </Group>
          </div>
        </form>
      )}
    </Container>
  );
}

export default ApplicationForm;
