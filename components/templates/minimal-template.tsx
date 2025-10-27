"use client"

import type { ResumeData } from "../resume-editor"

interface MinimalTemplateProps {
  data: ResumeData
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg space-y-4 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light tracking-tight">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex gap-4 mt-2 text-xs text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
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
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-2">Experience</h2>
          <div className="space-y-2">
            {data.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold">{exp.position}</span>
                  <span className="text-gray-600">{exp.startDate}</span>
                </div>
                <div className="text-gray-600">{exp.company}</div>
                {exp.description && <div className="text-gray-700 mt-1">{exp.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-2">Education</h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    {edu.degree} in {edu.field}
                  </span>
                  <span className="text-gray-600">{edu.graduationDate}</span>
                </div>
                <div className="text-gray-600">{edu.school}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-2">Skills</h2>
          <p className="text-xs text-gray-700">{data.skills.filter((s) => s).join(", ")}</p>
        </div>
      )}
    </div>
  )
}
