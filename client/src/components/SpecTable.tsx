import { Card } from "@/components/ui/card";
import { TMT_SPECS } from "@/lib/tmtData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SpecTable() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="spec-table">
        <AccordionTrigger className="text-base font-semibold" data-testid="button-toggle-spec">
          View TMT Specification Table
        </AccordionTrigger>
        <AccordionContent>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Dia</th>
                    <th className="px-4 py-3 text-left font-semibold">Per PC Weight</th>
                    <th className="px-4 py-3 text-left font-semibold">Pcs in Bhari</th>
                    <th className="px-4 py-3 text-left font-semibold">Bhari Weight (KG)</th>
                  </tr>
                </thead>
                <tbody>
                  {TMT_SPECS.map((spec, index) => (
                    <tr 
                      key={spec.diameter}
                      className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
                    >
                      <td className="px-4 py-3 font-semibold">{spec.diameter}</td>
                      <td className="px-4 py-3">{spec.perPieceWeight}</td>
                      <td className="px-4 py-3">{spec.pcsInBhari}</td>
                      <td className="px-4 py-3">{spec.bhariWeight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
