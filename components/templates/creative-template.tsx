"use client"

import type { ResumeData } from "../resume-editor"
import { Mail, Phone, MapPin } from "lucide-react"

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 text-gray-900 p-8 rounded-lg shadow-lg space-y-6 font-sans">
      {/* Header with accent */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-4xl font-bold">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data.personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="bg-white p-4 rounded-lg">
          <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-white p-4 rounded-lg border-l-4 border-purple-600">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{exp.position}</p>
                    <p className="text-sm text-purple-600 font-medium">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : "- Present"}
                  </p>
                </div>
                {exp.description && <p className="text-sm text-gray-700 mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-sm text-blue-600 font-medium">{edu.school}</p>
                  </div>
                  <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(
              (skill, index) =>
                skill && (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
