import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Globe, Sparkles } from "lucide-react";

export default function UrlForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("puppeteer");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ url, method });
  };

  return (
    <Card className="w-full max-w-3xl border-white/10 bg-linear-to-b from-zinc-900/70 to-zinc-950/70 backdrop-blur-xl shadow-xl">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              Website Summarizer
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Paste a link → extract content → get an AI summary.
            </p>
          </div>

          <Badge className="border border-white/10 bg-white/5 text-zinc-200">
            Dark UI
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200 flex items-center gap-2">
              <Globe className="h-4 w-4 text-zinc-400" />
              Website URL
            </label>

            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={loading}
              className="h-11 bg-zinc-950/60 border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>

          {/* method */}
          <div className="grid gap-2 sm:grid-cols-[170px_1fr] sm:items-center">
            <label className="text-sm font-medium text-zinc-200">
              Extraction Method
            </label>

            <Select value={method} onValueChange={setMethod} disabled={loading}>
              <SelectTrigger className="h-11 bg-zinc-950/60 border-white/10 focus:ring-indigo-500/20 cursor-pointer">
                <SelectValue placeholder="Choose method" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10">
                <SelectItem className="cursor-pointer" value="puppeteer">
                  Puppeteer (Best for React/Next)
                </SelectItem>
                <SelectItem className="cursor-pointer" value="cheerio">
                  Cheerio (Fast for HTML pages)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* button */}
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20"
          >
            {loading ? "Summarizing..." : "Summarize"}
          </Button>

          <p className="text-xs text-zinc-400">
            Tip: Use <span className="font-semibold text-zinc-200">Puppeteer</span> for
            Medium / React / Next.js sites.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
