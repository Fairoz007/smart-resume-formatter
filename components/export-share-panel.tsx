"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Share2, Copy, Loader2 } from "lucide-react"

interface ExportSharePanelProps {
  resumeId: string
  resumeTitle: string
}

export function ExportSharePanel({ resumeId, resumeTitle }: ExportSharePanelProps) {
  const [shareToken, setShareToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleExportPDF = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      })

      const html = await response.text()
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${resumeTitle}.html`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateShare = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      })

      const data = await response.json()
      setShareToken(data.shareToken)
    } catch (error) {
      console.error("Share creation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveShare = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/share", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId }),
      })

      setShareToken(null)
    } catch (error) {
      console.error("Share removal failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const shareUrl = shareToken ? `${window.location.origin}/share/${shareToken}` : ""

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4">
      {/* Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </CardTitle>
          <CardDescription>Download your resume as PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleExportPDF} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export as PDF
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Share Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </CardTitle>
          <CardDescription>Create a shareable link to your resume</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!shareToken ? (
            <Button onClick={handleCreateShare} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 mr-2" />
                  Create Share Link
                </>
              )}
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Share Link</Label>
                <div className="flex gap-2">
                  <Input value={shareUrl} readOnly className="text-sm" />
                  <Button onClick={handleCopyLink} variant="outline" size="sm" className="px-3 bg-transparent">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                {copied && <p className="text-xs text-green-600">Copied to clipboard!</p>}
              </div>
              <Button onClick={handleRemoveShare} disabled={isLoading} variant="destructive" className="w-full">
                {isLoading ? "Removing..." : "Remove Share Link"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
