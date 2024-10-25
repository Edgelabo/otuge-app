import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface FormComponentProps {
  name: string;
  setName: (name: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  errorMessage: string;
}

export default function FormComponent({
  name,
  setName,
  handleSubmit,
  loading,
  errorMessage,
}: FormComponentProps) {
  return (
    <>
      {errorMessage && (
        <div className="text-center text-red-600 mb-4">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700">
            お名前
          </Label>
          <Input
            id="name"
            placeholder="ここにお名前を入力"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-red-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-red-800 hover:bg-red-700 text-white"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              お告げを待っています...
            </>
          ) : (
            "おみくじを引く"
          )}
        </Button>
      </form>
    </>
  );
}
