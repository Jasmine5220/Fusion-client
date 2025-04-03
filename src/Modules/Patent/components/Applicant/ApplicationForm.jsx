import React, { useState } from "react";
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
  SimpleGrid,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "@mantine/hooks";

function ApplicationForm() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [inventors, setInventors] = useState([
    {
      name: "",
      email: "",
      collegeemail: "",
      address: "",
      mobile: "",
      Contributionpercentage: "",
    },
  ]);
  const [applicationTitle, setApplicationTitle] = useState("");
  const [step, setStep] = useState(1);
  const [generalQuestions, setGeneralQuestions] = useState({
    inventionArea: "",
    problemArea: "",
    objective: "",
    novelty: "",
    utility: "",
    tested: "",
    applications: "",
  });
  const [section1Files, setSection1Files] = useState([]);
  const [section2FundingFile, setSection2FundingFile] = useState(null);
  const [section2MouFile, setSection2MouFile] = useState(null);
  const [section3FormIII, setSection3FormIII] = useState(null);
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

  const [developmentStage, setDevelopmentStage] = useState({
    embryonic: false,
    partiallyDeveloped: false,
    offTheShelf: false,
  });

  const navigate = useNavigate();

  const handleAddInventor = () => {
    setInventors([
      ...inventors,
      {
        name: "",
        email: "",
        collegeemail: "",
        address: "",
        mobile: "",
        Contributionpercentage: "",
      },
    ]);
  };

  const handleRemoveInventor = (index) => {
    const updatedInventors = inventors.filter((_, i) => i !== index);
    setInventors(updatedInventors);
  };

  const handleInputChange = (index, field, value) => {
    const updatedInventors = inventors.map((inventor, i) =>
      i === index ? { ...inventor, [field]: value } : inventor,
    );
    setInventors(updatedInventors);
  };

  const handleGeneralInputChange = (field, value) => {
    setGeneralQuestions({ ...generalQuestions, [field]: value });
  };

  const handleIprOwnershipInputChange = (field, value) => {
    setIprOwnershipQuestions({ ...iprOwnershipQuestions, [field]: value });
  };

  const handleCompanyInputChange = (index, field, value) => {
    const updatedCompanies = [...companies];
    updatedCompanies[index][field] = value;
    setCompanies(updatedCompanies);
  };

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

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setDevelopmentStage((prevStage) => ({
      ...prevStage,
      [value]: !prevStage[value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent
    const data = {
      title: applicationTitle,
      user_id: 7108, // Replace with actual user ID
      inventors: inventors.map((inventor) => ({
        name: inventor.name,
        institute_mail: inventor.collegeemail,
        personal_mail: inventor.email,
        address: inventor.address,
        mobile: inventor.mobile,
        percentage: inventor.Contributionpercentage,
      })),
      area_of_invention: generalQuestions.inventionArea,
      problem_statement: generalQuestions.problemArea,
      objective: generalQuestions.objective,
      novelty: generalQuestions.novelty,
      advantages: generalQuestions.utility,
      tested_experimentally: generalQuestions.tested === "true",
      applications: generalQuestions.applications,
      funding_details: iprOwnershipQuestions.significantUse,
      funding_source: iprOwnershipQuestions.fundingSource,
      publication_details: iprOwnershipQuestions.presentationDetails,
      mou_details: iprOwnershipQuestions.mOUDetails,
      research_details: iprOwnershipQuestions.academicResearch,
      company_details: companies.map((company) => ({
        company_name: company.name,
        contact_person: company.concernedPerson,
        contact_no: company.contact,
      })),
      development_stage:
        Object.keys(developmentStage).find(
          (stage) => developmentStage[stage],
        ) || "Prototype",
    };

    const formData = new FormData();
    formData.append("json_data", JSON.stringify(data));

    section1Files.forEach((file) => {
      formData.append("poc_details", file);
    });

    // Section II Files
    if (section2FundingFile) {
      formData.append("source_file", section2FundingFile);
    }
    if (section2MouFile) {
      formData.append("mou_file", section2MouFile);
    }

    // Section III File
    if (section3FormIII) {
      formData.append("form_iii", section3FormIII);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/patentsystem/applicant/applications/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert(
        `Application submitted successfully! Token: ${response.data.token}`,
      );
      navigate("/patent/applicant/applications");
    } catch (error) {
      console.error("Error response:", error.response?.data);
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };
  const nextPage = () => {
    setStep(step + 1);
  };

  const prevPage = () => {
    setStep(step - 1);
  };

  const handleSaveDraft = () => {
    const draft = {
      applicationTitle,
      inventors,
      generalQuestions,
      iprOwnershipQuestions,
    };

    const savedDrafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
    savedDrafts.push(draft);
    localStorage.setItem("savedDrafts", JSON.stringify(savedDrafts));

    alert("Draft saved successfully!");
    navigate("/patent/applicant/");
  };

  const handleDownload = () => {
    window.open("https://example.com/sample.pdf", "_blank");
  };

  return (
    <Paper shadow="xs" p={isMobile ? "sm" : "xl"} size="md" mx={isMobile ? 0 : 32}>
      <Title order={1} align="center" mb={20} style={{ fontSize: isMobile ? "20px" : "26px" }}>
        Intellectual Property Filing Form
      </Title>
      <Text align="center" size="sm" mb={20}>
        (Please use this form for all types of IP, including Patents, Copyright,
        Designs, Marks, and even Know-how)
      </Text>
      
      {step === 1 && (
        <form>
          <Title order={2} align="center" mb={20} style={{ fontSize: isMobile ? "18px" : "24px" }}>
            Section - I : (Administrative and Technical Details)
          </Title>
          
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
            inventive step of the invention. (Inventor is a person who has
            actually participated in the inventive step, in case a person has
            worked under instructions, then he/she is not an inventor for the
            purpose of patent.)
          </Text>
          
          <Text size="sm" fw={700} mb={20}>
            Note : Students should provide their permanent (personal) Email-ID
          </Text>
          
          {inventors.map((inventor, index) => (
            <Stack key={index} mb="md" spacing="sm">
              <TextInput
                label={`Inventor-${index + 1} Name`}
                placeholder="Name of Inventor"
                value={inventor.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                required
              />
              
              <SimpleGrid cols={isMobile ? 1 : 2}>
                <TextInput
                  label="Email"
                  placeholder="Email of Inventor"
                  value={inventor.email}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                  required
                />
                <TextInput
                  label="College Email"
                  placeholder="iiitdmj.ac.in email of Inventor"
                  value={inventor.collegeemail}
                  onChange={(e) => handleInputChange(index, "collegeemail", e.target.value)}
                  required
                />
              </SimpleGrid>
              
              <TextInput
                label="Contact Address"
                placeholder="Contact Address of Inventor"
                value={inventor.address}
                onChange={(e) => handleInputChange(index, "address", e.target.value)}
                required
              />
              
              <SimpleGrid cols={isMobile ? 1 : 2}>
                <TextInput
                  label="Mobile Number"
                  placeholder="Mobile Number of Inventor"
                  value={inventor.mobile}
                  onChange={(e) => handleInputChange(index, "mobile", e.target.value)}
                  required
                />
                <TextInput
                  label="Contribution Percentage"
                  placeholder="%"
                  value={inventor.Contributionpercentage}
                  onChange={(e) => handleInputChange(index, "Contributionpercentage", e.target.value)}
                  required
                />
              </SimpleGrid>
              
              <Button
                onClick={() => handleRemoveInventor(index)}
                variant="outline"
                color="blue"
                fullWidth={isMobile}
                style={{ alignSelf: isMobile ? "stretch" : "flex-end" }}
              >
                Remove Inventor
              </Button>
            </Stack>
          ))}

          <Group position="center" mt="md">
            <Button onClick={handleAddInventor} color="blue" fullWidth={isMobile}>
              Add Inventor
            </Button>
          </Group>

          <Group position="center" mt="lg" grow={isMobile}>
            <Button onClick={nextPage} color="blue" fullWidth={isMobile}>
              Next
            </Button>
          </Group>
        </form>
      )}

      {step === 2 && (
        <form>
          <Title order={2} align="center" mb={20} style={{ fontSize: isMobile ? "18px" : "24px" }}>
            Section - I : (Administrative and Technical Details)
          </Title>
          
          <Stack spacing="md">
            <TextInput
              label="2. What is the area of the invention?"
              placeholder="Enter the area of the invention"
              value={generalQuestions.inventionArea}
              onChange={(e) => handleGeneralInputChange("inventionArea", e.target.value)}
              required
            />
            
            <TextInput
              label="3. What is the problem in the area?"
              placeholder="Enter the problem in the area"
              value={generalQuestions.problemArea}
              onChange={(e) => handleGeneralInputChange("problemArea", e.target.value)}
              required
            />
            
            <TextInput
              label="4. What is the objective of your invention?"
              placeholder="Enter the objective of the invention"
              value={generalQuestions.objective}
              onChange={(e) => handleGeneralInputChange("objective", e.target.value)}
              required
            />
            
            <TextInput
              label="5. What is the Novelty?"
              placeholder="Enter the novelty of the invention"
              value={generalQuestions.novelty}
              onChange={(e) => handleGeneralInputChange("novelty", e.target.value)}
              required
            />
            
            <Textarea
              label="6. What is the utility (advantages) of the present invention over comparable inventors available in literature including patents?"
              placeholder="Describe the advantages over comparable inventors"
              value={generalQuestions.utility}
              onChange={(e) => handleGeneralInputChange("utility", e.target.value)}
              required
              minRows={3}
            />
            
            <TextInput
              label="7. Has the invention been tested experimentally?"
              placeholder="Proof-of-concept/Prototype details"
              value={generalQuestions.tested}
              onChange={(e) => handleGeneralInputChange("tested", e.target.value)}
              required
            />
            
            <FileInput
              label="If yes, please add the details of the proof of concept/Prototype"
              placeholder="Click here to upload proof of concept/Prototype"
              multiple
              clearable
              value={section1Files}
              onChange={setSection1Files}
              accept="image/*,application/pdf"
            />
            
            {section1Files.length > 0 && (
              <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                {section1Files.map((file, index) => (
                  <div key={index}>
                    <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
                  </div>
                ))}
              </div>
            )}
            
            <Textarea
              resize="vertical"
              label="8. Can you think of applications of your invention?"
              placeholder="List down applications of your invention"
              minRows={4}
              value={generalQuestions.applications}
              onChange={(e) => handleGeneralInputChange("applications", e.target.value)}
              required
            />
          </Stack>

          <Group position="apart" mt="lg" grow={isMobile}>
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
        <form>
          <Title order={2} align="center" mb={20} style={{ fontSize: isMobile ? "18px" : "24px" }}>
            Section - II : (IPR Ownership)
          </Title>
          
          <Stack spacing="md">
            <Textarea
              resize="vertical"
              label="1. Was the intellectual property created with the significant use of funds or facilities of IIITDM Jabalpur?"
              placeholder="Describe the significant use of your invention"
              minRows={4}
              value={iprOwnershipQuestions.significantUse}
              onChange={(e) => handleIprOwnershipInputChange("significantUse", e.target.value)}
              required
            />
            
            <Textarea
              resize="vertical"
              label="2. Please describe the source of funding for the invention."
              placeholder="Enter the funding source"
              minRows={4}
              value={iprOwnershipQuestions.fundingSource}
              onChange={(e) => handleIprOwnershipInputChange("fundingSource", e.target.value)}
              required
            />
            
            <FileInput
              label="If yes, Name of the funding agency and copy of agreement, letter of intent, must be uploaded here."
              placeholder="Click here to upload funding agency details"
              clearable
              value={section2FundingFile}
              onChange={setSection2FundingFile}
              accept="image/*,application/pdf"
            />
            
            {section2FundingFile && (
              <div>
                <strong>{section2FundingFile.name}</strong> ({(section2FundingFile.size / 1024).toFixed(2)} KB)
              </div>
            )}
            
            <Textarea
              resize="vertical"
              label="3. Have you presented/published in any Journal/conference if yes, please give details?"
              placeholder="Enter presentation details"
              minRows={4}
              value={iprOwnershipQuestions.presentationDetails}
              onChange={(e) => handleIprOwnershipInputChange("presentationDetails", e.target.value)}
              required
            />
            
            <Textarea
              resize="vertical"
              label="4. Was the intellectual property created in the course of or pursuant to a sponsored or a consultancy research agreement with IIITDM Jabalpur?"
              placeholder="Enter MOU details"
              minRows={4}
              value={iprOwnershipQuestions.mOUDetails}
              onChange={(e) => handleIprOwnershipInputChange("mOUDetails", e.target.value)}
              required
            />
            
            <FileInput
              label="If yes, please upload a copy of MOU with concerned project."
              placeholder="Click here to upload MOU details"
              clearable
              value={section2MouFile}
              onChange={setSection2MouFile}
              accept="image/*,application/pdf"
            />
            
            {section2MouFile && (
              <div>
                <strong>{section2MouFile.name}</strong> ({(section2MouFile.size / 1024).toFixed(2)} KB)
              </div>
            )}
            
            <Textarea
              resize="vertical"
              label="5. Was the intellectual property created as a part of academic research leading towards a degree or otherwise?"
              placeholder="Describe academic research involvement"
              minRows={4}
              value={iprOwnershipQuestions.academicResearch}
              onChange={(e) => handleIprOwnershipInputChange("academicResearch", e.target.value)}
              required
            />
          </Stack>

          <Group position="apart" mt="lg" grow={isMobile}>
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
    <Title order={2} align="center" mb={20} style={{ fontSize: isMobile ? "18px" : "24px" }}>
      Section - III : (Commercialization)
    </Title>
    
    <Stack spacing="xl">
      <div>
        <Text size="sm" mb={10}>
          1. Who are the Target companies, both in India or abroad?
        </Text>
        <Text size="sm" mb={20}>
          Please give specific list of companies and contact details of the
          concerned person who can be contacted for initiating Technology
          Licensing.
        </Text>
        
        <Stack spacing="md">
          {companies.map((company, index) => (
            <Paper key={index} p="md" withBorder shadow="xs">
              <TextInput
                label="Company Name"
                placeholder="Enter company name"
                value={company.name}
                onChange={(e) => handleCompanyInputChange(index, "name", e.target.value)}
                required
                mb="sm"
              />
              <TextInput
                label="Name of Concerned Person"
                placeholder="Enter person's name"
                value={company.concernedPerson}
                onChange={(e) => handleCompanyInputChange(index, "concernedPerson", e.target.value)}
                required
                mb="sm"
              />
              <TextInput
                label="Contact Number"
                placeholder="Enter contact number"
                value={company.contact}
                onChange={(e) => handleCompanyInputChange(index, "contact", e.target.value)}
                required
                mb="sm"
              />
              <Button
                type="button"
                color="red"
                variant="outline"
                onClick={() => removeCompany(index)}
                fullWidth
              >
                Remove Company
              </Button>
            </Paper>
          ))}
        </Stack>
        
        <Button 
          type="button" 
          color="blue" 
          onClick={addNewCompany} 
          mt="md"
          fullWidth
        >
          + Add More Companies
        </Button>
      </div>
      
      <div>
        <Text size="sm" mb={10}>
          2. Development stage:
        </Text>
        <Text size="sm" mb={10}>
          In your opinion, which of the three best describes the current stage
          of development of the invention as it relates to its marketability:
        </Text>
        
        <Stack spacing="sm">
          <Checkbox
            value="embryonic"
            label="Embryonic (needs substantial work to bring to market)"
            onChange={handleCheckboxChange}
            checked={developmentStage.embryonic}
          />
          <Checkbox
            value="partiallyDeveloped"
            label="Partially developed (could be brought to market with significant investment)"
            onChange={handleCheckboxChange}
            checked={developmentStage.partiallyDeveloped}
          />
          <Checkbox
            value="offTheShelf"
            label="Off-the-shelf (could be brought to market with nominal investment)"
            onChange={handleCheckboxChange}
            checked={developmentStage.offTheShelf}
          />
        </Stack>
      </div>
      
      <div>
        <Text size="sm" mb={10}>
          Download the following form, duly fill and sign it, and upload it
          afterward.
        </Text>
        <Button 
          color="blue" 
          mb={10} 
          onClick={handleDownload} 
          fullWidth
        >
          Download Form-III
        </Button>
        
        <FileInput
          label="Please upload duly filled and signed Form-III"
          placeholder="Click here to upload form"
          clearable
          value={section3FormIII}
          onChange={setSection3FormIII}
          accept="image/*,application/pdf"
        />
        
        {section3FormIII && (
          <Text size="sm" mt="xs">
            <strong>{section3FormIII.name}</strong> ({(section3FormIII.size / 1024).toFixed(2)} KB)
          </Text>
        )}
      </div>
      
      <Text size="sm" fw={700}>
        Undertaking: Intellectual Property is filing on the behalf of the
        Institute.
      </Text>
    </Stack>

    <Group position="apart" mt="xl" grow={isMobile}>
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

export default ApplicationForm;