import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "@/Layout";
import { Head } from "./+Head";

export default {
  Layout,
  Head,

  title: "cutler.so",
  description: "My thoughts and writings",

  extends: vikeReact,
} satisfies Config;