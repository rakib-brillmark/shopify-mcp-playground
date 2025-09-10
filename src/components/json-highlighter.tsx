"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Expand, Maximize } from "lucide-react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

type JsonViewerProps = {
  data: object;
};

export default function JsonViewer({ data }: JsonViewerProps) {
  const [collapseAll, setCollapseAll] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCollapseAll(!collapseAll)}
        >
          <Expand className="h-4 w-4 mr-1" />
          {collapseAll ? "Expand All" : "Collapse All"}
        </Button>

        <Button variant="outline" size="sm" onClick={copyJson}>
          <Copy className="h-4 w-4 mr-1" />
          {copied ? "Copied!" : "Copy JSON"}
        </Button>

        <Button variant="outline" size="sm" onClick={() => setFullscreen(true)}>
          <Maximize className="h-4 w-4 mr-1" />
          Fullscreen
        </Button>
      </div>

      <div className="rounded-md border p-2 text-sm overflow-auto">
        <JsonView
          src={data}
          theme="atom"
          enableClipboard={true}
          collapseStringsAfterLength={100}
          collapsed={collapseAll ? 2 : false}
          CopyComponent={() => null}
          displaySize={true}
        />
      </div>

      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] min-w-[90vw]  overflow-auto">
          <DialogHeader className="flex justify-between items-center sticky top-0">
            <Button size="sm" variant="outline" onClick={copyJson}>
              <Copy className="h-4 w-4 mr-1" />
              Copy Code
            </Button>
          </DialogHeader>
          <div className="rounded-md border overflow-auto">
            <JsonView
              src={data}
              theme="atom"
              enableClipboard={true}
              collapseStringsAfterLength={100}
              collapsed={false}
              CopyComponent={() => null}
              displaySize={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
