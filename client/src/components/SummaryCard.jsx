import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Copy, Check, Link2, FileText } from "lucide-react";

export default function SummaryCard({ summary, url, extractedChars }) {
  const [copied, setCopied] = useState(false);

  const shortUrl = useMemo(() => {
    try {
      const u = new URL(url);
      return `${u.hostname}${u.pathname !== "/" ? u.pathname : ""}`;
    } catch {
      return url;
    }
  }, [url]);

  if (!summary) return null;

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Summary copied");
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="relative rounded-md bg-linear-to-br from-cyan-500/25 via-indigo-500/15 to-purple-500/20 p-px shadow-2xl">
        <div className="pointer-events-none absolute rounded-md bg-indigo-500/10 blur-3xl" />

        <Card className="relative overflow-hidden rounded-md border-white/10 bg-zinc-950/70 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl" />
            <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />
          </div>

          <CardHeader className="relative space-y-3 p-6 pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-indigo-200 via-cyan-500 to-indigo-300 ring-1 ring-white/10">
                    <FileText className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <CardTitle className="text-xl text-zinc-100 flex items-center gap-2">
                      Summary
                    </CardTitle>

                    <CardDescription className="text-xs text-zinc-400">
                      Generated from scraped website content.
                    </CardDescription>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={copySummary}
                  className="cursor-pointer border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-100 gap-2 rounded-sm ring-0!"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="flex flex-col gap-2 pt-1 text-xs text-zinc-400">
              {url ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-white/10 bg-white/5 text-zinc-200">
                    <Link2 className="mr-1 h-3.5 w-3.5 text-indigo-300" />
                    Source
                  </Badge>

                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-200 hover:bg-white/10 transition cursor-pointer"
                    title={url}
                  >
                    {shortUrl}
                  </a>
                </div>
              ) : null}

              {typeof extractedChars === "number" ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-cyan-500/20 bg-cyan-500/10 text-cyan-200">
                    Extracted: {extractedChars.toLocaleString()} chars
                  </Badge>

                  <Badge className="border-white/10 bg-white/5 text-zinc-200">
                    Cleaned summary output
                  </Badge>
                </div>
              ) : null}
            </div>
          </CardHeader>

          <CardContent className="relative p-6 pt-0">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-44">
              <div className="absolute left-6 top-6 h-28 w-28 rounded-full bg-cyan-500/15 blur-2xl" />
              <div className="absolute right-8 top-10 h-28 w-28 rounded-full bg-purple-500/15 blur-2xl" />
            </div>

            <div className="relative rounded-md border border-white/10 bg-zinc-950/60 p-5 shadow-inner shadow-black/40 overflow-hidden">
              <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/12 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

              <p className="relative whitespace-pre-wrap text-sm leading-7 text-zinc-200">
                {summary}
              </p>
            </div>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}