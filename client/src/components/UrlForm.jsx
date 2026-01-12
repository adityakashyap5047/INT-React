import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Sparkles,
  Wand2,
  Loader2,
  Link2,
  FileText,
  Bot,
} from "lucide-react";

export default function UrlForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("puppeteer");

  const methodMeta = useMemo(() => {
    if (method === "cheerio") {
      return {
        title: "Cheerio",
        desc: "Fast extraction for static HTML pages.",
        recommended: false,
      };
    }
    return {
      title: "Puppeteer",
      desc: "Best for dynamic websites (React/Next.js, Medium, etc.).",
      recommended: true,
    };
  }, [method]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ url, method });
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="relative rounded-md bg-linear-to-br from-indigo-500/30 via-purple-500/20 to-amber-500/20 p-px shadow-2xl">
        <div className="pointer-events-none absolute -inset-10 bg-indigo-500/10 blur-3xl" />

        <Card className="relative overflow-hidden rounded-md border-white/10 bg-zinc-950/70 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />
            <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
          </div>

          <CardHeader className="relative space-y-5 p-6 pb-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-violet-200 via-violet-500 to-violet-300">
                    <img
                      src="summarizer.png"
                      alt="summarizer icon"
                      className="h-6 w-6"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
                      Website Summarizer
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        <Link2 className="h-3.5 w-3.5 text-indigo-300" />
                        Paste URL
                      </div>

                      <span className="hidden text-zinc-600 sm:inline">•</span>

                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        <FileText className="h-3.5 w-3.5 text-purple-300" />
                        Extract Content
                      </div>

                      <span className="hidden text-zinc-600 sm:inline">•</span>

                      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        <Bot className="h-3.5 w-3.5 text-amber-300" />
                        AI Summary
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-start sm:justify-end">
                <Badge className="bg-amber-500/10 text-amber-400 border-0 px-3 py-1 font-medium shadow-lg shadow-amber-500/20 flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  AI Powered
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative p-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-sm border border-white/10 bg-white/3 p-4">
                <label
                  htmlFor="url"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-200"
                >
                  <Globe className="h-4 w-4 text-zinc-400" />
                  Website URL
                </label>

                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  id="url"
                  disabled={loading}
                  className="h-12 rounded-sm bg-zinc-950/60 border-white/10 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/40"
                />

                <p className="mt-2 text-xs text-zinc-500">
                  Paste a webpage link (blog, docs, Wikipedia, Medium etc.)
                </p>
              </div>

              <div className="rounded-sm border border-white/10 bg-white/3 p-4">
                <div className="mb-2 flex items-center justify-between flex-wrap">
                  <div className="flex gap-4 items-center flex-wrap">
                    <p className="text-sm font-medium text-zinc-200">
                      Extraction Method
                    </p>

                    <Select value={method} onValueChange={setMethod} disabled={loading}>
                    <SelectTrigger className="h-12 rounded-sm bg-zinc-950/60 border-white/10 focus:ring-indigo-500/20 cursor-pointer ring-0!">
                      <SelectValue placeholder="Choose method" />
                    </SelectTrigger>

                    <SelectContent className=" border-white/10 text-white rounded-sm bg-white/3 backdrop-blur-xl">
                      <SelectItem className="cursor-pointer" value="puppeteer">
                        Puppeteer
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="cheerio">
                        Cheerio
                      </SelectItem>
                    </SelectContent>
                    </Select>
                  </div>

                  {methodMeta.recommended ? (
                    <Badge className="border mt-2 ml-2 border-indigo-500/30 bg-indigo-500/10 text-indigo-200">
                      Recommended
                    </Badge>
                  ) : (
                    <Badge className="border mt-2 ml-2 border-white/10 bg-white/5 text-zinc-200">
                      Fast
                    </Badge>
                  )}
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-sm border border-white/10 bg-zinc-950/40 px-3 py-2">
                  <div className="mt-1 mr-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_0_4px_rgba(99,102,241,0.15)]" />
                  <p className="text-xs text-zinc-400">
                    <span className="font-semibold text-zinc-200">
                      {methodMeta.title}:
                    </span>{" "}
                    {methodMeta.desc}
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full cursor-pointer rounded-md bg-linear-to-r from-indigo-600 via-cyan-600 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:from-indigo-500 hover:to-cyan-500 active:scale-[0.99] ring-0!"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Summarize Website
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
