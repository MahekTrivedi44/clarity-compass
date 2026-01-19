import { crossReferenceMatrix } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";
import { AlertTriangle, CheckCircle } from "lucide-react";

export const CrossReferenceMatrix = () => {
  const { dimensions, categories, data, conflicts } = crossReferenceMatrix;

  return (
    <div className="glass-panel p-5 space-y-4 overflow-x-auto">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Cross-Reference Matrix</h3>
          <p className="text-sm text-muted-foreground">
            Compare claims across all sources and categories
          </p>
        </div>
        <HowItsMade {...techConfigs.crossReference} />
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="p-3 text-left text-sm font-medium text-muted-foreground bg-secondary/30 rounded-tl-lg">
                Category
              </th>
              {dimensions.map((dim, i) => (
                <th
                  key={dim}
                  className={`p-3 text-left text-sm font-medium text-muted-foreground bg-secondary/30 ${
                    i === dimensions.length - 1 ? "rounded-tr-lg" : ""
                  }`}
                >
                  {dim}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, rowIndex) => (
              <tr key={category} className="border-t border-border">
                <td className="p-3 text-sm font-medium text-foreground bg-secondary/10">
                  {category}
                </td>
                {data[rowIndex].map((cell, colIndex) => {
                  const hasConflict = conflicts[rowIndex][colIndex];
                  return (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className={`p-3 text-sm transition-colors ${
                        hasConflict
                          ? "bg-conflict/10 text-conflict"
                          : cell === "N/A"
                          ? "bg-secondary/5 text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {hasConflict && (
                          <AlertTriangle className="w-3.5 h-3.5 text-conflict" />
                        )}
                        <span>{cell}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conflict Legend */}
      <div className="flex items-center gap-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 text-conflict" />
          <span className="text-muted-foreground">Conflicting data detected</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4 text-consensus" />
          <span className="text-muted-foreground">Sources aligned</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-4 h-4 flex items-center justify-center text-muted-foreground">
            —
          </span>
          <span className="text-muted-foreground">No data available</span>
        </div>
      </div>
    </div>
  );
};
