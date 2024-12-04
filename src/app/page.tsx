import About from "@/views/about";
import CallToAction from "@/views/calltoaction";
import Contact from "@/views/contact";
import Projects from "@/views/projects";

export default function Home() {
  return (
    <main
      className="text-center m-4 xl:mx-auto bg-fixed -mt-16 bg-center bg-no-repeat flex flex-col items-center justify-center gap-10"
      style={{
        backgroundImage: "url(/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "65%",
      }}
    >
      <About />
      <Projects />
      <CallToAction />
      <Contact />
    </main>
  );
}
