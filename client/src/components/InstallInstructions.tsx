import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Smartphone, Share, Plus } from "lucide-react";

export default function InstallInstructions() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="install">
        <AccordionTrigger className="text-base font-semibold" data-testid="button-toggle-install">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            How to Install on Mobile
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxNCIgaGVpZ2h0PSIyMCIgeD0iNSIgeT0iMiIgcng9IjIiIHJ5PSIyIi8+PHBhdGggZD0iTTEyIDE4aC4wMSIvPjwvc3ZnPg==" alt="iOS" className="h-5 w-5" />
                iOS (iPhone/iPad)
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>Open this page in Safari browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  <span className="flex items-center gap-1">
                    Tap the <Share className="h-3 w-3 inline" /> Share button at the bottom
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  <span className="flex items-center gap-1">
                    Scroll and tap "Add to Home Screen" <Plus className="h-3 w-3 inline" />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">4.</span>
                  <span>Tap "Add" to confirm</span>
                </li>
              </ol>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxNCIgaGVpZ2h0PSIyMCIgeD0iNSIgeT0iMiIgcng9IjIiIHJ5PSIyIi8+PHBhdGggZD0iTTEyLjY2NyAxOGguMDEiLz48L3N2Zz4=" alt="Android" className="h-5 w-5" />
                Android
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>Open this page in Chrome browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  <span>Tap the three dots menu (⋮) at the top right</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  <span>Tap "Add to Home screen" or "Install app"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">4.</span>
                  <span>Tap "Add" or "Install" to confirm</span>
                </li>
              </ol>
            </Card>

            <p className="text-sm text-muted-foreground text-center">
              Once installed, you can use the app offline without internet connection!
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
