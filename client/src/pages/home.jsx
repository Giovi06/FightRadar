import Home from "../components/home";
import Header from "../components/header";

export default function HomePage() {
  return (
    <>
      <div className=" m-5">
        <Header
          heading="Browse some of the best fighters in the world!"
          paragraph="Want to see your matches? "
          linkName="Matches"
          linkUrl="/matches"
        />
      </div>
      <div className="min-h-full h-80 flex items-center justify-center py-8 px-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 mt-20">
          <Home />
        </div>
      </div>
    </>
  );
}
