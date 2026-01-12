import { useState } from "react";
import UrlForm from "./components/UrlForm";
import SummaryCard from "./components/SummaryCard";
import Loader from "./components/Loader";
import { api } from "./services/api";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [meta, setMeta] = useState({ url: "", extractedChars: null });

  const handleSummarize = async ({ url, method }) => {
    setError("");
    setSummary("");
    setMeta({ url: "", extractedChars: null });

    if (!url.trim()) {
      setError("Please enter a website URL.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/summarize", {
        url,
        method,
        maxChars: 8000,
      });

      setSummary(res.data.summary);
      setMeta({
        url: res.data.url,
        extractedChars: res.data.extractedChars,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors />

      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl">
              <img src="summarizer.png" alt="summarizer" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Summarizer</p>
              <p className="text-xs text-muted-foreground">
                React + Shadcn + LangChain
              </p>
            </div>
          </div>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Backend: <span className="font-semibold">localhost:5000</span>
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
        <UrlForm onSubmit={handleSummarize} loading={loading} />

        {loading ? <Loader /> : null}

        {error ? (
          <Alert variant="destructive" className="w-full max-w-2xl">
            <AlertTitle>❌ Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <SummaryCard
          summary={summary}
          url={meta.url}
          extractedChars={meta.extractedChars}
        />

        <Separator className="w-full max-w-2xl" />

        <p className="w-full max-w-2xl text-xs text-muted-foreground">
          Tip: Use <span className="font-semibold">Puppeteer</span> for React /
          Next websites. Use <span className="font-semibold">Cheerio</span> for
          static HTML pages.
        </p>
      </main>
    </div>
  );
}
