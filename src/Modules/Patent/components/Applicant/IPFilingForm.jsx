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

  // Common Form Section Component
  const FormSection = ({ title, children, isMobile }) => (
    <Card className={`form-section ${isMobile ? 'mobile-form-section' : ''}`}>
      <Text className={`section-title ${isMobile ? 'mobile-section-title' : ''}`}>{title}</Text>
      {children}
    </Card>
  );

  // Common Form Field Component
  const FormField = ({ heading, value, isMobile }) => (
    <div className={`form-field ${isMobile ? 'mobile-form-field' : ''}`}>
      <Text className={`field-heading ${isMobile ? 'mobile-field-heading' : ''}`}>{heading}</Text>
      <Text className={`field-value ${isMobile ? 'mobile-field-value' : ''}`}>{value}</Text>
    </div>
  );

  // Common Inventor Component
  const Inventor = ({ inventor, index, isMobile }) => (
    <div className={`inventor-container ${isMobile ? 'mobile-inventor-container' : ''}`}>
      <Text className={`inventor-title ${isMobile ? 'mobile-inventor-title' : ''}`}>Inventor {index + 1}</Text>
      <FormField heading="Name:" value={inventor.name} isMobile={isMobile} />
      <FormField heading="Email:" value={inventor.email} isMobile={isMobile} />
      <FormField heading="Contact Address:" value={inventor.address} isMobile={isMobile} />
      <FormField heading="Mobile:" value={inventor.mobile} isMobile={isMobile} />
    </div>
  );

  // Common Stepper Component
  const StatusStepper = ({ currentStep, isMobile }) => (
    <Stepper
      active={currentStep}
      onStepClick={setCurrentStep}
      className={`status-bar ${isMobile ? 'mobile-status-bar' : ''}`}
      size={isMobile ? "sm" : "md"}
      color="blue"
      orientation={isMobile ? "vertical" : "horizontal"}
      iconSize={isMobile ? 16 : 24}
    >
      <Stepper.Step icon={<CheckCircle size={isMobile ? 16 : 18} />} label="Step 1" description="Application Submitted" />
      <Stepper.Step icon={<ArrowRight size={isMobile ? 16 : 18} />} label="Step 2" description="Forwarded for Director's Approval" />
      <Stepper.Step icon={<CheckCircle size={isMobile ? 16 : 18} />} label="Step 3" description="Director's Approval Received" />
      <Stepper.Step icon={<ArrowRight size={isMobile ? 16 : 18} />} label="Step 4" description="Forwarded to Attorney" />
      <Stepper.Step icon={<CheckCircle size={isMobile ? 16 : 18} />} label="Step 5" description="Patentability Search Report Generated" />
      <Stepper.Step icon={<CheckCircle size={isMobile ? 16 : 18} />} label="Step 6" description="Patent Filed" />
    </Stepper>
  );

  // Common Form Actions Component
  const FormActions = ({ isMobile }) => (
    <div className={`form-actions ${isMobile ? 'mobile-form-actions' : ''}`}>
      <Button leftIcon={<DownloadSimple size={isMobile ? 18 : 20} />} className={`down-button ${isMobile ? 'mobile-down-button' : ''}`}>
        Download Form
      </Button>
    </div>
  );

  // Main Form Component
  const MainForm = ({ isMobile }) => (
    <Container className={`form-container ${isMobile ? 'mobile-form-container' : ''}`} size={isMobile ? "sm" : "lg"}>
      <Text className={`form-title ${isMobile ? 'mobile-form-title' : ''}`}>Intellectual Property Filing Form</Text>

      <FormSection title="Section I: Administrative and Technical Details" isMobile={isMobile}>
        <FormField heading="Title of Application:" value="AI-Based Disease Detection in Crops" isMobile={isMobile} />
        <Text className={`field-group-title ${isMobile ? 'mobile-field-group-title' : ''}`}>
          1. Please list inventor(s) who have contributed:
        </Text>
        {inventors.map((inventor, index) => (
          <Inventor key={index} inventor={inventor} index={index} isMobile={isMobile} />
        ))}
        <FormField heading="Area of the invention:" value="Agricultural Technology and AI" isMobile={isMobile} />
        <FormField heading="Problem in the area:" value="Lack of efficient and affordable disease detection tools for farmers." isMobile={isMobile} />
        <FormField heading="Objective of your invention:" value="To develop an affordable and accurate AI-driven tool for disease diagnosis in crops." isMobile={isMobile} />
        <FormField heading="Novelty:" value="The first AI model optimized for real-time, edge-device use in the field." isMobile={isMobile} />
      </FormSection>

      <FormSection title="Section II: IPR Ownership" isMobile={isMobile}>
        <FormField heading="Significant use of funds/facilities:" value="Yes, using IIITDM Jabalpur's research facilities." isMobile={isMobile} />
        <FormField heading="Source of funding:" value="Institute's research grant" isMobile={isMobile} />
        <FormField heading="Journal/Conference Presentation:" value="Presented at AI & Agriculture 2024 Conference." isMobile={isMobile} />
        <FormField heading="MOU or Agreement Details:" value="Sponsored under IIITDM Research Fund (MOU #12345)." isMobile={isMobile} />
      </FormSection>

      <FormSection title="Section III: Commercialization" isMobile={isMobile}>
        <FormField heading="Target Companies:" value="Monsanto India, Agrotech Pvt Ltd, and Agribots Inc." isMobile={isMobile} />
        <FormField heading="Development Stage:" value="Partially developed" isMobile={isMobile} />
        <FormField heading="Uploaded duly filled and signed Form-III:" value={
          <Button
            component="a"
            href="https://example.com/sample.pdf"
            target="_blank"
            download="Form-III.pdf"
            color="blue"
            className={`down-button ${isMobile ? 'mobile-down-button' : ''}`}
          >
            View Form-III
          </Button>
        } isMobile={isMobile} />
      </FormSection>

      <FormSection title="Dates and Status" isMobile={isMobile}>
        <FormField heading="Submission Date:" value="15 November 2024" isMobile={isMobile} />
        <FormField heading="Forwarded to Director:" value="16 November 2024" isMobile={isMobile} />
        <FormField heading="Approved Date:" value="17 November 2024" isMobile={isMobile} />
        <FormField heading="Attorney Assigned:" value="18 November 2024" isMobile={isMobile} />
        <FormField heading="Report Generated:" value="19 November 2024" isMobile={isMobile} />
        <FormField heading="Filed Date:" value="20 November 2024" isMobile={isMobile} />
      </FormSection>

      <FormSection title="Application Progress" isMobile={isMobile}>
        <StatusStepper currentStep={currentStep} isMobile={isMobile} />
      </FormSection>

      <FormActions isMobile={isMobile} />
    </Container>
  );

  // Render the appropriate form based on screen width
  return <MainForm isMobile={isMobile} />;
}

export default IPFilingForm;