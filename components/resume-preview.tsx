"use client"

import type { ResumeData } from "./resume-editor"
import { ModernTemplate } from "./templates/modern-template"
import { ClassicTemplate } from "./templates/classic-template"
import { MinimalTemplate } from "./templates/minimal-template"
import { CreativeTemplate } from "./templates/creative-template"

interface ResumePreviewProps {
  data: ResumeData
  template?: string
}

export function ResumePreview({ data, template = "modern" }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return <ClassicTemplate data={data} />
      case "minimal":
        return <MinimalTemplate data={data} />
      case "creative":
        return <CreativeTemplate data={data} />
      case "modern":
      default:
        return <ModernTemplate data={data} />
    }
  }

  return <div>{renderTemplate()}</div>
}
