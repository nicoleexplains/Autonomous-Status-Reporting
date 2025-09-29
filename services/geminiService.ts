import { GoogleGenAI, Type } from "@google/genai";
import { GenerateReportConfig, StatusReport, HealthStatus } from '../types';

const reportSchema = {
  type: Type.OBJECT,
  properties: {
    executiveSummary: {
      type: Type.STRING,
      description: "A high-level summary (2-3 sentences) of the project's status for executives."
    },
    projectHealth: {
      type: Type.STRING,
      enum: [HealthStatus.GREEN, HealthStatus.YELLOW, HealthStatus.RED],
      description: "An overall health indicator for the project. GREEN: On track. YELLOW: Some risks or minor delays. RED: Significant issues or blockers."
    },
    keyAccomplishments: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING
      },
      description: "A bulleted list of major achievements or completed tasks since the last report."
    },
    roadblocksAndRisks: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING
      },
      description: "A bulleted list of current blockers, risks, or potential issues that could impact the project timeline or success."
    },
    detailedProgress: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                taskId: { type: Type.STRING },
                update: { type: Type.STRING, description: "A brief summary of the progress on this task." }
            },
            required: ['taskId', 'update']
        },
        description: "A summary of progress for each task that is 'In Progress' or 'Blocked'."
    }
  },
  required: ['executiveSummary', 'projectHealth', 'keyAccomplishments', 'roadblocksAndRisks', 'detailedProgress']
};

export const generateStatusReport = async (config: GenerateReportConfig): Promise<StatusReport> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const { startDate, endDate, outputFormat, reportingPeriod, ...data } = config;

  const prompt = `
    Analyze the following project data and generate a concise ${reportingPeriod} status report for the period from ${startDate} to ${endDate}.
    The output for the executive summary, key accomplishments, and roadblocks/risks sections should be in ${outputFormat} format.
    The data includes tasks, recent chat messages, and project milestones.
    Identify key accomplishments, and pay close attention to comments and chat messages to identify risks and blockers.
    Based on the severity of blockers and risks, determine the overall project health.

    Project Data:
    ${JSON.stringify(data, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
      },
    });

    const reportJson = response.text.trim();
    const parsedReport = JSON.parse(reportJson);
    
    // Validate the parsed structure
    if (
      !parsedReport.executiveSummary ||
      !parsedReport.projectHealth ||
      !Array.isArray(parsedReport.keyAccomplishments) ||
      !Array.isArray(parsedReport.roadblocksAndRisks) ||
      !Array.isArray(parsedReport.detailedProgress)
    ) {
        throw new Error("Received an invalid report structure from the API.");
    }

    return parsedReport as StatusReport;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};