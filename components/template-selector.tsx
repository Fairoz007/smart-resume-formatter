"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary with blue accents",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional and professional serif style",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant with minimal design",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and colorful with gradient accents",
  },
]

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Templates</CardTitle>
        <CardDescription>Choose a professional template for your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedTemplate === template.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{template.name}</p>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
                {selectedTemplate === template.id && <Check className="w-5 h-5 text-primary" />}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
