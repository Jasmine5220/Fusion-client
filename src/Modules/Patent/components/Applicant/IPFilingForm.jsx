import React, { useState, useEffect } from "react";
import {
  Container,
  Text,
  Card,
  Button,
  Stepper,
  Grid,
  Badge,
  Loader,
} from "@mantine/core";
import {
  ArrowLeft,
  DownloadSimple,
  CheckCircle,
  ArrowRight,
} from "phosphor-react";
import axios from "axios";
import "../../style/Applicant/IPFilingForm.css";

function PatentProgressBar({ currentStatus }) {
  const progressMapping = {
    "Patent Application Submission": 1,
    "PCC Admin Review": 2,
    "Director Initial Review": 3,
    "Attorney Assignment": 4,
    "Patentability Check": 5,
    "Final Approval by Director": 6,
    "Final Contract Completion": 7,
  };

  const currentStep = progressMapping[currentStatus] || 1;

  return (
    <Stepper
      active={currentStep - 1}
      size="md"
      className="progress-bar-container"
      color="blue"
    >
      {Object.keys(progressMapping).map((label, index) => (
        <Stepper.Step
          key={index}
          label={label}
          completed={index < currentStep - 1}
        />
      ))}
    </Stepper>
  );
}

function IPFilingForm({ setActiveTab, applicationId }) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const API_BASE_URL = "http://127.0.0.1:8000/patentsystem";
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      if (!authToken) {
        setError("Authorization token is missing. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/applicant/applications/details/${applicationId}`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        if (response.data) {
          setApplication(response.data);
        } else {
          setError("Application details not found");
        }
      } catch (err) {
        console.error("Error fetching application details:", err);
        setError("Failed to load application details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) {
      fetchApplicationDetails();
    }
  }, [applicationId, authToken]);

  const determineCurrentStatus = (status) => {
    switch (status) {
      case "Submitted": return "Patent Application Submission";
      case "Under Admin Review": return "PCC Admin Review";
      case "Under Director Review": return "Director Initial Review";
      case "Attorney Assigned": return "Attorney Assignment";
      case "Under Patentability Check": return "Patentability Check";
      case "Director Final Review": return "Final Approval by Director";
      case "Contract Finalized": return "Final Contract Completion";
      default: return "Patent Application Submission";
    }
  };

  const FormSection = ({ title, children }) => (
    <Card className={`form-section ${isMobile ? 'mobile-form-section' : ''}`} p="lg" radius="md" withBorder mb="md">
      <Text className={`section-title ${isMobile ? 'mobile-section-title' : ''}`}>{title}</Text>
      {children}
    </Card>
  );

  const FormField = ({ label, value }) => (
    <div className={`form-field ${isMobile ? 'mobile-form-field' : ''}`}>
      <Text className={`field-label ${isMobile ? 'mobile-field-label' : ''}`}>{label}</Text>
      <Text className={`field-value ${isMobile ? 'mobile-field-value' : ''}`}>{value || "Not provided"}</Text>
    </div>
  );

  if (loading) {
    return (
      <div className="loader-container">
        <Loader size="lg" color="blue" />
        <Text mt="md">Loading application details...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="error-card" p="xl" radius="md" withBorder>
        <Text color="red" size="lg" weight={500}>
          {error}
        </Text>
        <Button
          mt="md"
          color="blue"
          onClick={() => setActiveTab("viewApplications")}
        >
          Back to Applications
        </Button>
      </Card>
    );
  }

  if (!application) {
    return (
      <Card className="empty-state-card" p="xl" radius="md" withBorder>
        <Text size="lg" align="center">
          Application details not found.
        </Text>
        <Button
          mt="lg"
          color="blue"
          onClick={() => setActiveTab("viewApplications")}
        >
          Back to Applications
        </Button>
      </Card>
    );
  }

  const {
    title,
    token_no,
    attorney_name,
    status,
    decision_status,
    comments,
    applicants,
    section_I,
    section_II,
    section_III,
    dates,
    application_id,
  } = application;

  const currentStatus = determineCurrentStatus(status);
  const submittedDate = dates?.submitted_date
    ? new Date(dates.submitted_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not recorded";

  return (
    <Container className={`form-container ${isMobile ? 'mobile-form-container' : ''}`} size={isMobile ? "sm" : "lg"}>
      <div className="detail-header">
        <Button
          onClick={() => setActiveTab("viewApplications")}
          variant="outline"
          color="blue"
          leftIcon={<ArrowLeft size={18} />}
        >
          Back to Applications
        </Button>
      </div>

      <Text className={`form-title ${isMobile ? 'mobile-form-title' : ''}`}>
        Intellectual Property Filing Form
      </Text>

      <FormSection title="Application Overview">
        <Grid>
          <Grid.Col span={12} md={4}>
            <FormField label="Title of Application:" value={title} />
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <FormField label="Submission Date:" value={submittedDate} />
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <FormField label="Token Number:" value={token_no} />
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <FormField label="Attorney:" value={attorney_name} />
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <FormField label="Status:" value={status} />
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <FormField label="Decision Status:" value={decision_status} />
          </Grid.Col>
          <Grid.Col span={12}>
            <FormField label="Comments:" value={comments} />
          </Grid.Col>
        </Grid>
      </FormSection>

      <FormSection title="Section I: Administrative and Technical Details">
        <Grid>
          <Grid.Col span={12} md={6}>
            <FormField label="Area of the invention:" value={section_I?.area} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Problem in the area:" value={section_I?.problem} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Objective of your invention:" value={section_I?.objective} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Novelty:" value={section_I?.novelty} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Advantages:" value={section_I?.advantages} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField
              label="Tested:"
              value={section_I?.is_tested === true ? "Yes" : section_I?.is_tested === false ? "No" : ""}
            />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="POC Details:" value={section_I?.poc_details} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Applications:" value={section_I?.applications} />
          </Grid.Col>
        </Grid>
      </FormSection>

      <FormSection title="Section II: IPR Ownership">
        <Grid>
          <Grid.Col span={12} md={6}>
            <FormField label="Funding Details:" value={section_II?.funding_details} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Funding Source:" value={section_II?.funding_source} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Source Agreement:" value={section_II?.source_agreement} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Publication Details:" value={section_II?.publication_details} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="MOU Details:" value={section_II?.mou_details} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Research Details:" value={section_II?.research_details} />
          </Grid.Col>
        </Grid>
      </FormSection>

      <FormSection title="Section III: Commercialization">
        <Grid>
          <Grid.Col span={12} md={6}>
            <FormField label="Company Name:" value={section_III?.company_name} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Contact Person:" value={section_III?.contact_person} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Contact Number:" value={section_III?.contact_no} />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <FormField label="Development Stage:" value={section_III?.development_stage} />
          </Grid.Col>
        </Grid>
      </FormSection>

      <FormSection title="Applicants">
        {applicants && applicants.length > 0 ? (
          <Grid>
            {applicants.map((applicant, index) => (
              <Grid.Col key={index} span={12} md={6}>
                <Card className="applicant-card" p="md" radius="sm" withBorder>
                  <Text weight={600} size="lg" mb="xs">
                    Applicant {index + 1}
                  </Text>
                  <FormField label="Name:" value={applicant.name} />
                  <FormField label="Email:" value={applicant.email} />
                  <FormField label="Mobile:" value={applicant.mobile} />
                  <FormField label="Address:" value={applicant.address} />
                  <FormField
                    label="Share Percentage:"
                    value={applicant.percentage_share ? `${applicant.percentage_share}%` : ""}
                  />
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Text color="dimmed">No applicant information available</Text>
        )}
      </FormSection>

      <FormSection title="Application Progress">
        <PatentProgressBar currentStatus={currentStatus} />
      </FormSection>

      <div className="form-actions">
        <Button
          component="a"
          href={`${API_BASE_URL}/download/${application_id}/`}
          target="_blank"
          download={`Application-${application_id}.pdf`}
          size="lg"
          color="blue"
          leftIcon={<DownloadSimple size={18} />}
        >
          Download Application
        </Button>
      </div>
    </Container>
  );
}

export default IPFilingForm;
