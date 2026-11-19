"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Read-only value with a Copy button; `secret` masks it until "Show". */
export function CopyField({
  id,
  label,
  value,
  secret = false,
}: {
  id: string;
  label: string;
  value: string;
  secret?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [shown, setShown] = useState(!secret);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={id}
          readOnly
          value={value}
          type={shown ? "text" : "password"}
          className="font-mono text-xs"
          onFocus={(event) => event.currentTarget.select()}
        />
        {secret && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShown((value) => !value)}
            aria-label={shown ? `Hide ${label}` : `Show ${label}`}
          >
            {shown ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={async () => {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
