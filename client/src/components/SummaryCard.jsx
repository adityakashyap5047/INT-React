import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function SummaryCard({ summary, url, extractedChars }) {
  const [copied, setCopied] = useState(false);

  if (!summary) return null;

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Summary copied ✅");
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>✅ Summary</CardTitle>
            <CardDescription>Generated from scraped website content.</CardDescription>
          </div>

          <Button variant="secondary" onClick={copySummary} className="gap-2">
            <Copy className="h-4 w-4" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        <Separator />

        <div className="space-y-2 text-xs text-muted-foreground">
          {url ? (
            <div className="wrap-break-words">
              <span className="font-semibold text-foreground">URL:</span> {url}
            </div>
          ) : null}

          {typeof extractedChars === "number" ? (
            <div>
              <Badge variant="outline">
                Extracted chars: {extractedChars}
              </Badge>
            </div>
          ) : null}
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="whitespace-pre-wrap text-sm leading-6">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
}