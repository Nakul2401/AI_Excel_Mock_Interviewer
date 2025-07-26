import { Button } from "@/components/ui/button";
import Image from "next/image";
import Provider from "./provider";

export default function Home() {
  return (
    <Provider>
      <div>
        <h2>Ai interview platform</h2>
        <Button>Helloooo</Button>
      </div>
    </Provider>
  );
}
