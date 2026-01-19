import { Bell, Search, User } from "lucide-react";
import { caseInfo } from "@/data/dummyData";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl fixed top-0 right-0 left-64 z-30 flex items-center justify-between px-6">
      {/* Case Info */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">
              {caseInfo.case_id}
            </span>
            <span className="status-badge bg-primary/20 text-primary">
              {caseInfo.status}
            </span>
          </div>
          <h2 className="font-semibold text-foreground">{caseInfo.case_name}</h2>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search claims, documents..."
            className="w-64 h-9 pl-10 pr-4 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-conflict" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </button>
      </div>
    </header>
  );
};
