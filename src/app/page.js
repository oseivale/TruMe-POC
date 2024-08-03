import Image from "next/image";
import styles from "./page.module.css";
import { ValueGrid } from "../components/ValueGrid";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <div
          style={{
            textAlign: "",
            lineHeight: "10px",
            marginLeft: ".5rem",
            marginBottom: "3rem",
          }}
        >
          <h1>TruMe</h1>
          <h3>Share your TRU self</h3>
          <p>
            Choose 5 core values from the options below to create your TruMe
            logo design!
          </p>
        </div>
        <ValueGrid />
      </div>
    </main>
  );
}
