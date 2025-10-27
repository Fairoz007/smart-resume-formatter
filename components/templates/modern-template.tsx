"use client"

import type { ResumeData } from "../resume-editor"
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react"

interface ModernTemplateProps {
  data: ResumeData
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg space-y-6 font-sans">
      {/* Header */}
      <div className="border-l-4 border-blue-600 pl-6">
        <h1 className="text-4xl font-bold text-gray-900">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
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
        <div>
          <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
          </div>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{exp.position}</p>
                    <p className="text-sm text-blue-600">{exp.company}</p>
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
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Education</h2>
          </div>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">
                      {edu.degree} in {edu.field}
                    </p>
                    <p className="text-sm text-blue-600">{edu.school}</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(
              (skill, index) =>
                skill && (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
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
