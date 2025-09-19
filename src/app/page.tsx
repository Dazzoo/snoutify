import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="w-full space-y-8">
      {/* First Block */}
      <div className="w-full bg-card px-9 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-foreground mb-2">
            Supercake Coding Challenge
          </h1>
          <p className="text-muted-foreground mb-4">
            First block content
          </p>
          <Input 
            type="text" 
            placeholder="Enter text here" 
            className="w-[312px] h-[40px]"
          />
        </div>
      </div>

      {/* Second Block */}
      <div className="w-full bg-card px-9 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-4">
            Second Block
          </h1>
          <p className="text-muted-foreground mb-4">
            Second block content
          </p>
          <Input 
            type="text" 
            placeholder="Enter text here" 
            className="w-[312px] h-[40px]"
          />
        </div>
      </div>
    </div>
  );
}
