"use client"

import type { ResumeData } from "../resume-editor"
import { Mail, Phone, MapPin } from "lucide-react"

interface ClassicTemplateProps {
  data: ResumeData
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  return (
    <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg space-y-5 font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-400 pb-4">
        <h1 className="text-3xl font-bold">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex justify-center gap-4 mt-2 text-xs text-gray-700">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {data.personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div>
          <p className="text-xs text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{exp.position}</p>
                    <p className="text-xs text-gray-700">{exp.company}</p>
                  </div>
                  <p className="text-xs text-gray-700">
                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : "- Present"}
                  </p>
                </div>
                {exp.description && <p className="text-xs text-gray-700 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-xs text-gray-700">{edu.school}</p>
                  </div>
                  <p className="text-xs text-gray-700">{edu.graduationDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-1 mb-2">
            Skills
          </h2>
          <p className="text-xs text-gray-700">{data.skills.filter((s) => s).join(" • ")}</p>
        </div>
      )}
    </div>
  )
}
