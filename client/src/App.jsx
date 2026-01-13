import { useState } from "react";
import UrlForm from "./components/UrlForm";
import SummaryCard from "./components/SummaryCard";
import Loader from "./components/Loader";
import { api } from "./services/api";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";

import { SiReact, SiLangchain, SiOpenai, SiShadcnui } from "react-icons/si";

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
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors />

      <header className="sticky top-0 z-50 border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="relative border-b mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center">
              <img src="summarizer.png" alt="summarizer" className="h-6 w-6" />
            </div>

            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight text-zinc-100">
                Summarizer
              </p>
              <p className="text-xs text-zinc-400">
                AI-powered website summary tool
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="rounded-full flex gap-2 items-center border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10 transition cursor-pointer">
               <SiReact /> React
            </span>

            <span className="rounded-full flex gap-2 items-center border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10 transition cursor-pointer">
              <SiLangchain /> LangChain
            </span>

            <span className="rounded-full flex gap-2 items-center border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10 transition cursor-pointer">
              <SiOpenai /> OpenAI
            </span>

            <span className="rounded-full flex gap-2 items-center border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10 transition cursor-pointer">
              <SiShadcnui />  shadcn/ui
            </span>
          </div>
        </div>
      </header>

      <main className="flex justify-center items-center flex-col gap-6 px-4 py-10">
        <UrlForm onSubmit={handleSummarize} loading={loading} />

        {loading ? <Loader /> : null}

        {error ? (
          <Alert variant="destructive" className="w-full max-w-2xl">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <SummaryCard
          summary={summary}
          url={meta.url}
          extractedChars={meta.extractedChars}
        />
      </main>

      <footer className="relative mt-12 bg-zinc-950/65 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-8 border-t border-white/10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center">
                <img src="summarizer.png" alt="summarizer" className="h-6 w-6" />
              </div>

              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight text-zinc-100">
                  Website Summarizer
                </p>
                <p className="text-xs text-zinc-400">
                  Paste URL • Extract • AI Summary
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-center">
              <span className="cursor-pointer flex gap-2 items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 transition hover:bg-white/10">
                <SiReact /> React
              </span>
              <span className="cursor-pointer flex gap-2 items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 transition hover:bg-white/10">
                <SiLangchain /> LangChain
              </span>
              <span className="cursor-pointer flex gap-2 items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 transition hover:bg-white/10">
                <SiOpenai /> OpenAI
              </span>
              <span className="cursor-pointer flex gap-2 items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200 transition hover:bg-white/10">
                <SiShadcnui />  shadcn/ui
              </span>
            </div>

            <div className="text-xs text-zinc-500 sm:text-right">
              <p className="font-medium text-zinc-300">Built by Aditya Kumar</p>
              <p className="mt-1">© {new Date().getFullYear()} • All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
