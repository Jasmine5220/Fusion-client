import React, { useState, useEffect } from "react";
import { Container, Text, Card, Button, Stepper } from "@mantine/core";
import { CheckCircle, ArrowRight, DownloadSimple } from "phosphor-react";
import "../../style/Applicant/IPFilingForm.css";

function IPFilingForm() {
  const inventors = [
    {
      name: "Dr. Rajesh Sharma",
      email: "rajesh.sharma@iiitdmj.ac.in",
      address: "IIITDM Jabalpur, Dumna Airport Road, Jabalpur, MP - 482005",
      mobile: "+91-9876543210",
      share: 40,
    },
    {
      name: "Amit Kumar",
      email: "amit.kumar@student.iiitdmj.ac.in",
      address: "IIITDM Hostel Block B, Jabalpur, MP - 482005",
      mobile: "+91-9123456780",
      share: 30,
    },
  ];

  const [currentStep, setCurrentStep] = useState(5); // Assume the process is completed
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile

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

  // Desktop Version
  const DesktopForm = () => (
    <Container className="form-container" size="lg">
      <Text className="form-title">Intellectual Property Filing Form</Text>

      {/* Administrative and Technical Details */}
      <Card className="form-section">
        <Text className="section-title">
          Section I: Administrative and Technical Details
        </Text>

        <div className="form-field">
          <Text className="field-heading">Title of Application:</Text>
          <Text className="field-value">
            AI-Based Disease Detection in Crops
          </Text>
        </div>

        <Text className="field-group-title">
          1. Please list inventor(s) who have contributed:
        </Text>
        {inventors.map((inventor, index) => (
          <div key={index} className="inventor-container">
            <Text className="inventor-title">Inventor {index + 1}</Text>
            <div className="form-field">
              <Text className="field-heading">Name:</Text>
              <Text className="field-value">{inventor.name}</Text>
            </div>
            <div className="form-field">
              <Text className="field-heading">Email:</Text>
              <Text className="field-value">{inventor.email}</Text>
            </div>
            <div className="form-field">
              <Text className="field-heading">Contact Address:</Text>
              <Text className="field-value">{inventor.address}</Text>
            </div>
            <div className="form-field">
              <Text className="field-heading">Mobile:</Text>
              <Text className="field-value">{inventor.mobile}</Text>
            </div>
          </div>
        ))}

        <div className="form-field">
          <Text className="field-heading">Area of the invention:</Text>
          <Text className="field-value">Agricultural Technology and AI</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Problem in the area:</Text>
          <Text className="field-value">
            Lack of efficient and affordable disease detection tools for farmers.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Objective of your invention:</Text>
          <Text className="field-value">
            To develop an affordable and accurate AI-driven tool for disease
            diagnosis in crops.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Novelty:</Text>
          <Text className="field-value">
            The first AI model optimized for real-time, edge-device use in the
            field.
          </Text>
        </div>
      </Card>

      {/* IPR Ownership Section */}
      <Card className="form-section">
        <Text className="section-title">Section II: IPR Ownership</Text>
        <div className="form-field">
          <Text className="field-heading">
            Significant use of funds/facilities:
          </Text>
          <Text className="field-value">
            Yes, using IIITDM Jabalpur's research facilities.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Source of funding:</Text>
          <Text className="field-value">Institute's research grant</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">
            Journal/Conference Presentation:
          </Text>
          <Text className="field-value">
            Presented at AI & Agriculture 2024 Conference.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">MOU or Agreement Details:</Text>
          <Text className="field-value">
            Sponsored under IIITDM Research Fund (MOU #12345).
          </Text>
        </div>
      </Card>

      {/* Commercialization Section */}
      <Card className="form-section">
        <Text className="section-title">Section III: Commercialization</Text>
        <div className="form-field">
          <Text className="field-heading">Target Companies:</Text>
          <Text className="field-value">
            Monsanto India, Agrotech Pvt Ltd, and Agribots Inc.
          </Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Development Stage:</Text>
          <Text className="field-value">Partially developed</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">
            Uploaded duly filled and signed Form-III:
          </Text>
          <div className="field-value">
            <Button
              component="a"
              href="https://example.com/sample.pdf"
              target="_blank"
              download="Form-III.pdf"
              color="blue"
              className="down-button"
            >
              View Form-III
            </Button>
          </div>
        </div>
      </Card>

      {/* Dates */}
      <Card className="form-section">
        <Text className="section-title">Dates and Status</Text>

        <div className="form-field">
          <Text className="field-heading">Submission Date:</Text>
          <Text className="field-value">15 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Forwarded to Director:</Text>
          <Text className="field-value">16 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Approved Date:</Text>
          <Text className="field-value">17 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Attorney Assigned:</Text>
          <Text className="field-value">18 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Report Generated:</Text>
          <Text className="field-value">19 November 2024</Text>
        </div>
        <div className="form-field">
          <Text className="field-heading">Filed Date:</Text>
          <Text className="field-value">20 November 2024</Text>
        </div>
      </Card>

      {/* Status Bar */}
      <Card className="form-section">
        <Text className="section-title">Application Progress</Text>
        <Stepper
          active={currentStep}
          onStepClick={setCurrentStep}
          className="status-bar"
          size="md"
          color="blue"
          iconSize={24}
        >
          <Stepper.Step
            icon={<CheckCircle size={18} />}
            label="Step 1"
            description="Application Submitted"
          />
          <Stepper.Step
            icon={<ArrowRight size={18} />}
            label="Step 2"
            description="Forwarded for Director's Approval"
          />
          <Stepper.Step
            icon={<CheckCircle size={18} />}
            label="Step 3"
            description="Director's Approval Received"
          />
          <Stepper.Step
            icon={<ArrowRight size={18} />}
            label="Step 4"
            description="Forwarded to Attorney"
          />
          <Stepper.Step
            icon={<CheckCircle size={18} />}
            label="Step 5"
            description="Patentability Search Report Generated"
          />
          <Stepper.Step
            icon={<CheckCircle size={18} />}
            label="Step 6"
            description="Patent Filed"
          />
        </Stepper>
      </Card>

      {/* Form Actions */}
      <div className="form-actions">
        <Button leftIcon={<DownloadSimple size={20} />} className="down-button">
          Download Form
        </Button>
      </div>
    </Container>
  );

  // Mobile Version
  const MobileForm = () => (
    <Container className="mobile-form-container" size="sm">
      <Text className="mobile-form-title">Intellectual Property Filing Form</Text>

      {/* Administrative and Technical Details */}
      <Card className="mobile-form-section">
        <Text className="mobile-section-title">
          Section I: Administrative and Technical Details
        </Text>

        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Title of Application:</Text>
          <Text className="mobile-field-value">
            AI-Based Disease Detection in Crops
          </Text>
        </div>

        <Text className="mobile-field-group-title">
          1. Please list inventor(s) who have contributed:
        </Text>
        {inventors.map((inventor, index) => (
          <div key={index} className="mobile-inventor-container">
            <Text className="mobile-inventor-title">Inventor {index + 1}</Text>
            <div className="mobile-form-field">
              <Text className="mobile-field-heading">Name:</Text>
              <Text className="mobile-field-value">{inventor.name}</Text>
            </div>
            <div className="mobile-form-field">
              <Text className="mobile-field-heading">Email:</Text>
              <Text className="mobile-field-value">{inventor.email}</Text>
            </div>
            <div className="mobile-form-field">
              <Text className="mobile-field-heading">Contact Address:</Text>
              <Text className="mobile-field-value">{inventor.address}</Text>
            </div>
            <div className="mobile-form-field">
              <Text className="mobile-field-heading">Mobile:</Text>
              <Text className="mobile-field-value">{inventor.mobile}</Text>
            </div>
          </div>
        ))}

        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Area of the invention:</Text>
          <Text className="mobile-field-value">Agricultural Technology and AI</Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Problem in the area:</Text>
          <Text className="mobile-field-value">
            Lack of efficient and affordable disease detection tools for farmers.
          </Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Objective of your invention:</Text>
          <Text className="mobile-field-value">
            To develop an affordable and accurate AI-driven tool for disease
            diagnosis in crops.
          </Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Novelty:</Text>
          <Text className="mobile-field-value">
            The first AI model optimized for real-time, edge-device use in the
            field.
          </Text>
        </div>
      </Card>

      {/* IPR Ownership Section */}
      <Card className="mobile-form-section">
        <Text className="mobile-section-title">Section II: IPR Ownership</Text>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">
            Significant use of funds/facilities:
          </Text>
          <Text className="mobile-field-value">
            Yes, using IIITDM Jabalpur's research facilities.
          </Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Source of funding:</Text>
          <Text className="mobile-field-value">Institute's research grant</Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">
            Journal/Conference Presentation:
          </Text>
          <Text className="mobile-field-value">
            Presented at AI & Agriculture 2024 Conference.
          </Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">MOU or Agreement Details:</Text>
          <Text className="mobile-field-value">
            Sponsored under IIITDM Research Fund (MOU #12345).
          </Text>
        </div>
      </Card>

      {/* Commercialization Section */}
      <Card className="mobile-form-section">
        <Text className="mobile-section-title">Section III: Commercialization</Text>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Target Companies:</Text>
          <Text className="mobile-field-value">
            Monsanto India, Agrotech Pvt Ltd, and Agribots Inc.
          </Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Development Stage:</Text>
          <Text className="mobile-field-value">Partially developed</Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">
            Uploaded duly filled and signed Form-III:
          </Text>
          <div className="mobile-field-value">
            <Button
              component="a"
              href="https://example.com/sample.pdf"
              target="_blank"
              download="Form-III.pdf"
              color="blue"
              className="mobile-down-button"
            >
              View Form-III
            </Button>
          </div>
        </div>
      </Card>

      {/* Dates */}
      <Card className="mobile-form-section">
        <Text className="mobile-section-title">Dates and Status</Text>

        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Submission Date:</Text>
          <Text className="mobile-field-value">15 November 2024</Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Forwarded to Director:</Text>
          <Text className="mobile-field-value">16 November 2024</Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Approved Date:</Text>
          <Text className="mobile-field-value">17 November 2024</Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Attorney Assigned:</Text>
          <Text className="mobile-field-value">18 November 2024</Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Report Generated:</Text>
          <Text className="mobile-field-value">19 November 2024</Text>
        </div>
        <div className="mobile-form-field">
          <Text className="mobile-field-heading">Filed Date:</Text>
          <Text className="mobile-field-value">20 November 2024</Text>
        </div>
      </Card>

      {/* Status Bar */}
      <Card className="mobile-form-section">
        <Text className="mobile-section-title">Application Progress</Text>
        <Stepper
          active={currentStep}
          onStepClick={setCurrentStep}
          className="mobile-status-bar"
          size="sm"
          color="blue"
          orientation="vertical"
        >
          <Stepper.Step
            icon={<CheckCircle size={16} />}
            label="Step 1"
            description="Application Submitted"
          />
          <Stepper.Step
            icon={<ArrowRight size={16} />}
            label="Step 2"
            description="Forwarded for Director's Approval"
          />
          <Stepper.Step
            icon={<CheckCircle size={16} />}
            label="Step 3"
            description="Director's Approval Received"
          />
          <Stepper.Step
            icon={<ArrowRight size={16} />}
            label="Step 4"
            description="Forwarded to Attorney"
          />
          <Stepper.Step
            icon={<CheckCircle size={16} />}
            label="Step 5"
            description="Patentability Search Report Generated"
          />
          <Stepper.Step
            icon={<CheckCircle size={16} />}
            label="Step 6"
            description="Patent Filed"
          />
        </Stepper>
      </Card>

      {/* Form Actions */}
      <div className="mobile-form-actions">
        <Button leftIcon={<DownloadSimple size={18} />} className="mobile-down-button">
          Download Form
        </Button>
      </div>
    </Container>
  );

  // Render the appropriate form based on screen width
  return isMobile ? <MobileForm /> : <DesktopForm />;
}

export default IPFilingForm;