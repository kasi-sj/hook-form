import Image from "next/image";
import BasicForm from "@/components/BasicForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BasicForm />
    </main>
  );
}
